import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';


class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initalProps = await Document.getInitialProps(ctx);

        return { ...initalProps };
    }

    render() {
        return (
            <Html lang="se">
                <Head>
                    <meta name="description" content="Hämta enkelt hem dina inställningar för din e-post hos Inleed.se"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
} 

export default MyDocument;