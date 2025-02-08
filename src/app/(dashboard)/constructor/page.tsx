import { LuMousePointerClick } from "react-icons/lu";
import { MdCreateNewFolder } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoIosPlay } from "react-icons/io";

import styles from './styles.module.scss';

const ConstructorPage = () => {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['sidebar']}>
                <div className={styles['points-list']}>
                    t
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
                    <div className={styles['scene__side']}></div>
                </div>
                <div className={`${styles['container']} ${styles['scene-list']}`}></div>
            </div>
        </div>
    );
};

export default ConstructorPage;