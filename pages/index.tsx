import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";

export default function Home({ artists }) {
  return (
    <GradientLayout color='orange' subtitle="profile" title='Nikola MIhajlovic' description='15 public playlists' imageSrc={'https://tinted-gym-f99.notion.site/image/https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Fbgiv0ssz3xpotz9%2Fpeep.png%3Fdl%3D0?table=block&id=33f9771b-0e6f-4a72-832c-69ed2d41f290&spaceId=511cd811-5561-4a61-b550-c4086b4afafb&width=2000&userId=&cache=v2'} roundImage={true}>
      <Box color='white' paddingX='40px'>
        <Box paddingY='20px'>
          <Text fontSize='2xl' fontWeight='bold'>Top artist this month</Text>
          <Text fontSize='xs' fontWeight=''>Only visible to you</Text>
        </Box>
        <Flex gap='2rem'>
          {artists.map(artist => (
            <Box padding='15px' borderRadius='4px' width='20%' bg='gray.900'>
              <Image src={artist.avatar} borderRadius='100%' height='150px' width='100%' />
              <Box paddingTop='20px'>
                <Text fontSize='large' fontWeight='medium'>{artist.name}</Text>
                <Text fontSize='sm' fontWeight='light'>Artist</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export async function getServerSideProps(context) {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists },
  }
}