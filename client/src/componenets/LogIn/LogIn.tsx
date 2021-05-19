import { CSSProperties, Component } from 'react';
import LogInForm from './LogInForm';
import RegisterForm from './RegisterForm';

interface State {
  toggleForm: boolean
}

class LogIn extends Component {
  state: State = {
    toggleForm: false
  }

  handleToggleForm = (value: boolean) => {
    this.setState({toggleForm: value})
  }

  render() {
    return (
      <main style={backgroundImage}>
        <div style={formContainerStyle}>
          <h1 style={titleStyle}
          >
          {this.state.toggleForm
            ? 'REGISTER'
            : 'LOG IN'
          }
            
          </h1>
          {this.state.toggleForm
            ? <RegisterForm toggleForm={this.handleToggleForm}/> 
            : <LogInForm toggleForm={this.handleToggleForm}/>
          }
        </div>
      </main>
    );
  }
}

const backgroundImage: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  backgroundImage: 'url("https://github.com/feliciavonbraun/fashion-store/blob/master/client/src/assets/carousel1.png?raw=true")',
  backgroundSize: 'cover',
}

const formContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '40rem',
  padding: '1.5rem, 1rem, 1rem',
  backgroundColor: '#FFFFFFE5',
}

const titleStyle: CSSProperties = {
  textAlign: 'center',
  fontWeight: 'bold',
  margin: '1rem 0 2rem',
}

export default LogIn;
