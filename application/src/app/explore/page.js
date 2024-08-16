"use server"
import React from 'react'
import { auth } from '@/utils/authentication/auth'
import { redirect } from 'next/navigation'

const Explore = async () => {

    const session = await auth()

    if (!session?.user) redirect("/")

    return (
        <div className='flex flex-col'>
            <h1>{session?.user?.name}</h1>
            <img
                src={session?.user?.image}
                width={72}
                height={72}
                className='rounded-full'
            />
        </div>
    )
}

export default Explore