import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebaseAdmin';
import { verifyIdToken } from '@/lib/verifyToken';
import type { Testimonials } from '@/types/Testimonials';

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
    const snapshot = await db.ref('testimonials').once('value');
    const data = snapshot.val() as Record<string, Omit<Testimonials, 'uid'>> | null;

    const testimonials: (Testimonials & { uid: string })[] = data
      ? Object.entries(data).map(([uid, testimonial]) => ({
          uid,
          ...testimonial,
        }))
      : [];

    return res.status(200).json(testimonials);
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, position, company, image_url, testimony, rating } = req.body;

  if (!name || !position || !company || !image_url || !testimony || typeof rating !== 'number') {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const ref = db.ref('testimonials').push();
    const uid = ref.key;

    if (!uid) {
      return res.status(500).json({ error: 'Failed to generate ID' });
    }

    await ref.set({
      name,
      position,
      company,
      image_url,
      testimony,
      rating,
      created_at: now(),
      updated_at: now(),
    });

    return res.status(201).json({ message: 'Testimonial added successfully', uid });
  } catch (err) {
    console.error('Error adding testimonial:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, name, position, company, image_url, testimony, rating } = req.body;

  if (!uid || !name || !position || !company || !image_url || !testimony || typeof rating !== 'number') {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await db.ref(`testimonials/${uid}`).update({
      name,
      position,
      company,
      image_url,
      testimony,
      rating,
      updated_at: now(),
    });

    return res.status(200).json({ message: 'Testimonial updated successfully' });
  } catch (err) {
    console.error('Error updating testimonial:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = req.query;

  if (!uid || typeof uid !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid uid in query' });
  }

  try {
    await db.ref(`testimonials/${uid}`).remove();
    return res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error('Error deleting testimonial:', err);
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