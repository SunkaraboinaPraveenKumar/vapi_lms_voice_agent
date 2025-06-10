import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import {UserButton } from '@clerk/nextjs'
import { SignedIn, SignedOut } from '@clerk/nextjs'

const NavBar = () => {
  return (
    <nav className='navbar'>
      <Link href={"/"}>
        <div className='flex items-center gap-2.5 cursor-pointer'>
          <Image
            src={"/images/logo.svg"}
            alt='logo'
            width={46}
            height={44}
          />
        </div>
      </Link>
      <div className='flex items-center gap-8'>
        <NavItems />
        <SignedOut>
          <Link href={'/sign-in'}>
            <button className='cursor-pointer btn-signin'>
              Sign In
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}

export default NavBar