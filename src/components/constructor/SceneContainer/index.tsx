import { useConstructorSelector } from '@/hooks/redux/constructor';
import { loadInteractions } from '@/lib/redux/slices/constructor';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IInteraction, IScene } from '@/interfaces/redux';
import { useEffect, useRef, useState, } from 'react';
import { useFetchWithAuth } from '@/lib/utils';
import { useParams } from 'next/navigation';

import styles from './styles.module.scss';

const SceneContainer = ({ currentScene, }: { currentScene: IScene, }) => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const fetchWithAuth = useFetchWithAuth();
    const ref = useRef<HTMLImageElement>(null);
    const [sceneInteractions, setSceneInetractions] = useState<IInteraction[]>([]);
    const { interactions, current: { createInteraction, }, } = useAppSelector(useConstructorSelector);

    const clickHandle = async (e: any) => {
        const { id, } = params;
        if(!id || !createInteraction)
            return;
        const rect = ref.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left-10) / rect.width;
        const y = (e.clientY - rect.top-10) / rect.height;
        const body = {
            questSceneId: currentScene.id,
            penalty: 0,
            dx: x,
            dy: y,
            radius: 5,
            label: `item #${interactions.length+1}`,
            type: 'QUESTION',
            question: {
                template: "test_state_0",
                settings: JSON.stringify({test: 1234, options: [], }),
                answers: [
                    "string",
                ],
            },
        };
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/quest-constructor/${id}/interactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if(!res)
            return;
        const { data, } = await res.json();
        dispatch(loadInteractions({
            data: [
                ...interactions,
                data,
            ]
        }));
    };

    useEffect(
        () => {
            if(interactions.length < 1)
                return;
            const lastInteraction = interactions[interactions.length-1];
            if(lastInteraction.questSceneId !== currentScene.id)
                return;
            const filteredInteractions = interactions.filter(
                (item) => item.questSceneId === currentScene.id
            );
            setSceneInetractions(filteredInteractions);
        }, [interactions,]
    );
    useEffect(
        () => {
            if(interactions.length < 1)
                return setSceneInetractions([]);
            const filteredInteractions = interactions.filter(
                (item) => item.questSceneId === currentScene.id
            );
            setSceneInetractions(filteredInteractions);
        }, [currentScene]
    );
    return (
        <div className={styles['scene-wrapper']}>
            <div
                ref={ref}
                className={styles['scene-state']}
                style={{
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}/files/serve/?id=${currentScene.background.id}&mimeType=${currentScene.background.mimeType}`,
                }}
                onClick={clickHandle}
            >
                {
                    ref.current && sceneInteractions.map(
                        (i) => (
                            <div
                                key={i.id}
                                style={{
                                    position: 'absolute',
                                    width: `${i.radius+15}px`,
                                    height: `${i.radius+15}px`,
                                    backgroundColor: 'orange',
                                    borderRadius: '50%',
                                    top: `${ref.current!.offsetHeight*i.dy}px`,
                                    left: `${ref.current!.offsetWidth*i.dx}px`,
                                }}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
};

export default SceneContainer;
