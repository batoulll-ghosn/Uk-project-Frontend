import React, { useState } from 'react';



const AuthButton = () => {
  const [ authCode, setAuthCode ] = useState(null);
const ClientId = 'YOUR_CLIENT_ID';
const RedirectUri = 'https://auth0.openai.com/login/callback';
const Scope = 'email profile';
  const handleClick = async () => {
    try {
      const response = await fetch(`https://accounts.google.com/o/oauth2/auth?client_id=${ClientId}&redirect_uri=${RedirectUri}&scope=${Scope}&response_type=code`);
      const data = await response.json();
      setAuthCode(data.code);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRedirect = async () => {
    try {
      const tokenUrl = `https://oauth2.googleapis.com/token?code=${authCode}&redirect_uri=${RedirectUri}&client_id=${ClientId}&grant_type=authorization_code`;
      const response = await fetch(tokenUrl);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Continue with Google</button>
      {authCode && (
        <script>
          handleRedirect();
        </script>
      )}
    </div>
  );
};

export default AuthButton;