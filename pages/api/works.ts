import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebaseAdmin';
import { verifyIdToken } from '@/lib/verifyToken';
import type { Works } from '@/types/Works';

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
    const snapshot = await db.ref('works').once('value');
    const data = snapshot.val() as Record<string, Omit<Works, 'uid'>> | null;

    const works: (Works & { uid: string })[] = data
      ? Object.entries(data).map(([uid, work]) => ({
          uid,
          ...work,
        }))
      : [];

    return res.status(200).json(works);
  } catch (err) {
    console.error('Error fetching works:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, company, description, start_date, end_date } = req.body;

  if (!title || !company || !description || !start_date || !end_date) {
    return res.status(400).json({ error: 'Missing required fields: title, company, description, start_date, end_date' });
  }

  try {
    const ref = db.ref('works').push();
    const uid = ref.key;

    if (!uid) {
      return res.status(500).json({ error: 'Failed to generate ID' });
    }

    await ref.set({
      title,
      company,
      description,
      start_date,
      end_date,
      created_at: now(),
      updated_at: now(),
    });

    return res.status(201).json({ message: 'Work added successfully', uid });
  } catch (err) {
    console.error('Error adding work:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, title, start_date, end_date } = req.body;

  if (!uid || !title || !start_date || !end_date) {
    return res.status(400).json({ error: 'Missing required fields: uid, title, start_date, end_date' });
  }

  try {
    await db.ref(`works/${uid}`).update({
      title,
      start_date,
      end_date,
      updated_at: now(),
    });

    return res.status(200).json({ message: 'Work updated successfully' });
  } catch (err) {
    console.error('Error updating work:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = req.query;

  if (!uid || typeof uid !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid uid in query' });
  }

  try {
    await db.ref(`works/${uid}`).remove();
    return res.status(200).json({ message: 'Work deleted successfully' });
  } catch (err) {
    console.error('Error deleting work:', err);
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