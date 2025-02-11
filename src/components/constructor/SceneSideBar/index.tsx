import { useConstructorInteractionsSelector, useConstructorScenesSelector } from '@/hooks/redux/constructor';
import { loadInteractions, loadScenes, selectScene } from '@/lib/redux/slices/constructor';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getImageSize, useFetchWithAuth } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { IScene } from '@/interfaces/redux';
import { ChangeEvent, useEffect, useRef, useState, } from 'react';

import styles from './styles.module.scss';

const SceneSideBar = ({ currentScene, }: { currentScene?: IScene, }) => {
    const interactions = useAppSelector(useConstructorInteractionsSelector);
    const scenes = useAppSelector(useConstructorScenesSelector);
    const labelRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<File>(null);
    const fetchWithAuth = useFetchWithAuth();
    const dispatch = useAppDispatch();
    const params = useParams();

    const deleteHandle = async () => {
        const { id, } = params;
        if(!id || !currentScene || scenes.length <= 1)
            return;
        const res = await fetchWithAuth(
            `${process.env.NEXT_PUBLIC_API_URL}/quest-constructor/${id}/scenes/${currentScene.id}`,
            {
                method: 'DELETE',
            }
        );
        if(res?.status != 200)
            return;
        const filteredInteractions = interactions.filter(
            (item) => item.questSceneId !== currentScene.id
        )
        const selectedScene = scenes.find(
            (item) => item.id !== currentScene.id
        );
        if(!selectedScene)
            return;
        const filteredScenes = scenes.filter(
            (item) => item.id !== currentScene.id
        );
        dispatch(selectScene(selectedScene))
        dispatch(loadScenes({
            data: filteredScenes,
        }))
        dispatch(loadInteractions({
            data: filteredInteractions,
        }));
    };
    const updateHandle = async () => {
        const { id, } = params;
        const label = labelRef.current?.value.trim();
        const file = imgRef.current;
        if(!id || !currentScene)
            return;
        const newSceneData = {
            label: !(!label || label === currentScene?.label) ? label : currentScene?.label,
        };
        if(file) {
            const sizes = await getImageSize(file);
            const formData = new FormData();
            formData.append('file', file);
            const fileRes = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/files/upload`, {
                method: 'POST',
                body: formData,
            });
            if(fileRes) {
                const fileData = await fileRes.json();
                Object.assign(newSceneData, {
                    width: sizes.width,
                    height: sizes.height,
                    background: fileData,
                })
            };
        };
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/quest-constructor/${id}/scenes/${currentScene.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSceneData),
        });
        if(!res)
            return;
        const data = await res.json();
    };

    useEffect(
        () => {
            if(!currentScene?.label || !labelRef.current)
                return;
            labelRef.current.value = currentScene.label;
        }, [currentScene]
    );
    return (
        <div className={styles['scene__side']}>
            <div className={'flex flex-col justify-between h-full'}>
                <div className='flex-grow gap-3 flex flex-col'>
                    {
                        currentScene && (
                            <>
                                <div className={styles['field']}>
                                    <label htmlFor={'label'}>Назва</label>
                                    <input
                                        ref={labelRef}
                                        name={'label'}
                                        placeholder={currentScene.label}
                                    />
                                </div>
                                <div className={styles['field']}>
                                    <label htmlFor={'image'}>Зображення</label>
                                    <div className={styles['file-input']}>
                                        <label>Виберіть файл</label>
                                        <input
                                            onChange={
                                                (event: ChangeEvent<HTMLInputElement>) => {
                                                    const file = event.target.files?.[0];
                                                    if(!file)
                                                        return;
                                                    imgRef.current = file;
                                                }
                                            }
                                            type={'file'}
                                            name={'image'}
                                            accept='.png,.jpg,.jpeg'
                                        />
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className='flex flex-col gap-3'>
                    <button disabled={!!currentScene?.isMain} className={styles['delete-button']} onClick={deleteHandle}>
                        Видалити
                    </button>
                    <button className={styles['save-button']} onClick={updateHandle}>
                        Зберегти зміни
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SceneSideBar;
