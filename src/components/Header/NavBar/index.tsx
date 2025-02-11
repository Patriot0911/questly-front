'use client';

import Image from "next/image";
import Link from "next/link";

import styles from '../styles.module.scss';

const NavBar = () => {
    return (
        <nav className={styles['navbar']}>
            <Link href="/home" className="flex items-center justify-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
                <Image
                    src="/assets/images/logo.png"
                    alt="Vercel logomark"
                    width={52}
                    height={52}
                    priority
                />
            </Link>
        </nav>
    );
};

export default NavBar;
