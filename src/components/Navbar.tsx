"use client";

import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import { logout } from '@/src/lib/auth';
import { signOut } from 'next-auth/react';

const logout = () => {
    signOut({ redirect: false }).then(() => {
        window.location.href = "/auth/signin"; // garantált újratöltés
    })
}


const Navbar = () => {
    const { data: session } = useSession();
    return (
        <nav className="bg-white shadow-sm">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className="flex justify-between h-16">

                    <div className="flex">
                        <Link href={"/"} className="flex items-center gap-2">
                            <Image src="/logo.png" alt="Logo" width={40} height={40} className='h-8 w-auto' />
                            <span className='font-bold text-xl text-gray-900'>Job Board</span>
                        </Link>
                    </div>


                    <div className='flex items-center space-x-4'>
                        <Link href={"/jobs"} className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'>Browse Jobs</Link>
                        {session ? (
                            <>
                                <Link href={"/jobs/post"} className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'>Post a Job</Link>
                                <Link href={"/dashboard"} className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'>Dashboard</Link>
                                <button onClick={logout} className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer'>Sign Out</button>
                            </>
                        ) : (
                            <Link href={"/auth/signin"} className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer'>Sign In</Link>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar