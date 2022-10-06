import GoogleButton from 'react-google-button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import styles from './Login.module.css';

export default function Login() {
  const [userData, setUserData] = useState();

  async function fetchAuthUser() {
    const response = await axios.get('http://localhost:3000/me', {
      withCredentials: true,
    });
    console.log('response', response);

    if (response?.data) {
      setUserData(response.data.userId);
    }
  }

  async function redirectToGoogleSSO() {
    let timer: NodeJS.Timer | null = null;
    const googleLoginUrl = 'http://localhost:3000/auth/google';
    const newWindow = window.open(
      googleLoginUrl,
      '_blank',
      'width=500,height=600'
    );

    if (newWindow) {
      timer = setInterval(async () => {
        if (newWindow.closed) {
          console.log("You're authenticated");
          fetchAuthUser();
          if (timer) {
            clearInterval(timer);
          }
        }
      }, 500);
    }
  }

  return (
    <div className={styles.loginPage}>
      userData: {userData}
      <GoogleButton onClick={redirectToGoogleSSO} />
      <Link to="/">Home page</Link>
    </div>
  );
}
