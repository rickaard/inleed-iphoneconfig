import { NextApiRequest, NextApiResponse } from 'next'
import { findMatchingIP, getdnsRecords } from '../../../utils/helper-functions';

import { getXMLDoc } from '../../../utils/xml-creater';
import fs from 'fs';
import path from 'path';


const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    if (_req.method !== 'POST') return res.status(200).json({message: 'Are you looking for https://inleed.se ?'});
    try {
        const { email } = <{ email: string }>_req.body;
        const domain: string = email.split('@')[1];

        console.log(email);

        const ipAdresses = await getdnsRecords(domain);
        const server = findMatchingIP(ipAdresses);

        if (!server) throw Error('No matching Inleed servername');

        const xmlData = getXMLDoc(email, server);

        fs.writeFile(path.join(process.cwd(), `temp/${domain}.mobileconfig`), xmlData.toString(), err => {
            console.log(err);
            if (err) throw Error('Something went wrong while trying to create file');

            const fileBuffer = fs.readFileSync(path.join(process.cwd(), `temp/${domain}.mobileconfig`));
            res.setHeader('Content-Disposition', 'attachment');
            res.send(fileBuffer);

            setTimeout(() => {
                fs.access(path.join(process.cwd(), `temp/${domain}.mobileconfig`), (err: any) => {
                    if (err) return;
                    fs.unlink(path.join(process.cwd(), `temp/${domain}.mobileconfig`), (err: any) => {
                        if (err) return console.log('file does not exist');
                        console.log('deleted');
                    })
                })

            }, 5000);
        })
    } catch (err) {
        res.status(404).json({ status: 'error', errorMessage: err.message});
    }


}


export default handler
