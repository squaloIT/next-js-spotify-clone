import { Input, Button, Box, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { useSWRConfig } from 'swr'
import { auth } from '../lib/mutations'
import NextImage from 'next/image'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);

    const user = await auth(mode, { email, password})
    setIsLoading(false)
    router.push('/')
  }

  return (
    <Box height='100vh' width='100vw' bg='black'>
      <Flex justifyContent='center' align='center' height='10vh' borderBottom='white 1px solid'>
        <NextImage src='/logo.svg' height='60' width='120' />
      </Flex>
      <Flex justifyContent='center' align='center' height='calc(90vh)'>
        <Box padding='50px' bg='gray.800' borderRadius='6px'>
          <form onSubmit={handleSubmit}>
            <Input 
              placeholder='email' 
              type='email' 
              onChange={e => setEmail(e.target.value)} 
              border='1px' 
              borderColor='white' 
              color='white'
            />
            <Input 
              placeholder='password' 
              type='password' 
              onChange={e => setPassword(e.target.value)} 
              border='1px' 
              borderColor='white' 
              color='white'
            />
            <Button type='submit' bg='green.500' isLoading={isLoading} sx={{
              '&:hover': {
              bg:'green.300'
            }
            }}>{mode}</Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
