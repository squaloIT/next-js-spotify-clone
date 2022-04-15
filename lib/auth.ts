import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from "next"
import prisma from './prisma';

export default function validateRoute(handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (token) {
      let user
      try {
        const { id } = jwt.verify(token, '67asydhasdas8dya898d')
        user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
          throw new Error('Not Authorized')
        }

      } catch (err) {
        console.log(err)
        res.status(401)
        res.json('Not Authorized')
        return;
      }

      return handler(req, res, user);
    }

    res.status(401);
    res.json('Not Authorized')
  }
}