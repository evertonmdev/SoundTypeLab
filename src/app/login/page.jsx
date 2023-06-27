"use client";

import { LogInForm, Header } from '@/components/defaults';
import '@/styles/styles.scss';

const Login = () => {

    return (
        <main className="login">
            <Header loginState={true}/>
            <LogInForm />
        </main>
    )
}

export default Login;