import { LuMousePointerClick } from "react-icons/lu";
import { MdAddBox, MdCreateNewFolder, MdNoteAdd } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoIosPlay, IoMdAddCircleOutline } from "react-icons/io";

import styles from './styles.module.scss';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
                <ScrollArea className={`${styles['scroll']} ${styles['container']} dark`}>
                    <div className={`${styles['scene-list']}`}>
                        <div className={`${styles['item']} ${styles['new-item']}`}>
                            <MdAddBox />
                        </div>
                        {
                            [...new Array(10)].map(
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
                    <ScrollBar className="m-1" orientation="horizontal"></ScrollBar>
                </ScrollArea>
            </div>
        </div>
    );
};

export default ConstructorPage;