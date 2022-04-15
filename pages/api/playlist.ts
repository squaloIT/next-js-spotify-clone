import { NextApiRequest, NextApiResponse } from "next/types";
import validateRoute from "../../lib/auth";
import prisma from "../../lib/prisma";

const playlist = validateRoute(async (req: NextApiRequest, res: NextApiResponse, user) => {
  try {
    const playlist = await prisma.playlist.findMany({
      where: {
        userId: user.id
      }
    })
    res.setHeader('Content-Type', 'application/json')
    res.status(200)
    res.json({ playlist })
    return;

  } catch (err) {
    res.status(500)
    res.json({ error: err })
    return;
  }

})

export default playlist