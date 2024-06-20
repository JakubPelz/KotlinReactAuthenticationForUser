import { useCallback, useContext } from 'react';

import { Context, IStore } from 'components/hoc/Store';

const useSetStore = () => {
    const { setStoreState = () => {} } = useContext(Context);
    const setterFunc = <T extends keyof IStore>(key: T, values: IStore[T]) => {
        setStoreState(pv => {
            return {
                ...pv,
                [key]: values
            };
        });
    };

    const setStore = useCallback(setterFunc, [setStoreState]);
    return {
        setStore
    };
};

export default useSetStore;
