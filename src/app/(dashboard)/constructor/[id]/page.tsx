'use client';

import { LuMousePointerClick } from "react-icons/lu";
import { MdCreateNewFolder, } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoIosPlay, } from "react-icons/io";

import styles from './styles.module.scss';
import { useEffect, useState } from "react";
import { useParams, } from "next/navigation";
import { useAppSelector, } from "@/hooks/redux";
import SceneList from "@/components/constructor/SceneList";
import { useUserSelector } from "@/hooks/redux/auth";
import { useConstructorSelector } from "@/hooks/redux/constructor";

const ConstructorPage = () => {
    const params = useParams();
    const { isAuthenticated, accessToken, } = useAppSelector(useUserSelector);
    const data = useAppSelector(useConstructorSelector);
    const q = useAppSelector(useUserSelector);
    const [interactions, setInteractions] = useState<any[]>([]);
    const [scenes, setScenes] = useState<any[]>([]);
    console.log({data});
    console.log({q});
    useEffect(
        () => {
            const { id, } = params;
            if(!id || !isAuthenticated)
                return;
            (async() => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quest-constructor/${id}/interactions`, {
                        headers: {
                            'authorization': `Bearer ${accessToken}`,
                        },
                    })
                    const { data, meta, } = await res.json();
                    setInteractions(data);
                } catch(e) {
                    console.log({e});
                };
            })();
            (async() => {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quest-constructor/${id}/scenes`, {
                        headers: {
                            'authorization': `Bearer ${accessToken}`,
                        },
                    })
                    const { data, meta, } = await res.json();
                    setScenes(data);
                } catch(e) {
                    console.log({e});
                };
            })();
        }, [params, isAuthenticated]
    );
    const addScene = async () => {

    };
    return (
        <div className={styles['wrapper']}>
            <div className={styles['sidebar']}>
                <div className={styles['points-list']}>
                    {
                        interactions.map(
                            (item) => (
                                <>
                                    {item.label}
                                </>
                            )
                        )
                    }
                </div>
                <div className={styles['toolbar']}>
                    <button className={styles['item']}>
                        <CiSettings className={`${styles['rotated']} ${styles['icon']}`} />
                    </button>
                    <button className={`${styles['item']} ${styles['acitve']}`}>
                        <LuMousePointerClick className={`${styles['icon']}`} />
                    </button>
                    <button className={styles['item']} disabled>
                        <IoIosPlay className={`${styles['icon']}`} />
                    </button>
                </div>
            </div>
            <div className={styles['scene-section']}>
                <div className={`${styles['container']} ${styles['scene']}`}>
                    <div className={styles['scene__empty']}>
                        <MdCreateNewFolder className={styles['empty-scene-icon']}  />
                        <span>Створіть початкову сцену</span>
                    </div>
                </div>
                <SceneList scenes={scenes} />
            </div>
        </div>
    );
};

export default ConstructorPage;