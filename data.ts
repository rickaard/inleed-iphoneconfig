export interface IInstruction {
    id: number;
    textHeader: string;
    textPara: string;
    imgUrl: string;
    imgAlt: string;
}

export const texts: IInstruction[] = [
    {
        id: 1,
        textHeader: 'Fyll i din e-postadress',
        textPara: 'Börja med att fylla i din e-postadres. Tryck sedan på HÄMTA. Notera att din domän måste peka mot oss för att kunna använda denna tjänst.',
        imgUrl: 'pics/1.png',
        imgAlt: 'Fyll i din e-postadress'
    },
    {
        id: 2,
        textHeader: 'Ladda hem konfigurationsfilen',
        textPara: 'När du tryckt på Hämta behöver du tillåta att hämta hem konfigurationsfilen. Tryck på Tillåt för att göra detta.',
        imgUrl: 'pics/3.png',
        imgAlt: 'Tillåt att ladda ner konfigurationsfilen'
    },
    {
        id: 3,
        textHeader: 'Profil hämtad i inställningar',
        textPara: 'När profilen nu är hämtad behöver du gå in i inställningarna. Under ditt namn ska du kunna se att det finns en ny Profil hämtad. Gå in på denna.',
        imgUrl: 'pics/4.png',
        imgAlt: 'Gå in på profilen via inställningar'
    },
    {
        id: 4,
        textHeader: 'Installera profil',
        textPara: 'Sista steget är att installera din nya profil. Tryck högst upp till höger på Installera och skriv sedan in ditt lösenord till e-posten. Därefter är allt klart och du kan använda din e-posten i din iPhone.',
        imgUrl: 'pics/5.png',
        imgAlt: 'Installera profil'
    },
]