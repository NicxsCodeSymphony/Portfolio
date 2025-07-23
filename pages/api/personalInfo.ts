import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebaseAdmin';
import { verifyIdToken } from '@/lib/verifyToken';
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

// GET personalInfo
const handleGet = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const snapshot = await db.ref('personalInfo').once('value');
    const data = snapshot.val() as Record<string, Omit<PersonalInfo, 'uid'>> | null;

    const personalInfo: PersonalInfo[] = data
      ? Object.entries(data).map(([uid, award]) => ({
          uid,
          ...award,
        }))
      : [];

    return res.status(200).json(personalInfo);
  } catch (err) {
    console.error('Error fetching personalInfo:', err);
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
    const ref = db.ref('personalInfo').push();
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
    await db.ref(`personalInfo/${uid}`).update({
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
    await db.ref(`personalInfo/${uid}`).remove();
    return res.status(200).json({ message: 'Award deleted successfully' });
  } catch (err) {
    console.error('Error deleting award:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method || 'GET';
  const protectedMethods = ['POST', 'PUT', 'DELETE'];

  // Optional: Add CORS preflight support
  if (method === 'OPTIONS') {
    res.setHeader('Allow', 'GET,POST,PUT,DELETE,OPTIONS');
    return res.status(200).end();
  }

  // Authenticate for protected methods
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
