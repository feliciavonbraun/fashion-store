import { CSSProperties, useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import LogInForm from './LogInForm';
import RegisterForm from './RegisterForm';

function LogIn() {
  const [toggleForm, setToggleForm] = useState(false);
  const { loginResponse, emailResponse } = useContext(UserContext)

  return (
    <main style={backgroundImage}>
      <div style={formContainerStyle}>
        <h2 style={titleStyle}
        >
          {toggleForm
            ? 'REGISTER'
            : 'LOG IN'
          }
        </h2>
        {toggleForm
          ? <>
              <p style ={errorMessage}>
                  {emailResponse === 'notApproved' && "Email is already taken"}
              </p>
             
           <RegisterForm toggleForm={(value) => setToggleForm(value)} />
           </>
          : <> 
              <p style ={errorMessage}>
                {loginResponse !== 'LoggedIn' && loginResponse}
              </p>
           <LogInForm toggleForm={(value) => setToggleForm(value)} />
          </>
        }
      </div>
    </main>
  );
}

const backgroundImage: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  backgroundImage: 'url("https://github.com/feliciavonbraun/fashion-store/blob/master/client/src/assets/carousel1.png?raw=true")',
  backgroundSize: 'cover',
};

const formContainerStyle: CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '40rem',
  padding: '1.5rem, 1rem, 1rem',
  backgroundColor: '#FFFFFFE5',
};

const titleStyle: CSSProperties = {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  margin: '1rem 0 2rem',
};

const errorMessage: CSSProperties = {
  position: 'absolute',
  top: '3.5rem',
  fontSize: '1rem',
  color: 'red',
};

export default LogIn;
