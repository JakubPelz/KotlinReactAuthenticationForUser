import { ETextCase } from 'enums/textCase';

import getLanguageObject from 'utils/getLanguageObject';

import { useGlobalStore } from './useGlobalStore';

/** Přeloží zadaný text s možností úpravy jeho "case-sensitivity" */
const useTranslateText = () => {
    const { language } = useGlobalStore();

    const translateText = (text: string, textCase?: ETextCase): string => {
        let result = getLanguageObject(language)[text];

        if (!result) return text;

        if (textCase === ETextCase.UPPER) result = result.toUpperCase();
        else if (textCase === ETextCase.LOWER) result = result.toLowerCase();
        else if (textCase === ETextCase.FIRSTUP) result = result.charAt(0).toUpperCase();

        return result;
    };

    return {
        translateText
    };
};

export default useTranslateText;
