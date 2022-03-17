import { useRef } from 'react';
import { Fragment } from 'react';

const Authentication = () => {
  const userInputRef = useRef();
  const passwordInputRef = useRef();
  const userSignin = useRef();
  const passwordSignin = useRef();

  const signupHandler = (e) => {
    e.preventDefault();

    const enteredUsername = userInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    fetch('/api/auth-handler', {
      method: 'POST',
      body: JSON.stringify({
        username: enteredUsername,
        password: enteredPassword,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => alert(data.message));
  };

  const signinHandler = (e) => {
    e.preventDefault();

    const enteredUsername = userSignin.current.value;
    const enteredPassword = passwordSignin.current.value;

    fetch('/api/auth-handler')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const authUser = data.find((user) => user.username === enteredUsername);

        if (!authUser) {
          alert('wrong user or password');
          return;
        }

        if (
          authUser.username === enteredUsername &&
          authUser.password === enteredPassword
        ) {
          alert('successfully logged in');
        } else {
          alert('wrong user or password');
        }
      });
  };

  return (
    <Fragment>
      <form onSubmit={signupHandler}>
        <input type="text" ref={userInputRef} />
        <input type="password" ref={passwordInputRef} />
        <button>Sign up</button>
      </form>
      <hr />
      <form onSubmit={signinHandler}>
        <input type="text" ref={userSignin} />
        <input type="password" ref={passwordSignin} />
        <button>Sign in</button>
      </form>
    </Fragment>
  );
};

export default Authentication;
