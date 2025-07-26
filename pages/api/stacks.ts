import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebaseAdmin';
import { verifyIdToken } from '@/lib/verifyToken';
import type { Stacks } from '@/types/Stacks';

const now = () => new Date(Date.now()).toISOString();

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
    const snapshot = await db.ref('stacks').once('value');
    const data = snapshot.val() as Record<string, Omit<Stacks, 'uid'>> | null;

    const stacks: (Stacks & { uid: string })[] = data
      ? Object.entries(data).map(([uid, stack]) => ({
          uid,
          ...stack,
        }))
      : [];

    return res.status(200).json(stacks);
  } catch (err) {
    console.error('Error fetching stacks:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { stack, rating, icon } = req.body;

  if (!stack || !rating || !icon) {
    return res.status(400).json({ error: 'Missing required fields: stack, rating and icon' });
  }

  try {
    const ref = db.ref('stacks').push();
    const uid = ref.key;

    if (!uid) {
      return res.status(500).json({ error: 'Failed to generate ID' });
    }

    await ref.set({
      stack,
      rating,
      icon,
      created_at: now(),
      updated_at: now(),
    });

    return res.status(201).json({ message: 'Stack added successfully', uid });
  } catch (err) {
    console.error('Error adding stack:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, stack, icon } = req.body;

  if (!uid || !stack || !icon) {
    return res.status(400).json({ error: 'Missing required fields: uid, stack, and icon' });
  }

  try {
    await db.ref(`stacks/${uid}`).update({
      stack,
      icon,
      updated_at: now(),
    });

    return res.status(200).json({ message: 'Stack updated successfully' });
  } catch (err) {
    console.error('Error updating stack:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = req.query;

  if (!uid || typeof uid !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid uid in query' });
  }

  try {
    await db.ref(`stacks/${uid}`).remove();
    return res.status(200).json({ message: 'Stack deleted successfully' });
  } catch (err) {
    console.error('Error deleting stack:', err);
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