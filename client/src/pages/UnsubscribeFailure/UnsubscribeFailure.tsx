import React from 'react';
import { useLocation } from 'react-router-dom';

const UnsubscribeFailure = (): React.ReactElement => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const message = searchParams.get('message');

  return (
    <div className="newsletter-failure">
      <h1>Oops!</h1>
      {message ? (
        <p>Error: {decodeURIComponent(message)}</p>
      ) : (
        <p>There was a problem processing your request.</p>
      )}
    </div>
  );
};

export default UnsubscribeFailure;