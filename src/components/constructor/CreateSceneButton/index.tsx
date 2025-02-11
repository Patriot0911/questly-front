'use client';

import { MdAddBox, } from 'react-icons/md';
import styles from './styles.module.scss';

const CreateSceneButton = ({ createScene }: { createScene: (state: any) => void; }) => {
    const inputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        createScene(file);
    };
    return (
        <div className={styles['item']}>
            <div className={styles['svg-wrapper']}>
                <MdAddBox />
            </div>
            <input type='file' accept='.png,.jpg,.jpeg' onChange={inputChange} />
        </div>
    );
};

export default CreateSceneButton;
