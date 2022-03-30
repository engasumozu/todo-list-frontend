import './App.css';
import { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";

import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import Todo from './components/todo/todo.component';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <div>
              <p>
                {process.env.REACT_APP_API_ENDPOINT} ?
              </p>
            </div>
            <div className="container mt-3">
              <Routes>
                <Route path="/" element={<Todo></Todo>} />
                <Route path="/login" element={<Login></Login>} />
                <Route path="/register" element={<Register></Register>} />
                <Route path="/todo" element={<Todo></Todo>} />
              </Routes>
            </div>
          </header>
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  const { user, isLoggedIn } = state.authorization;
  return {
    user,
    isLoggedIn
  };
}
export default connect(mapStateToProps)(App);
