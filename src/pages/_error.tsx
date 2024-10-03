import { NextPageContext } from 'next';

interface ErrorProps {
  statusCode?: number; // statusCode can be a number or undefined
}

function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on the server`
        : 'An error occurred on the client'}
    </p>
  );
}

// This gets the error status code from the server or client
ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
