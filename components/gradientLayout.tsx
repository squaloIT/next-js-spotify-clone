import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'

const GradientLayout = ({ imageSrc, subtitle, title, color, children, description, roundImage }) => {
  return (
    <Box height='100%' overflowY='auto' bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0, 0.95) 75%)`}>
      <Flex bg={`${color}.600`} padding='40px' align='end'>
        <Box padding='20px'>
          <Image boxSize='160px' boxShadow='2xl' src={imageSrc} borderRadius={roundImage ? '100%' : '3px'} />
        </Box>

        <Box padding='20px' lineHeight='40px' color='white'>
          <Text fontSize='xx-small' fontWeight='bold' casing='uppercase'>{subtitle}</Text>
          <Text fontSize='5xl' >{title}</Text>
          <Text fontSize='xx-small' casing='uppercase'>{description}</Text>
        </Box>
      </Flex>

      <Box paddingY='20px'>
        {children}
      </Box>
    </Box>
  )

}

export default GradientLayout