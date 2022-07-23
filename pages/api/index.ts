// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import index from '../../public/index.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.send(index);
}
