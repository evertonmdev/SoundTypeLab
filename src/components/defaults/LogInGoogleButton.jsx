"use client";
import { signIn } from 'next-auth/react';

import Image from 'next/image';

import { GoogleIcon } from '@/assets';

const LogInGoogleButton = () => {
    return (
        <button className="google-plugin" onClick={() => signIn('google', {
            callbackUrl: '/'
        })}>
            <Image className='icon' src={GoogleIcon}/>
        </button>
    )
}

export default LogInGoogleButton