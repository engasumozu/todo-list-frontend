import React, { Component } from "react";
import { TextField, Button, Card, CardMedia, CardContent, Alert, Typography } from "@mui/material";
import { connect } from "react-redux";
import { loginAction } from "../../actions/authorization.action";
import { clearMessage } from "../../actions/message.action";
import { TODO_LOGO } from "../../utils/logo.util";
import { Navigate } from "react-router-dom";
import NavigateTo from "../navigate-to/navigate-to.component";

import '../../App.css';
import './login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: "",
        touched: "",
        isValid: true
      },
      password: {
        value: "",
        touched: "",
        isValid: true
      },
      loading: false
    };

    this.onLogin = this.onLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

  };

  componentDidMount() {
    this.props.dispatch(clearMessage());
  }

  onChangeEmail(e) {
    this.setState({
      email: {
        value: e.target.value,
        touched: true,
        isValid: true
      }
    });
  }

  onChangePassword(e) {
    this.setState({
      password: {
        value: e.target.value,
        touched: true,
        isValid: true
      }
    });
  }

  onLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true
    });

    this.isValid(this.state.email);
    this.isValid(this.state.password);

    console.log(this.state);
    if (this.state.email.isValid && this.state.password.isValid) {
      console.log("calling auth endpoint");

      const { dispatch } = this.props;

      dispatch(loginAction(this.state.email.value, this.state.password.value))
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    }
    else {
      console.log("form invalid");
    }
  }

  isValid(control) {
    if (control.value === '') {
      control.isValid = false;
    }
  };

  render() {
    const { isLoggedIn, message } = this.props;
    if (isLoggedIn) {
      console.log(this.props);
      return <Navigate to="/todo" />;
    }
    return (
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            image={TODO_LOGO}
            alt="logo"
            className="App-logo"
          />
          <CardContent >
            <form onSubmit={this.onLogin} ref={(c => this.form = c)}>
              <span>
                <TextField id="email" label="Email"
                  variant="standard"
                  value={this.state.email.value}
                  onChange={this.onChangeEmail}
                />
                <span>
                  {this.state.email.isValid ? '' : <Alert severity="error">This field is required!</Alert>}
                </span>
              </span>
              <span>
                <TextField id="password" label="Password"
                  variant="standard" type="password"
                  value={this.state.password.value}
                  onChange={this.onChangePassword}
                />
                <span>
                  {this.state.password.isValid ? '' : <Alert severity="error">This field is required!</Alert>}
                </span>
              </span>
              <span>
                <Button type="submit" variant="contained" color="secondary" onClick={this.login}>Login</Button>
              </span>
            </form>
          </CardContent>
        </Card>
        <span>
          {(message === '' || message === undefined) ? '' : <Alert severity="warning">{message}</Alert>}
        </span>
        <span>
          <Typography variant="body2" color="text.secondary">New?</Typography>
          <NavigateTo path={"/register"} color={"warning"} label={"Register"}></NavigateTo>
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authorization;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}
export default connect(mapStateToProps)(Login);