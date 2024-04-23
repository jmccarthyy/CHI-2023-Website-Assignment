/**
 * Sign In
 *
 * This will be the main navigation component in
 * the app, with links to all main pages
 *
 * @author Jake McCarthy
 */

import { useEffect, useState } from 'react';

// Allows user to log in and sets token, saving it in local storage
function SignIn(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorSigningIn, setErrorSigningIn] = useState(false);

  const signIn = () => {
    const encodedString = btoa(username + ':' + password);
    fetch('https://w20043974.nuwebspace.co.uk/kf6012/api/token', {
      method: 'POST',
      headers: new Headers({ "Authorization": "Basic " + encodedString })
    })
      .then(response => {
        if (response.status === 200) {
          props.setSignedIn(true);
          setErrorSigningIn(false); // Reset errorSigningIn state
          window.location.reload();
        } else {
          setErrorSigningIn(true);
        }
        return response.json();
      })
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
      })
      .catch(error => {
        console.log(error);
        setErrorSigningIn(true);
      });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUsername('');
    setPassword('');
    props.setSignedIn(false);
    window.location.reload();
  };

  const handleUsername = (event) => { setUsername(event.target.value) };
  const handlePassword = (event) => { setPassword(event.target.value) };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.setSignedIn(true);
    }
  }, []);

  const errorColor = (errorSigningIn) ? ' bg-red-200' : ' bg-slate-100';

  return (
    <div className='p-2 text-md text-right'>
      {!props.signedIn && <div>
        <input
          type="text"
          placeholder='username'
          className={'p-1 mx-2 rounded-md' + errorColor}
          value={username}
          onChange={handleUsername}
        />
        <input
          type="password"
          placeholder='password'
          className={'p-1 mx-2 rounded-md' + errorColor}
          value={password}
          onChange={handlePassword}
        />
        <input
          type="submit"
          value='Sign In'
          className='py-1 px-2 mx-2 bg-green-100 hover:bg-green-500 rounded-md'
          onClick={signIn}
        />
      </div>}
      {props.signedIn && <div>
        <input
          type="submit"
          value='Sign Out'
          className='py-1 px-2 mx-2 bg-green-100 hover:bg-green-500 rounded-md'
          onClick={signOut}
        />
      </div>}
    </div>
  );
}

export default SignIn;
