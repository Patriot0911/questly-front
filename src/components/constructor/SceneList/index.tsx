'use client';

import { selectScene } from "@/lib/redux/slices/constructor";
import CreateSceneButton from "../CreateSceneButton";
import { useAppDispatch } from "@/hooks/redux";
import { IScene } from "@/interfaces/redux";

import styles from './styles.module.scss';

const SceneList = ({ scenes, createScene, }: { scenes: IScene[]; createScene: (state: any) => void; }) => {
    const dispatch = useAppDispatch();
    const select = (item: IScene) => {
        dispatch(selectScene(item));
    };
    return (
        <div className={`${styles['scene-list']} ${styles['container']} simple-scrollbar`}>
            <CreateSceneButton createScene={createScene} />
            {
                scenes.map(
                    (item, index) => (
                        <div key={index} className={styles['item']} onClick={() => select(item)}>
                            <img
                                className={styles['item__img']}
                                src={
                                    `${process.env.NEXT_PUBLIC_API_URL}/files/serve/?id=${item.background.id}&mimeType=${item.background.mimeType}`
                                }
                            />
                            <label>{item.label || item.id}</label>
                        </div>
                    )
                )
            }
        </div>
    );
};

export default SceneList;
