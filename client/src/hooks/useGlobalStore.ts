import { useContext } from 'react';

import { Context, defaultStoreState } from 'components/hoc/Store';

/* Hook pro použití GlobalStore */
export const useGlobalStore = () => {
    const context = useContext(Context);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resetGlobalStore = (storeState?: any) => {
        if (!context.setStoreState) return;

        // kopie celého objektu
        let defState = defaultStoreState;
        defState = {
            ...defState,
            ...storeState,
            language: context.language
        };

        context.setStoreState(defState);
    };

    return {
        ...context,
        resetGlobalStore
    };
};
