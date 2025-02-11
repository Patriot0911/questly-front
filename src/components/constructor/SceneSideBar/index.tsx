import { IScene } from '@/interfaces/redux';
import { useEffect, useRef, } from 'react';

import styles from './styles.module.scss';

const SceneSideBar = ({ currentScene, }: { currentScene?: IScene, }) => {
    const labelRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLInputElement>(null);
    useEffect(
        () => {
            if(!currentScene?.label || !labelRef.current)
                return;
            labelRef.current.value = currentScene.label;
        }, [currentScene]
    );
    return (
        <form className={styles['scene__side']}>
            <div className={'flex flex-col justify-between h-full'}>
                <div className='flex-grow'>
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
                                        <input
                                            ref={imgRef}
                                            type={'file'}
                                            name={'image'}
                                            accept='.png,.jpg,.jpeg'
                                        />
                                    </div>
                            </>
                        )
                    }
                </div>
                <div className='flex flex-col gap-3'>
                    <button className={styles['delete-button']}>
                        Видалити
                    </button>
                    <button className={styles['save-button']}>
                        Зберегти зміни
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SceneSideBar;
