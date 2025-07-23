import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebaseAdmin';
import { verifyIdToken } from '@/lib/verifyToken';
import type { SocialLinks } from '@/types/SocialLinks';

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
    const snapshot = await db.ref('socialLinks').once('value');
    const data = snapshot.val() as Record<string, Omit<SocialLinks, 'uid'>> | null;

    const socialLinks: (SocialLinks & { uid: string })[] = data
      ? Object.entries(data).map(([uid, link]) => ({
          uid,
          ...link,
        }))
      : [];

    return res.status(200).json(socialLinks);
  } catch (err) {
    console.error('Error fetching social links:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { social, icon, link } = req.body;

  if (!social || !icon || !link) {
    return res.status(400).json({ error: 'Missing required fields: social, icon, and link' });
  }

  try {
    const ref = db.ref('socialLinks').push();
    const uid = ref.key;

    if (!uid) {
      return res.status(500).json({ error: 'Failed to generate ID' });
    }

    await ref.set({
      social,
      icon,
      link,
      created_at: now(),
      updated_at: now(),
    });

    return res.status(201).json({ message: 'Social link added successfully', uid });
  } catch (err) {
    console.error('Error adding social link:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, social, icon, link } = req.body;

  if (!uid || !social || !icon || !link) {
    return res.status(400).json({ error: 'Missing required fields: uid, social, icon, and link' });
  }

  try {
    await db.ref(`socialLinks/${uid}`).update({
      social,
      icon,
      link,
      updated_at: now(),
    });

    return res.status(200).json({ message: 'Social link updated successfully' });
  } catch (err) {
    console.error('Error updating social link:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = req.query;

  if (!uid || typeof uid !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid uid in query' });
  }

  try {
    await db.ref(`socialLinks/${uid}`).remove();
    return res.status(200).json({ message: 'Social link deleted successfully' });
  } catch (err) {
    console.error('Error deleting social link:', err);
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