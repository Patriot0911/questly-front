'use client';

import CreateSceneButton from "../CreateSceneButton";

import styles from './styles.module.scss';

const SceneList = ({ scenes, }: { scenes: any[]; }) => {
    return (
        <div className={`${styles['scene-list']} ${styles['container']} simple-scrollbar`}>
            <CreateSceneButton />
            {
                scenes.map(
                    (_, index) => (
                        <div key={index} className={styles['item']}>
                            <img
                                className={styles['item__img']}
                                src={'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9cc76151-95e3-4c69-b7db-f48f73ea854f/da86jda-8dac0c26-fc87-4f07-9dd4-b10efb097776.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzljYzc2MTUxLTk1ZTMtNGM2OS1iN2RiLWY0OGY3M2VhODU0ZlwvZGE4NmpkYS04ZGFjMGMyNi1mYzg3LTRmMDctOWRkNC1iMTBlZmIwOTc3NzYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.k4jCx0z9BaZRLQ82G7IUrS3qXD1L7utHsGn0hcIncyE'}
                            />
                            <label>Scene 52341</label>
                        </div>
                    )
                )
            }
        </div>
    );
};

export default SceneList;
