"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const navItems=[
    {label:'Home',href:'/'},
    {label:'Companions',href:'/companions'},
    {label:'My Journey',href:'/my-journey'},
]
const NavItems = () => {
    const pathname = usePathname();
  return (
    <nav className='flex flex-col lg:flex-row items-center gap-4'>
        {navItems.map(({label,href})=>(
            <Link href={href} key={label} className={cn(pathname===href && 'text-primary font-semibold','hover:bg-gray-100 p-1 rounded-lg')}>
                {label}
            </Link>
        ))}
    </nav>
  )
}

export default NavItems