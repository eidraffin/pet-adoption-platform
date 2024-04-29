'use client';

import { useRouter } from "next/navigation";
import { resetAuthCookies } from '../lib/actions';
import MenuLink from "./navbar/MenuLink";

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const submitLogout = async () => {
        console.log('submitting logout')
        resetAuthCookies();

        router.push('/')
    }

    return (

        <MenuLink
            label= {<p style={{ color: '#990000' }}>Log Out</p>}
            
            onClick={submitLogout}
        />
    )
}

export default LogoutButton;