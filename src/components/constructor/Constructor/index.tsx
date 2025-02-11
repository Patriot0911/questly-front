import SceneSection from '../SceneSection';
import SideBar from '../SideBar';

import styles from '../styles.module.scss';

const Constructor = () => {
    return (
        <div className={styles['wrapper']}>
            <SideBar />
            <SceneSection />
        </div>
    );
};

export default Constructor;
