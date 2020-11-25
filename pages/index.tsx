import * as React from 'react';

import download from 'downloadjs';

// import Link from 'next/link'
import Layout from '../components/Layout';

// import Router from 'next/router';


const IndexPage = () => {
  const [value, setValue] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);

  const getEmailConfig = async (email: string) => {
    try {

      const response: any = await fetch('/gen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      });

      if (response.status !== 200) throw new Error('Not found');

      const result = await response.json();
      // const fileName = `${value.split('@')[1]}.mobileconfig`;

      console.log(result);
      // redirect to download URL 
      window.location.assign(`${result.downloadUrl}`);


      return;
    } catch (err) {
      console.log(err);
      setError(true);
    }

  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    getEmailConfig(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }


  return (
    <Layout title="Inleed">

      <div className="form-container">
        <div className="text-content">
          <p>Fyll i din e-postadress nedan för att hämta hem mailkonfigurationen.</p>
          {error && (
            <p style={{ fontSize: '1rem', color: 'red' }}>Något gick fel. Din domän kanske inte pekar mot Inleed?</p>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <input type="email" id="email" onChange={handleChange} placeholder="Din e-postadress" />
          <button type="submit" className="btn">Hämta</button>
        </form>
      </div>

    </Layout>
  )

}

export default IndexPage
