"use client";
import { signOut } from 'next-auth/react';

export default function ButtonLogOut() {
    return (
        <button className={"bg-red-600 p-2 px-4 rounded-lg text-white font-mono hover:scale-110 transition-all"} onClick={() => signOut({
            redirect: false,
        })}>LogOut</button>
    )
}