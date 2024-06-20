import { czech } from '../data/languages/czech';
import { english } from '../data/languages/english';

interface ILanguageObject {
    [key: string]: string;
}

const getLanguageObject = (lang: string): ILanguageObject => {
    switch (lang) {
        case 'cz':
            return czech;
        case 'en':
            return english;
        default:
            return {};
    }
};

export default getLanguageObject;
