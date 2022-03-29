import React, { Component } from "react";
import { TextField, Button, Card, CardMedia, CardContent, Alert, Typography } from "@mui/material";
import { connect } from "react-redux";
import { registerAction } from "../../actions/authorization.action";
import { TODO_LOGO } from "../../utils/logo.util";
import { Navigate } from "react-router-dom";
import NavigateTo from "../navigate-to/navigate-to.component";

import '../../App.css';
import './register.css';

const user = JSON.parse(localStorage.getItem("user"));

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: {
                value: "",
                isValid: true
            },
            password: {
                value: "",
                isValid: true
            },
            passwordKey: {
                value: "",
                isValid: true
            },
            loading: false
        };

        this.onRegister = this.onRegister.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePasswordKey = this.onChangePasswordKey.bind(this);
    };

    onChangeEmail(e) {
        this.setState({
            email: {
                value: e.target.value,
                isValid: true
            }
        });
    }

    onChangePassword(e) {
        this.setState({
            password: {
                value: e.target.value,
                isValid: true
            }
        });
    }

    onChangePasswordKey(e) {
        if (e.target.value === this.state.password.value) {
            this.setState({
                passwordKey: {
                    value: e.target.value,
                    isValid: true
                }
            });
        }
        else {
            this.setState({
                passwordKey: {
                    value: e.target.value,
                    isValid: false
                }
            });
        }
    }

    onRegister(e) {
        e.preventDefault();

        this.setState({
            loading: true
        });

        this.isValid(this.state.email);
        this.isValid(this.state.password);
        this.isValid(this.state.passwordKey);

        console.log(this.state);
        if (this.state.email.isValid && this.state.password.isValid && this.state.passwordKey.isValid) {
            console.log("calling auth endpoint");

            const { dispatch, history } = this.props;

            dispatch(registerAction(this.state.email.value, this.state.password.value))
                .then(() => {
                    this.setState({
                        email: {
                            value: "",
                            isValid: false
                        },
                        password: {
                            value: "",
                            isValid: false
                        },
                        passwordKey: {
                            value: "",
                            isValid: false
                        },
                    });
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
        if (control.value === '' && !control.isValid) {
            control.isValid = false;
        }
    };

    render() {
        const { isLoggedIn, message } = this.props;
        console.log(isLoggedIn)
        if (message === 'Created') {
            return <Navigate to="/login" />;
        }
        else if (isLoggedIn) {
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
                        <form onSubmit={this.onRegister} ref={(c => this.form = c)}>
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
                                <TextField id="password-key" label="Confirm password"
                                    variant="standard" type="password"
                                    value={this.state.passwordKey.value}
                                    onChange={this.onChangePasswordKey}
                                />
                                <span>
                                    {this.state.passwordKey.isValid ? '' : <Alert severity="error">Confirmation password doesn't match!</Alert>}
                                </span>
                            </span>
                            <span>
                                <Button type="submit" variant="contained" color="warning" onClick={this.login}>Register</Button>
                            </span>
                        </form>
                    </CardContent>
                </Card>
                <span>
                    {(message === '' || message === undefined) ? '' : <Alert severity="warning">{message}!</Alert>}
                </span>
                <span>
                    <Typography variant="body2" color="text.secondary">Already have an account?</Typography>
                    <NavigateTo path={"/login"} color={"secondary"} label={"Login"}></NavigateTo>
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
export default connect(mapStateToProps)(Register);     