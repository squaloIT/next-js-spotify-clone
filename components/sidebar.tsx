import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  Box, List, ListItem, ListIcon, Divider, Center, LinkBox, LinkOverlay
} from '@chakra-ui/layout'
import {
  MdHome,
  MdPlaylistAdd,
  MdLibraryMusic,
  MdSearch,
  MdFavorite
} from 'react-icons/md'
import Link from 'next/link'
import MenuItem from './menuItem'
import { usePlaylist } from '../lib/hooks'

const navMenu = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/'
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search'
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library'
  },
]

const musicMenu = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '#'
  },
  {
    name: 'Favourites',
    icon: MdFavorite,
    route: '#'
  },
]

// const playlist = new Array(30).fill('Playlist ').map((_, i) => `${_} ${i + 1}`)

export default function Sidebar() {
  const { playlist } = usePlaylist();
  return <Box width='100%' bg='black' height='calc(100vh - 100px)' color='gray' paddingX='10px'>
    <Box paddingY='20px' height='100%'>
      <Box width='120px' marginBottom='20px' paddingX='20px'>
        <NextImage src='/logo.svg' height={60} width={120} />
      </Box>

      <Box marginBottom='20px'>
        <List spacing={2}>
          {navMenu.map(item => (
            <MenuItem item={item} key={item.name} />
          ))}
        </List>
      </Box>

      <Box marginBottom='20px'>
        <List spacing={2}>
          {musicMenu.map(item => (
            <MenuItem item={item} key={item.name} />
          ))}
        </List>
      </Box>

      <Divider color='gray.800' />

      <Box height='66%' overflowY='auto' paddingY='20px'>
        <List spacing='2'>
          {playlist?.map(item => (
            <MenuItem item={item} key={item} />
          ))}
        </List>
      </Box>
    </Box>
  </Box>
}

