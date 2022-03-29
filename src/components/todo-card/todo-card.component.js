import React from 'react';
import { useNavigate } from "react-router-dom"
import {
    CardActions,
    Button,
    Card,
    CardContent,
    Typography,
    Avatar
} from "@mui/material";
import { red, yellow, green } from '@mui/material/colors';
import getDateNow from "../../utils/get-date-now.util";

const TodoCard = (props) => {
    const navigate = useNavigate();
    const color = props.priority === "1" ? red : (props.priority === "2" ? yellow : green);

    var date = new Date(props.when);
    var dateNow = getDateNow(date);

    return (
        <>
            <span >
                <Card sx={{ maxWidth: 500 }}>
                    <CardContent >
                        <Avatar sx={{ bgcolor: color[700], width: 30, height: 30 }}>
                            {props.priority.toString()}
                        </Avatar>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" color="primary">Edit</Button>
                        <Button variant="outlined" color="error">Delete</Button>
                        <Button variant="outlined" disabled color="error">{dateNow}</Button>
                    </CardActions>
                </Card>
            </span>
        </>
    )
};

export default TodoCard;