import React, { Dispatch, SetStateAction, createContext, useState } from 'react';

import { ILoggedUser } from 'services/userService';

import { ELanguageType } from 'enums/languageType';

// Sem vkladat jednotlive casti store, napr. token, language, nactena data z API ktera budou globalni pro vsechny
export interface IStore {
    token: string | null;
    language: ELanguageType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalConfig: any | null;
    loggedUser: ILoggedUser | null;
}

// Dipsatcher pro store, dle zadani bude upravovan
interface IStoreActions {
    setStoreState?: Dispatch<SetStateAction<IStore>>;
}

interface IStoreProps {
    children: React.ReactNode;
}

export type IStoreKeys = keyof IStore;

// defaultni hodnota globalniho store, prozatim {}
export const defaultStoreState: IStore = {
    token: null,
    language: ELanguageType.CZ,
    globalConfig: null,
    loggedUser: null
};

// globalni store
export const Context = createContext<IStore & IStoreActions>(defaultStoreState);

// Zakladni komponenta se store, ktera nam dovoluje pouzivat v jejich childech useContext
const Store = (props: IStoreProps) => {
    const [storeState, setStoreState] = useState<IStore>(defaultStoreState);
    // notification component musime declarovat tu aby mal pristup ku current state (Robilo neplechu pri zmene jazyka)
    return (
        <Context.Provider
            value={{
                ...storeState,
                setStoreState
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default Store;
