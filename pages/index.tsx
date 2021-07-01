import * as React from 'react';
import Layout from '../components/Layout';

import InputFloatingLabel from '../components/InputFloatingLabel';
import InstructionContainer from '../components/InstructionContainer';

import { texts } from '../data';

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

      console.log(result);
      // redirect to download URL
      window.location.assign(`https://${result.downloadUrl}`);


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
          <InputFloatingLabel
            inputType="email"
            handleChange={handleChange}
            inputName="email"
            inputValue={value}
            labelName="Din e-postadress"
          />
          <button type="submit" className="btn">Hämta</button>
        </form>
      </div>

      <div className="instructions-wrapper">
        <h2>Hur det går till</h2>
        {texts.map(instruction => (
          <InstructionContainer
            key={instruction.id}
            textHeader={instruction.textHeader}
            textParagraph={instruction.textPara}
            img={instruction.imgUrl}
            imgAlt={instruction.imgAlt}
          />
        ))}
      </div>

    </Layout>
  )

}

export default IndexPage
