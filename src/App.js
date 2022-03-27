import './App.css';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import authorizationService from './services/authorization.service';
import todoService from "./services/todo.service";

import { logout } from "./actions/authorization.action";

import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import Todo from './components/todo/todo.component';

class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  login() {
    authorizationService.login("cristian@mail.com", "123456789");
  };

  getTodoList() {
    todoService.getAllByUser()
      .then((response) => {
        console.log(response)
      });
  }

  render() {
    return (
      <Router>
        <Link to={"/login"} className="navbar-brand">
              bezKoder
            </Link>
            <Link to={"/register"} className="navbar-brand">
              bezKoder
            </Link>
            <Link to={"/todo"} className="navbar-brand">
              bezKoder
            </Link>
        <div className="App">
          <header className="App-header">
            <Login></Login>
          </header>
        </div>
        <div className="container mt-3">
            <Routes>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/todo" component={Todo} />
            </Routes>
          </div>
      </Router>
    )
  }
}

export default App;
