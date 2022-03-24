import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import { Component } from 'react';
import authorizationService from './services/authorization.service';
import todoService from "./services/todo.service";
import Login from "./components/login/login.component";

class App extends Component {

  login() {
    authorizationService.login("cristian@mail.com", "123456789");
  };

  getTodoList() {
    todoService.getAllByUser()
    .then((response) => {
      console.log(response)
    });
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Login></Login>
          <Button variant="contained" color='success' onClick={this.login}>Login x</Button>
          <Button variant="contained" color='info' onClick={this.getTodoList}>get todo</Button>
        </header>
      </div>
    )
  }
}

export default App;
