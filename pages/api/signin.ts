import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({
      id: user.id,
      email: user.email,
      time: Date.now()
    }, '67asydhasdas8dya898d', {
      expiresIn: '7days'
    })

    res.setHeader('Set-Cookie',
      cookie.serialize('TRAX_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
      })
    )

    res.json({
      email: user.email,
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })
  }
  else {
    res.status(401)
    res.json({ error: 'Email or password is wrong ' })
  }

}