const dns = require('dns');
const dnsPromise = dns.promises;

// const { serverNames } = require('./servernames');

const serverNames = [
    { "5.150.195.194": "ns1.inleed.net" },
    { "5.150.195.195": "ns2.inleed.net" },
    { "5.150.195.197": "ns3.inleed.net" },
    { "194.68.59.6": "ns4.inleed.net" },
    { "5.150.195.219": "ns5.inleed.net" },
    { "5.150.195.212": "ns6.inleed.net" },
    { "46.59.102.201": "ns7.inleed.net" },
    { "194.14.207.238": "ns8.inleed.net" },
    { "192.165.9.92": "ns9.inleed.net" },
    { "185.189.48.15": "ns10.inleed.net" },
    { "185.189.48.159": "ns11.inleed.net" },
    { "185.189.51.191": "ns12.inleed.net" },
    { "185.189.48.4": "prime1.inleed.net" },
    { "185.189.51.40": "prime2.inleed.net" },
];

const getdnsRecords = async (url) => {
    return dnsPromise.resolve(url, 'A')
        .then((result) => result)
        .catch((err) => err)
};

const findMatchingIP = (ipArr) => {

    let servername = '';
    for (const ip of ipArr) {
        for (const server of serverNames) {
            if (server[ip]) {
                servername = server[ip];
            }
        }
    }
    return servername;
};

const getXMLDoc = (email, servername) => {
    return (
        `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>HasRemovalPasscode</key>
	<false/>
	<key>PayloadContent</key>
	<array>
		<dict>
			<key>EmailAccountDescription</key>
			<string>${email}</string>
			<key>EmailAccountName</key>
			<string>${email}</string>
			<key>EmailAccountType</key>
			<string>EmailTypeIMAP</string>
			<key>EmailAddress</key>
			<string>${email}</string>
			<key>IncomingMailServerAuthentication</key>
			<string>EmailAuthPassword</string>
			<key>IncomingMailServerHostName</key>
			<string>${servername}</string>
			<key>IncomingMailServerPortNumber</key>
			<integer>993</integer>
			<key>IncomingMailServerUseSSL</key>
			<true/>
			<key>IncomingMailServerUsername</key>
			<string>${email}</string>
			<key>OutgoingMailServerAuthentication</key>
			<string>EmailAuthPassword</string>
			<key>OutgoingMailServerHostName</key>
			<string>${servername}</string>
			<key>OutgoingMailServerPortNumber</key>
			<integer>465</integer>
			<key>OutgoingMailServerUseSSL</key>
			<true/>
			<key>OutgoingMailServerUsername</key>
			<string>${email}</string>
			<key>OutgoingPasswordSameAsIncomingPassword</key>
			<true/>
			<key>PayloadDescription</key>
			<string>Configure Email Settings</string>
			<key>PayloadDisplayName</key>
			<string>support@inleed.se</string>
			<key>PayloadIdentifier</key>
			<string>com.tiliq.autodiscover.com.apple.mail.managed.7A981A9E-D5D0-4EF8-87FE-39FD6A506FAC</string>
			<key>PayloadType</key>
			<string>com.apple.mail.managed</string>
			<key>PayloadUUID</key>
			<string>7A981A9E-D5D0-4EF8-87FE-39FD6A506FAC</string>
			<key>PayloadVersion</key>
			<real>1</real>
			<key>SMIMEEnablePerMessageSwitch</key>
			<false/>
			<key>SMIMEEnabled</key>
			<false/>
			<key>disableMailRecentsSyncing</key>
			<false/>
		</dict>
	</array>
	<key>PayloadDescription</key>
	<string>Configure Email Settings</string>
	<key>PayloadDisplayName</key>
	<string>${email}</string>
	<key>PayloadIdentifier</key>
	<string>com.tiliq.autodiscover</string>
	<key>PayloadOrganization</key>
	<string>inleed.se</string>
	<key>PayloadRemovalDisallowed</key>
	<false/>
	<key>PayloadType</key>
	<string>Configuration</string>
	<key>PayloadUUID</key>
	<string>48C88203-4DB9-49E8-B593-4831903605A0</string>
	<key>PayloadVersion</key>
	<integer>1</integer>
</dict>
</plist>`
    )
};




module.exports = { getdnsRecords, findMatchingIP, serverNames, getXMLDoc };