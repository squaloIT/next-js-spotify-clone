import { LinkBox, LinkOverlay, ListIcon, ListItem } from "@chakra-ui/layout"
import NextLink from 'next/link'

const MenuItem = ({ item }) => {
  return (
    <ListItem paddingX='10px' fontSize='16px' key={item.name}>
      <LinkBox>
        <NextLink href={item.route || item} passHref>
          <LinkOverlay>
            {
              item.icon &&
              <ListIcon as={item.icon} color='white' marginRight='10px' />
            }
            {item.name || item}
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </ListItem >
  )
}

export default MenuItem