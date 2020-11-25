import * as React from 'react';
import { useRouter } from 'next/router';

interface Props {

}

const Domain: React.FC<Props> = () => {
    const router = useRouter();
    const { domain } = router.query;
    console.log(domain);

    return (
        <div>
            <p>Ladda ner din konfigfil:</p>
            <a href={`/${domain}.mobileconfig`} download>Hämta</a>
        </div>
    );
}

export default Domain