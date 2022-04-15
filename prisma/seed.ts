import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { artistsData } from './artistsData'
const prisma = new PrismaClient()

const run = async () => {
  await Promise.all(
    artistsData.map(async artist => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          avatar: artist.avatar,
          songs: {
            create: artist.songs.map(s => ({
              name: s.name,
              url: s.url,
              duration: s.duration,

            }))
          }
        }
      })
    })
  );


  const salt = bcrypt.genSaltSync()
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      password: bcrypt.hashSync('password', salt),
      email: 'user@test.com',
      // playlists: 
    }
  })

  const songs = await prisma.song.findMany({})

  await Promise.all(
    new Array(10)
      .fill(1)
      .map(async (_, i) => {
        return prisma.playlist.create({
          data: {
            name: `Playlist #${i + 1}`,
            user: {
              connect: { id: user.id }
            },
            songs: {
              connect: songs.map(song => ({
                id: song.id
              }))
            }
          }
        })
      })
  )
}



run()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })