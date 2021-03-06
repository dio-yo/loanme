import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TextField from "@material-ui/core/TextField";
import TableBody from '@material-ui/core/TableBody';
import axios from 'axios';
import { apiURl } from './utility';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import EditIcon from '@material-ui/icons/Edit';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './App.css';

const useStyles = makeStyles((theme) => ({
    btnGrp: {
        display: 'flex'
    },
    updateBtn: {
        marginTop: 15,
        marginRight: 15
    },
    rowing: {
        marginTop: 20
    },
    textField: {
        marginTop: -5,
        marginLeft: 5
    },
    table: {
        minWidth: 650,
    },
    addBtn: {
        marginBottom: 20
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function ShowUsers(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);
    const [selectedAmount, setSelectedAmount] = React.useState(null);
    const [newUser, setNewUser] = React.useState(false);
    const [userData, setUserData] = React.useState({ name: null, amount: null });
    const handleClick = (id) => {
        let _selected = props.users.find((row) => { if (row._id === id) { return row } });
        setSelected(_selected);
        setSelectedAmount(_selected.amount);
        handleOpen();
    }

    const handleDelete = () => {
        let _totals = { ...props.totals };
        _totals.total_deposit = Number(_totals.total_deposit) - Number(selected.amount);
        props.updateTotals(_totals);
        axios.delete(`${apiURl}/users/${selected._id}`,)
            .then(function (response) {
                props.populateUsers()
            })
            .catch(function (error) {
                console.log(error);
                alert('Something went wrong')
            });
        handleClose();
    }

    const handleNameChange = (e) => {
        let _userData = { ...userData };
        _userData.name = e.target.value;
        setUserData(_userData);
    }

    const handleAmountChange = (e) => {
        let _userData = { ...userData };
        _userData.amount = e.target.value;
        setUserData(_userData);
    }

    const addUser = () => {
        let _totals = { ...props.totals };
        _totals.total_deposit = Number(_totals.total_deposit) + Number(userData.amount);
        props.updateTotals(_totals);
        axios.post(`${apiURl}/users`, userData)
            .then(function (response) {
                props.populateUsers()
            })
            .catch(function (error) {
                console.log(error);
                alert('Something went wrong')
            });
        handleClose()
    }

    const handleUpdate = () => {
        const { name } = selected;
        let data = {
            name,
            amount: selectedAmount
        };
        let _totals = { ...props.totals };
        _totals.total_deposit = Number(_totals.total_deposit) + Number(selectedAmount) - Number(selected.amount);
        props.updateTotals(_totals);
        axios.put(`${apiURl}/users/${selected._id}`, data)
            .then(function (response) {
                props.populateUsers()
            })
            .catch(function (error) {
                console.log(error);
                alert('Something went wrong')
            });
        handleClose()
    }

    const handleOnChange = (e) => {
        setSelectedAmount(e.target.value);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSelected(null);
        setOpen(false);
        setNewUser(false);
        setUserData({ name: null, amount: null })
    };

    const handleAddUser = () => {
        setNewUser(true);
        handleOpen();
    }

    return (
        <div>
            <Button onClick={handleAddUser} className={classes.addBtn} variant="contained">Add user</Button>
            {props.users.length > 0 &&
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.users.map((row) => (
                                <TableRow key={row.id} >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">Rs {row.amount}</TableCell>
                                    <TableCell align="right"><EditIcon className='icon' onClick={() => handleClick(row._id)} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className={classes.paper}>
                    {!!selected &&
                        <>
                            <div className={classes.rowing}><b>Name: </b><span> {selected.name}</span></div>
                            <div className={classes.rowing}><b>Amount: </b><span> Rs
                                <TextField
                                    className={classes.textField}
                                    type="number"
                                    onChange={handleOnChange}
                                    value={selectedAmount}
                                /></span></div>
                            <div className={classes.btnGrp}>
                                <Button onClick={handleUpdate} color="primary" disabled={selected.amount === selectedAmount} className={classes.updateBtn} variant="contained">Update</Button>
                                <Button onClick={handleDelete} color="secondary" className={classes.updateBtn} variant="contained">Delete User</Button>
                            </div>
                        </>
                    }
                    {newUser &&
                        <>
                            <div>
                                <TextField
                                    label='Name'
                                    className={classes.rowing}
                                    onChange={handleNameChange}
                                    value={userData.name}
                                />
                            </div>
                            <TextField
                                label='Amount'
                                className={classes.rowing}
                                type="number"
                                onChange={handleAmountChange}
                                value={userData.amount}
                            />
                            <div>
                                <Button onClick={addUser} color="default" className={classes.updateBtn} variant="contained">Add User</Button>
                            </div>
                        </>
                    }
                </div>
            </Modal>
        </div>
    );
}

export default ShowUsers;