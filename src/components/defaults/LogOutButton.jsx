"use client";
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function LogOutButton() {
    return (
        <button className='logout-button' onClick={() => signOut()}><LogOut/> Sair</button>
    )
}