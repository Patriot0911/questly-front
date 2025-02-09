'use client';

import Image from "next/image";
import Link from "next/link";

import styles from '../styles.module.scss';

const routes = [
    {
        name: 'Галерея квестів',
        href: '/home',
        isAuth: false,
    },
    {
        name: 'Мої квести',
        href: '/my-quests',
        isAuth: true,
    },
];

const NavBar = ({ isAuth, }: { isAuth: boolean; }) => {
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
            <div className={styles['list']}>
                {
                    routes.map(
                        (item) => (
                            ((item.isAuth && isAuth) || !item.isAuth) && (
                                <Link href={item.href} key={item.href} className={styles['item']}>
                                    <span>
                                        {item.name}
                                    </span>
                                </Link>
                            )
                        )
                    )
                }
            </div>
        </nav>
    );
};

export default NavBar;
