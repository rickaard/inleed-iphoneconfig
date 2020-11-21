import dns from 'dns';
const dnsPromise = dns.promises;

import { serverNames } from './servernames';


export const getdnsRecords = async (url: string): Promise<string[]> => {
    return dnsPromise.resolve(url, 'A')
        .then((result: any) => result)
        .catch((err: any) => err)
};

export const findMatchingIP = (ipArr: string[]) => {

    let servername: string = '';
    for (const ip of ipArr) {
        for (const server of serverNames) {
            if (server[ip]) {
                servername = server[ip];
            }
        }
    }
    return servername;
};