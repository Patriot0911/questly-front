'use client';

import { useConstructorSelector } from '@/hooks/redux/constructor';
import { switchCreateState } from '@/lib/redux/slices/constructor';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { LuMousePointerClick } from 'react-icons/lu';
import { CiSettings } from 'react-icons/ci';
import { IoIosPlay } from 'react-icons/io';

import styles from './styles.module.scss';

const ToolBar = () => {
    const { current: { createInteraction, }, } = useAppSelector(useConstructorSelector);
    const disaptch = useAppDispatch();
    const createHandle = () => {
        disaptch(switchCreateState());
    };
    return (
        <div className={styles['toolbar']}>
            <button className={styles['item']}>
                <CiSettings className={`${styles['rotated']} ${styles['icon']}`} />
            </button>
            <button onClick={createHandle} className={`${styles['item']} ${createInteraction ? styles['acitve'] : ''}`}>
                <LuMousePointerClick className={`${styles['icon']}`} />
            </button>
            <button className={styles['item']} disabled>
                <IoIosPlay className={`${styles['icon']}`} />
            </button>
        </div>
    );
};

export default ToolBar;
