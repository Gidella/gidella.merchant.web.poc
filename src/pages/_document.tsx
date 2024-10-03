import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJpNHuY3-wW6iUgv5DidNh3pvFICmryDc&libraries=places&loading=async" defer></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}