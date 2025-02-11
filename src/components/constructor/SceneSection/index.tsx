'use client';

import { loadScenes, selectScene } from '@/lib/redux/slices/constructor';
import {  useConstructorSelector } from '@/hooks/redux/constructor';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useFetchWithAuth, getImageSize } from '@/lib/utils';
import { useUserSelector } from '@/hooks/redux/auth';
import { MdCreateNewFolder } from 'react-icons/md';
import SceneContainer from '../SceneContainer';
import { useParams } from 'next/navigation';
import SceneList from '../SceneList';
import { useEffect, } from 'react';

import styles from './styles.module.scss';
import SceneSideBar from '../SceneSideBar';

const SceneSection = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const fetchWithAuth = useFetchWithAuth();
    const { isLoading, } = useAppSelector(useUserSelector);
    const { scenes, current: { scene, }, } = useAppSelector(useConstructorSelector);

    const createScene = async (state: any) => {
        const { id, } = params;
        if(!id)
            return;
        const sizes = await getImageSize(state);
        const formData = new FormData();
        formData.append('file', state);
        const fileRes = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/files/upload`, {
            method: 'POST',
            body: formData,
        });
        if(!fileRes)
            return;
        const fileData = await fileRes.json();
        const body = {
            label: "string",
            width: sizes.width,
            height: sizes.height,
            background: fileData,
        };
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/quest-constructor/${id}/scenes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        if(!res)
            return;
        const { data, meta, } = await res.json();
        dispatch(loadScenes({ data: [...scenes, data,], }));
    };

    const inputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        createScene(file);
    };

    useEffect(
        () => {
            (async () => {
                const { id, } = params;
                if(!id)
                    return;
                const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/quest-constructor/${id}/scenes`);
                if(!res)
                    return;
                const { data, meta, } = await res.json();
                if(data.length > 0) {
                    dispatch(selectScene(data[0]));
                };
                dispatch(loadScenes({ data, }));
            })();
        }, [isLoading]
    );
    return (
        <div className={styles['scene-section']}>
            <div className={`${styles['container']} ${styles['scene']}`}>
                {
                    scene ? (
                        <SceneContainer currentScene={scene} />
                    ) : (
                        <div className={styles['scene__empty']}>
                            <input type='file' accept='.png,.jpg,.jpeg' onChange={inputChange} />
                            <MdCreateNewFolder className={styles['empty-scene-icon']}  />
                            <span>Створіть початкову сцену</span>
                        </div>
                    )
                }
                <SceneSideBar currentScene={scene} />
            </div>
            <SceneList
                createScene={createScene}
                scenes={scenes}
            />
        </div>
    );
};

export default SceneSection;
