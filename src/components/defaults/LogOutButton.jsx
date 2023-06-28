"use client";
import { signOut } from 'next-auth/react';

export default function ButtonLogOut() {
    return (
        <button className='logout-button' onClick={() => signOut()}>LogOut</button>
    )
}