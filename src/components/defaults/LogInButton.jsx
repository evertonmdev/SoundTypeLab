"use client";

import { LogIn } from 'lucide-react';
import { signIn } from 'next-auth/react';

const LogInGoogleButton = () => {
    return (
        <button className={"bg-white/40 p-2 px-4 rounded-lg text-black font-mono hover:scale-110 transition-all flex justify-between items-center gap-5"} onClick={() => signIn('google')}>
            <LogIn />
            LogIn
        </button>
    )
}

export default LogInGoogleButton