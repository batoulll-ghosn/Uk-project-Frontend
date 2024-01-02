import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './styles/header.css';
const clientId = "865161690861-6nk4hq8qj0df5jmm543ma4mpvje02kft.apps.googleusercontent.com";

function Login() {
 const onSuccess = (res) => {
     const decodedToken = jwtDecode(res.credential);
     console.log("LOGIN SUCCESS! User email:", decodedToken.email);
 }
 const onFailure = (res) => {
     console.log("LOGIN failed!!", res);
 }

 return (
     <GoogleOAuthProvider clientId={clientId}>
         <div id='signInButton'>
             <GoogleLogin
               buttonText="Login"
               onSuccess={onSuccess}
               onFailure={onFailure}
               cookiePolicy={'single_host_origin'}
               isSignedIn={true}
               scope='email'
               className='signInButton'/>
         </div>
     </GoogleOAuthProvider>
 )
}

export default Login;
