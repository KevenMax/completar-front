import React, {Component} from 'react';
import { logout } from '../../services/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Dashboard extends Component {

  handleLogout = e => {
    e.preventDefault();
    logout();
    toast.info('Até logo!', toast.POSITION.TOP_RIGHT);
    // this.props.history.push('/');
  }

  render(){
    return(
      <div>
        <h1>Olá</h1>
        <form onSubmit={this.handleLogout}>
          <button type="submit">Sair</button>
        </form>
        <ToastContainer/>
      </div>
    );
  }
}

export default Dashboard;