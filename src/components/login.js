import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './styles/header.css';
import { Link } from 'react-router-dom';
import { login, getUsersByEmail,loginGoogle } from './actions/user';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import './styles/login.css';
const clientId = '865161690861-6nk4hq8qj0df5jmm543ma4mpvje02kft.apps.googleusercontent.com';

function Loginn({ onClick }) {
  const onSuccess = (res) => {
    const decodedToken = jwtDecode(res.credential);
 
    onClick(decodedToken.email);
  };

  const onFailure = (error) => {

    toast.error(`Login failed: ${error.message}`);
  };
  const customStyle = {
    backgroundColor: '#ff0000',
    color: '#ffffff',
    borderRadius: '10px',
   };
   
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div id="signInButton">
        <GoogleLogin
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          scope="email"
          style={{  borderRadius:"500px"  }}
          isSignedIn={true}
          cookiePolicy={'single_host_origin'}
         
        />
      </div>
    </GoogleOAuthProvider>
   );
   
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const handleClick = async (googleEmail) => {
    console.log(googleEmail)
    try {
    
      const response1 = await dispatch(loginGoogle(googleEmail));
      localStorage.setItem('token', response1.token);
      
      const response = await dispatch(getUsersByEmail(googleEmail));
      if (response.length >= 1) {
        const email = response[0].email;
        const fullName = response[0].fullName;
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('fullName', fullName);
        toast.success('Login Successful');
        navigate('/');
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('fullName', fullName);
      } else {
        toast.error('Login Failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred during login');
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
    
      const response = await dispatch(login(email, password));
      localStorage.setItem('token', response.token);
    
      const response1 = await dispatch(getUsersByEmail(email));
      const userEmail = response1[0].email;
      const fullName = response1[0].fullName;
    
      if (response.success === true) {
        sessionStorage.setItem('email', userEmail);
        sessionStorage.setItem('fullName', fullName);
        toast.success(response.message);
        navigate('/');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error during login:", error);
    }
    
  };
  

  return (
    <div id='login-full-vision' className="flex h-screen SignIn-container  justify-center items-center pt-0">
      <form className="form-of-login" onSubmit={handleSubmit}>
        <h2 className='the-welcome-sentence'> Welcome Back!</h2>
        <p className="text-after-welcome">
          Login to your existing account in our community 
        </p>
        <div className="mb-8">
          <input 
            autoComplete="off"
            type="email"
            id="email"
            name="email"
            value={email}
            className="rounded-full p-2 py-2 border border-black bg-gray-100 italic text-xl w-80"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          
          />
        </div>

        <div className="rounded-full mb-4 relative ">
          <input
           autoComplete="off"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="rounded-full w-80 p-2 py-2 border border-black bg-gray-100 pr-10 italic text-xl"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="20"
                viewBox="0 0 640 512"
              >
                <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />

              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
               

 width="18"
                viewBox="0 0 576 512"
              >
                <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z" />
              </svg>
            )}
          </div>
        </div>
        <div className="mb-4 text-left">
          <Link to="/SignUp">
            <a href="" id="forget_password" className="underline text-lg hover:text-#2E3480 text-shadow">
            
            </a>
          </Link>
        </div>
        <button className='loginButton' type="submit" >Login
        </button>
        <div className="mb-4 text-left">
          <p className="text-after-welcome">
            or connect using 
          </p>
          <Loginn onClick={handleClick}/>
        </div>
      </form>
      <div className="mb-4 text-left">
        <Link to="/SignUp">
          <a href="" id="forget_password" className="underline text-lg hover:text-#2E3480 text-shadow">
            Don't Have an Account? SignUp.
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
