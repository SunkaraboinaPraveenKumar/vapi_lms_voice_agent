import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default async function Page() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <SignUp />
    </div>
  )
}
