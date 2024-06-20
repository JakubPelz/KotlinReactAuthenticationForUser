import { useCallback, useContext } from 'react';

import { Context } from 'components/hoc/Store';

// Custom hook pro nastavení Global Config souboru do Contextu
const useSetGlobalConfig = () => {
    const store = useContext(Context);
    const { setStoreState = () => {} } = store;

    const setConfig = useCallback(
        () => {
            fetch('/config.json')
                .then(res => res.json())
                .then(data => {
                    setStoreState(pv => {
                        return {
                            ...pv,
                            ['globalConfig']: data
                        };
                    });
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setStoreState]
    );

    return {
        setConfig
    };
};

export default useSetGlobalConfig;
