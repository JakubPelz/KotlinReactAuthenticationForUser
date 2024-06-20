import { AxiosError } from 'axios';

/**
 * Na základě chyby volání služby vrátí příslušnou hlášku (pokud je nalezena) nebo obecnou chybu
 * @param error Axios chyba získaná z volání služby
 */
export const createErrDescription = (error: AxiosError): string => {
    let errText: string = '';

    // @ts-ignore
    const description = error.response?.data?.errorDescription;

    if (description) errText = description;

    return errText;
};
