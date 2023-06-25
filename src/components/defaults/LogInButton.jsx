"use client";

import { LogIn } from 'lucide-react';
import { signIn } from 'next-auth/react';

import Image from 'next/image';

import { GoogleIcon } from '@/assets';

const LogInGoogleButton = () => {
    return (
        <button className="google-plugin" onClick={() => signIn('google')}>
            <Image src={GoogleIcon} width={25} height={25} />
        </button>
    )
}

export default LogInGoogleButton