'use client';

import PointsList from "./PointsList";
import ToolBar from "./ToolBar";

import styles from './styles.module.scss';

const SideBar = () => {
    return (
        <div className={styles['sidebar']}>
            <PointsList />
            <ToolBar />
        </div>
    );
};

export default SideBar;
