'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import NavItems from './NavItems'
import { UserButton } from '@clerk/nextjs'
import { SignedIn, SignedOut } from '@clerk/nextjs'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className='navbar relative'>
      {/* Main navbar container */}
      <div className='flex items-center justify-between w-full'>
        {/* Logo */}
        <Link href={"/"} onClick={closeMenu}>
          <div className='flex items-center gap-2.5 cursor-pointer'>
            <Image
              src={"/images/logo.svg"}
              alt='logo'
              width={46}
              height={44}
            />
          </div>
        </Link>

        {/* Desktop menu */}
        <div className='hidden md:flex items-center gap-8'>
          <NavItems />
          <SignedIn>
            <Link href={'/subscription'}>
              <button className='cursor-pointer btn-billing hover:opacity-80 transition-opacity'>
                Billing
              </button>
            </Link>
          </SignedIn>
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

        {/* Mobile hamburger button */}
        <button
          onClick={toggleMenu}
          className='md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer'
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-current my-1 transition-all duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
          }`}></span>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <>
          {/* Invisible overlay to close menu when clicking outside */}
          <div 
            className="md:hidden fixed inset-0 z-40"
            onClick={closeMenu}
          />
          
          {/* Actual dropdown menu */}
          <div className="md:hidden absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="py-2">
              {/* Navigation Items */}
              <div onClick={closeMenu}>
                <NavItems />
              </div>
              
              {/* Separator and auth section */}
              <div className="border-t border-gray-100 mt-2 pt-2">
                <SignedIn>
                  <Link href={'/subscription'} onClick={closeMenu}>
                    <div className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer'>
                      Billing
                    </div>
                  </Link>
                  <div className="px-4 py-2">
                    <UserButton />
                  </div>
                </SignedIn>
                
                <SignedOut>
                  <Link href={'/sign-in'} onClick={closeMenu}>
                    <div className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer'>
                      Sign In
                    </div>
                  </Link>
                </SignedOut>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}

export default NavBar