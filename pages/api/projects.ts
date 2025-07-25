import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebaseAdmin';
import { verifyIdToken } from '@/lib/verifyToken';
import type { Projects } from '@/types/Projects';


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
    const snapshot = await db.ref('projects').once('value');
    const data = snapshot.val() as Record<string, Omit<Projects, 'uid'>> | null;

    const projects: Projects[] = data
      ? Object.entries(data).map(([uid, project]) => ({
          uid,
          ...project,
        }))
      : [];

    return res.status(200).json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    title,
    type,
    description,
    github_url,
    image_url,
    project_url,
    start_date,
    end_date,
    stacks
  } = req.body;

  if (
    !title || !type || !description || !start_date || !end_date || !stacks
  ) {
    return res.status(400).json({
      error: 'Missing required fields: title, type, description, start_date, end_date, stacks'
    });
  }

  try {
    const ref = db.ref('projects').push();
    const uid = ref.key;

    if (!uid) {
      return res.status(500).json({ error: 'Failed to generate project ID' });
    }

    // Convert stacks from object to array
    const stacksArray = Object.values(stacks);

    await ref.set({
      title,
      type,
      description,
      github_url,
      image_url,
      project_url,
      stacks: stacksArray,
      start_date,
      end_date,
      featured: true,
      created_at: now(),
      updated_at: now()
    });

    return res.status(201).json({ message: 'Project added successfully', uid });
  } catch (err) {
    console.error('Error adding project:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, title, url } = req.body;

  if (!uid || !title || !url) {
    return res.status(400).json({ error: 'Missing required fields: uid, title, and url' });
  }

  try {
    await db.ref(`projects/${uid}`).update({
      title,
      url,
      updated_at: now(),
    });

    return res.status(200).json({ message: 'Project updated successfully' });
  } catch (err) {
    console.error('Error updating project:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = req.query;

  if (!uid || typeof uid !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid uid in query' });
  }

  try {
    await db.ref(`projects/${uid}`).remove();
    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
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