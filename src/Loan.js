import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TextField from "@material-ui/core/TextField";
import TableBody from '@material-ui/core/TableBody';
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

function createData(id, name, amount, interest, loanDate) {
    return { id, name, amount, interest, loanDate };
}

const rows = [
    createData(123, 'Dhrubesh', 123, 5, '12th Jan 2020'),
    createData(223, 'Dio', 223, 2, '14th Jan 2020'),
];

function ShowUsers(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null);
    const [amountPaidBack, setAmountPaidBack] = React.useState(0);
    const [grantLoan, setGrantLoan] = React.useState(false);
    const [userData, setUserData] = React.useState({ name: null, amount: null, months: null, percentage: null });
    const handleClick = (id) => {
        console.log('id', id);
        let _selected = rows.find((row) => { if (row.id === id) { return row } });
        setSelected(_selected);
        // setAmountPaidBack(_selected.amount);
        console.log('_selected', _selected);
        handleOpen();
    }


    const handleDelete = () => {
        // do an api call here
        handleClose();
        // call update api here
    }

    const handleNameChange = (e) => {
        let _userData = { ...userData };
        _userData.name = e.target.value;
        console.log('_userData', _userData);
        setUserData(_userData);
    }

    const handleMonthsChange = (e) => {
        let _userData = { ...userData };
        _userData.months = e.target.value;
        console.log('_userData', _userData);
        setUserData(_userData);
    }

    const handlePercentageChange = (e) => {
        let _userData = { ...userData };
        _userData.percentage = e.target.value;
        console.log('_userData', _userData);
        setUserData(_userData);
    }

    const handleAmountChange = (e) => {
        let _userData = { ...userData };
        _userData.amount = e.target.value;
        console.log('_userData', _userData);
        setUserData(_userData);
    }

    const submitLoan = () => {
        // do an api call here
        handleClose()
        // call update api here
    }

    const handleLoanPaidBack = () => {
        // do an api call here
        handleClose()
        // call update api here
    }

    const handleOnChange = (e) => {
        setAmountPaidBack(e.target.value);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSelected(null);
        setOpen(false);
        setGrantLoan(false);
        setUserData({ name: null, amount: null, months: null, percentage: null })
    };

    const handleGrantLoan = () => {
        setGrantLoan(true);
        handleOpen();
    }

    return (
        <div>
            <Button onClick={handleGrantLoan} className={classes.addBtn} variant="contained">Grant a loan</Button>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Loan Taken on</TableCell>
                            <TableCell align="right">Interest</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id} >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">Rs {row.amount}</TableCell>
                                <TableCell align="right">{row.loanDate}</TableCell>
                                <TableCell align="right">{row.interest}%</TableCell>
                                <TableCell align="right"><EditIcon className='icon' onClick={() => handleClick(row.id)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
                            <div className={classes.rowing}><b>Loan taken on: </b><span> {selected.loanDate}</span></div>
                            <div className={classes.rowing}><b>Loan Amount: </b><span>
                                Rs {selected.amount}
                            </span>
                                <div className={classes.rowing}><b>Interest: </b><span>
                                    {selected.interest} %
                            </span>
                                </div>
                            </div>
                            <div className={classes.rowing}>
                            <span><b>Amount Paid back:</b> Rs </span>
                            <TextField
                                className={classes.textField}
                                type="number"
                                onChange={handleOnChange}
                                value={amountPaidBack}
                                />
                            </div>
                            <Button
                            disabled={amountPaidBack === 0} 
                            onClick={handleLoanPaidBack} color="primary" 
                            className={classes.updateBtn} variant="contained">Load Paid back</Button>
                        </>
                    }
                    {grantLoan &&
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
                                <TextField
                                    label='Duration (in months)'
                                    className={classes.rowing}
                                    type="number"
                                    onChange={handleMonthsChange}
                                    value={userData.months}
                                />
                            </div>
                            <TextField
                                label='Interest Percentage'
                                className={classes.rowing}
                                type="number"
                                onChange={handlePercentageChange}
                                value={userData.percentage}
                            />
                            <div>
                                <Button
                                    onClick={submitLoan}
                                    color="default"
                                    disabled={!userData.percentage || !userData.months || !userData.amount || !userData.name}
                                    className={classes.updateBtn}
                                    variant="contained">
                                    Grant Loan
                                </Button>
                            </div>
                        </>
                    }
                </div>
            </Modal>
        </div>
    );
}

export default ShowUsers;