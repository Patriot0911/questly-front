'use client';

import { useAppSelector, } from '@/hooks/redux';
import { MdAddBox, } from 'react-icons/md';
import styles from './styles.module.scss';
import { useUserSelector } from '@/hooks/redux/auth';

const CreateSceneButton = () => {
    const { isAuthenticated, accessToken, } = useAppSelector(useUserSelector);
    const questId = '817eab99-e2c2-4618-b2dd-88d8b1cd8644';
    const createScene = () => {

    };
    const getImageSize = async (file: File): Promise<{ width: number; height: number }> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve({ width: img.width, height: img.height });
                img.onerror = reject;
                img.src = e.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    const inputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const sizes = await getImageSize(file);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quest-constructor/${questId}/scenes`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                label: "string",
                width: sizes.width,
                height: sizes.height,
            }),
        });
        const data = await res.json();
        console.log({data});
    };
    return (
        <div className={styles['item']}>
            <MdAddBox />
            <input type='file' onChange={inputChange} />
        </div>
    );
};

export default CreateSceneButton;
