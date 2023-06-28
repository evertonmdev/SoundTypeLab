"use client";

import { LogInForm, Header } from '@/components/defaults';
import Ads from '@/components/utils/Ads';
import '@/styles/styles.scss';

const Login = () => {

    return (
        <main className="login">
            <Header loginState={true}/>
            <LogInForm />
            <div className='absolute w-96 h-56 right-10'>
                <Ads />
            </div>
        </main>
    )
}

export default Login;