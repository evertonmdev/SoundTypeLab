"use client";
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function LogOutButton({size}) {
    return (
        <button className='logout-button' onClick={() => signOut()}><LogOut size={size}/> Sair</button>
    )
}