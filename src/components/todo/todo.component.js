import { Component } from "react";
import { connect } from "react-redux";
import {
    CardActions,
    Button,
    Card,
    CardContent,
    Avatar,
    IconButton,
    TextField,
    Alert,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";

import { orange } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Navigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

import { logoutAction } from "../../actions/authorization.action";
import { clearMessage } from "../../actions/message.action";
import { getAllAction, createAction } from "../../actions/todo.action";

import getDateNow from "../../utils/get-date-now.util";

import TodoCard from "../todo-card/todo-card.component";

import './todo.css';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: {
                value: "",
                touched: "",
                isValid: true
            },
            description: {
                value: "",
                touched: "",
                isValid: true
            },
            priority: {
                value: 1,
                touched: "",
                isValid: true
            },
            when: {
                value: getDateNow(),
                touched: "",
                isValid: true
            },
            list: []
        };
        this.logOut = this.logOut.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTodo = this.onChangeTodo.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.createTodo = this.createTodo.bind(this);
    };

    componentDidMount() {
        this.props.dispatch(clearMessage());
        this.props.dispatch(getAllAction())
            .then(() => {
                this.setState({
                    list: this.props.data
                });
            })
            .catch(() => {
            });
    }

    logOut() {
        this.props.dispatch(logoutAction());
    }

    onChangeTodo(e) {
        console.log(this.state.list.data);
        this.setState({
            todo: {
                value: e.target.value,
                touched: true,
                isValid: true
            }
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: {
                value: e.target.value,
                touched: true,
                isValid: true
            }
        });
    }

    onChangePriority(e) {
        this.setState({
            priority: {
                value: e.target.value,
                touched: true,
                isValid: true
            }
        });
    }

    createTodo(e) {
        e.preventDefault();
        let body = {
            userId: this.props.user.user._id,
            todo: this.state.todo.value,
            description: this.state.description.value,
            priority: this.state.priority.value,
            when: this.state.when.value
        }
        this.props.dispatch(createAction(body))
            .then(() => {
                console.log(this.props.created.data);
                let tempData = [...this.state.list.data];
                console.log(tempData);
                tempData.push(this.props.created.data);
                console.log(tempData);
                console.log(this.state.list.data);
                this.setState({
                    list: {
                        data: tempData
                    },
                    todo: {
                        value: "",
                        touched: "",
                        isValid: true
                    },
                    description: {
                        value: "",
                        touched: "",
                        isValid: true
                    },
                    priority: {
                        value: 1,
                        touched: "",
                        isValid: true
                    },
                    when: {
                        value: getDateNow(),
                        touched: "",
                        isValid: true
                    }
                });
                console.log(this.state.list.data);
            })
            .catch(() => {
            });
    }

    render() {
        const { isLoggedIn } = this.props;
        let todoList = [];
        if (this.state.list.data) {
            console.log(this.props);
            todoList = this.state.list.data.map(
                (d) => <TodoCard key={d._id} title={d.todo}
                    description={d.description}
                    priority={d.priority}
                    when={d.when}
                />
            );
        }

        if (!isLoggedIn) {
            console.log(this.props);
            return <Navigate to="/login" />;
        }
        return (
            <div>
                <div>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <Avatar sx={{ bgcolor: orange[700], width: 50, height: 50 }}>
                                    {this.props.user.user.email[0]}
                                </Avatar>
                            </Grid>
                            <Grid item xs={8}>
                                <div className="user-name">{this.props.user.user.email}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton color="primary" size="large" onClick={this.logOut}>
                                    <Logout />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <span className="span-out">
                    <Card sx={{ maxWidth: 500 }}>
                        <CardContent color="primary">
                            <form onSubmit={this.createTodo} ref={(c => this.form = c)}>
                                <span className="span-form">
                                    <TextField id="title" label="Title"
                                        variant="standard"
                                        value={this.state.todo.value}
                                        onChange={this.onChangeTodo}
                                    />
                                    <span>
                                        {this.state.todo.isValid ? '' : <Alert severity="error">This field is required!</Alert>}
                                    </span>
                                </span>
                                <span className="span-form">
                                    <TextField id="description" label="Description"
                                        variant="standard" multiline
                                        value={this.state.description.value}
                                        onChange={this.onChangeDescription}
                                    />
                                    <span>
                                        {this.state.description.isValid ? '' : <Alert severity="error">This field is required!</Alert>}
                                    </span>
                                </span>
                                <span className="span-form">
                                    <TextField id="when" label="when"
                                        variant="standard"
                                        value={this.state.when.value}
                                        disabled
                                    />
                                    <span>
                                        {this.state.when.isValid ? '' : <Alert severity="error">This field is required!</Alert>}
                                    </span>
                                </span>
                                <span className="span-form">
                                    <InputLabel id="priority">Priority</InputLabel>
                                    <Select
                                        labelId="priority"
                                        id="priority-select"
                                        value={this.state.priority.value}
                                        label="Priority"
                                        onChange={this.onChangePriority}
                                    >
                                        <MenuItem value={1}>Low</MenuItem>
                                        <MenuItem value={2}>Medium</MenuItem>
                                        <MenuItem value={3}>High</MenuItem>
                                    </Select>
                                </span>
                                <Button type="submit" variant="contained" color="secondary">Save</Button>
                            </form>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </span>
                {todoList}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user, isLoggedIn } = state.authorization;
    const { message } = state.message;
    const { data, created } = state.todo
    return {
        isLoggedIn,
        user,
        message,
        data, created
    };
}
export default connect(mapStateToProps)(Todo);