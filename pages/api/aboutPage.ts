import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebaseAdmin';
import { verifyIdToken } from '@/lib/verifyToken';
import { AboutPage } from '@/types/About';
import { PersonalInfo } from '@/types/PersonalInfo';

const now = () => new Date().toISOString();

const authenticate = async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: Missing or malformed token' });
      return false;
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await verifyIdToken(token);

    if (!decodedToken) {
      res.status(401).json({ error: 'Unauthorized: Invalid token' });
      return false;
    }

    return true;
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
};

const handleGet = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Fetch heroPage
    const heroSnapshot = await db.ref('aboutPage').once('value');
    const heroData = heroSnapshot.val() as Record<string, Omit<AboutPage, 'uid'>> | null;
    const AboutPage: AboutPage[] = heroData
      ? Object.entries(heroData).map(([uid, data]) => ({ uid, ...data }))
      : [];

    // Fetch personalInfo (assumed only one record needed)
    const personalSnapshot = await db.ref('personalInfo').once('value');
    const personalData = personalSnapshot.val() as Record<string, PersonalInfo> | null;
    const personalInfo = personalData ? Object.values(personalData)[0] : {};


    // Fetch files and map to indexed object
    const filesSnapshot = await db.ref('files').once('value');
    const filesData = filesSnapshot.val() as Record<string, unknown> | null;
    const files =
      filesData
        ? Object.values(filesData).reduce((acc: Record<number, unknown>, curr, index) => {
            acc[index] = curr;
            return acc;
          }, {} as Record<number, unknown>)
        : {};

    // Attach to each heroPage
    const heroPageWithNested = AboutPage.map(item => ({
      ...item,
      personalInfo,
      files,
    }));

    return res.status(200).json(heroPageWithNested);
  } catch (err) {
    console.error('Error fetching heroPage, awards, or files:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// POST Award
const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { award, url } = req.body;

  if (!award || !url) {
    return res.status(400).json({ error: 'Missing required fields: award and url' });
  }

  try {
    const ref = db.ref('heroPage').push();
    const uid = ref.key;

    if (!uid) {
      return res.status(500).json({ error: 'Failed to generate award ID' });
    }

    await ref.set({
      award,
      url,
      created_at: now(),
      updated_at: now(),
    });

    return res.status(201).json({ message: 'Award added successfully', uid });
  } catch (err) {
    console.error('Error adding award:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PUT Award
const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, award, url } = req.body;

  if (!uid || !award || !url) {
    return res.status(400).json({ error: 'Missing required fields: uid, award, and url' });
  }

  try {
    await db.ref(`heroPage/${uid}`).update({
      award,
      url,
      updated_at: now(),
    });

    return res.status(200).json({ message: 'Award updated successfully' });
  } catch (err) {
    console.error('Error updating award:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE Award
const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = req.query;

  if (!uid || typeof uid !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid uid in query' });
  }

  try {
    await db.ref(`heroPage/${uid}`).remove();
    return res.status(200).json({ message: 'Award deleted successfully' });
  } catch (err) {
    console.error('Error deleting award:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method || 'GET';
  const protectedMethods = ['POST', 'PUT', 'DELETE'];

  if (method === 'OPTIONS') {
    res.setHeader('Allow', 'GET,POST,PUT,DELETE,OPTIONS');
    return res.status(200).end();
  }

  if (protectedMethods.includes(method)) {
    const isAuthenticated = await authenticate(req, res);
    if (!isAuthenticated) return;
  }

  switch (method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    case 'PUT':
      return handlePut(req, res);
    case 'DELETE':
      return handleDelete(req, res);
    default:
      return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
