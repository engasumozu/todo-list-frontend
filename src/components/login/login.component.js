import React, { Component } from "react";
import { TextField } from "@mui/material";

class Login extends Component {

  render() {
    return (
      <TextField id="outlined-basic" label="Email" variant="outlined" color="primary" />
    );
  }
}

export default Login;