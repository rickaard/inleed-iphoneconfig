const express = require('express');
const next = require('next');
const fs = require('fs');

const { findMatchingIP, getdnsRecords, getXMLDoc } = require('./helpers');


const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(express.json());
    server.use(express.static('temp'));

    server.post('/gen', async (req, res) => {
        console.log('/gen har tagit emot');
        try {
            const { email } = req.body;
            const domain = email.split('@')[1];

            const ipAdresses = await getdnsRecords(domain);
            const server = findMatchingIP(ipAdresses);

            if (!server) throw Error('No matching Inleed servername');

            const xmlData = getXMLDoc(email, server);

            fs.writeFile(`${__dirname}/temp/${domain}.mobileconfig`, xmlData.toString(), (err) => {
                if (err) throw Error('Something went wrong while trying to create file');

                res.status(200).json({ downloadUrl: `${req.headers.host}/download/${domain}.mobileconfig` });

                setTimeout(() => {
                    fs.access(`${__dirname}/temp/${domain}.mobileconfig`, (err) => {
                        if (err) return;
                        fs.unlink(`${__dirname}/temp/${domain}.mobileconfig`, (err) => {
                            if (err) return console.log('file does not exist');
                            console.log('deleted');
                        })
                    })

                }, 5000);

            })
        } catch (err) {
            res.status(404).json({ status: 'error', errorMessage: err });
        }
    });

    server.get('/download/:file', (req, res) => {
        const { file } = req.params;
        console.log(file);
        fs.readFile(`${__dirname}/temp/${file}`, (error, content) => {
            if (error) res.status(500).json({ status: 'error', errorMessage: error });
            console.log('err vid download:file', error);
            res.writeHead(200, { 'Content-Disposition': 'attachment' });
            res.end(content);
        });
    })


    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(PORT, err => {
        if (err) throw err;
        console.log('Ready on port: ' + PORT);
    })
})