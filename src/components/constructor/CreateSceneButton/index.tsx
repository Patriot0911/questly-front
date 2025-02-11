'use client';

import { MdAddBox, } from 'react-icons/md';
import styles from './styles.module.scss';
import { useRef } from 'react';

const CreateSceneButton = ({ createScene }: { createScene: (state: any) => void; }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const inputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        createScene(file);
        if(inputRef.current)
            inputRef.current.value = "";
    };
    return (
        <div className={styles['item']}>
            <div className={styles['svg-wrapper']}>
                <MdAddBox />
            </div>
            <input
                type='file'
                ref={inputRef}
                accept='.png,.jpg,.jpeg'
                onChange={inputChange}
            />
        </div>
    );
};

export default CreateSceneButton;
