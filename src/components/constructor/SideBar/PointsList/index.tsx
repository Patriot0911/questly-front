'use client';

import { useConstructorInteractionsSelector } from '@/hooks/redux/constructor';
import { loadInteractions } from '@/lib/redux/slices/constructor';
import { useAppDispatch, useAppSelector, } from '@/hooks/redux';
import { useUserSelector, } from '@/hooks/redux/auth';
import { useFetchWithAuth, } from '@/lib/utils';
import { useParams, } from 'next/navigation';
import { ChangeEvent, useEffect, useState, } from 'react';

import styles from './styles.module.scss';

const PointsList = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const [searchWord, setSearch] = useState('');
    const fetchWithAuth = useFetchWithAuth();
    const { isLoading, } = useAppSelector(useUserSelector);
    const interactions = useAppSelector(useConstructorInteractionsSelector);

    const searchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    useEffect(
        () => {
            (async () => {
                const { id, } = params;
                if(!id)
                    return;
                const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/quest-constructor/${id}/interactions`);
                if(!res)
                    return;
                const { data, meta, } = await res.json();
                dispatch(loadInteractions({ data, }));
            })();
        }, [isLoading]
    );
    return (
        <div className={styles['points-wrapper']}>
            <input onChange={searchChange} className={styles['points-header']} placeholder='Пошук'/>
            <div className={`simple-scrollbar ${styles['points-list']}`}>
                {
                    interactions.filter(
                        (item) => (searchWord.length < 3 || (searchWord.length >= 3 && item.label.includes(searchWord)))
                    ).map(
                        (item) => (
                            <div key={item.id}>
                                <span>
                                    {item.label}
                                </span>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default PointsList;
