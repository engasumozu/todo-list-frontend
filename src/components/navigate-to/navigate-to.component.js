import React from 'react';
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material";

const NavigateTo = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <Button type={props.type ?? "button"}
        variant="contained"
        color={props.color}
        onClick={() => navigate(props.path)}>
        {props.label}
      </Button>
    </>
  )
};

export default NavigateTo;