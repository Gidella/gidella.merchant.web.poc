// utils/errorHandler.ts
import { NextApiRequest, NextApiResponse } from 'next';

export const apiErrorHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
    fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
  ) => {
    try {
      await fn(req, res);
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  };

  