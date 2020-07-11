import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Loan from './Loan';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { apiURl } from './utility';
import ShowUsers from './ShowUsers';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function HomePage() {
    const [tabs, setTabs] = React.useState(0);
    const [users, setUsers] = React.useState([]);
    const [loans, setloans] = React.useState([]);
    const [totals, setTotals] = React.useState({ total_deposit: 0, loan: 0, interest_earned: 0 });
    const useStyles = makeStyles((theme) => ({
        info: {
            display: 'flex',
            justifyContent: 'space-around'
        },
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
    }));
    const classes = useStyles();

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setTabs(newValue);
    };

    const populateUsers = () => {
        axios.get(`${apiURl}/users`)
            .then(function (res) {
                setUsers(res.data)
            })
            .catch(function (error) {
                console.log(error);
                alert('Something went wrong')
            })
    }

    const populateLoans = () => {
        axios.get(`${apiURl}/loans`)
            .then(function (res) {
                setloans(res.data)
            })
            .catch(function (error) {
                console.log(error);
                alert('Something went wrong')
            })
    }

    const populateTotals = () => {
        axios.get(`${apiURl}/totals`)
            .then(function (res) {
                if (res.data.length > 0) {
                    setTotals(res.data[0])
                } else {
                    updateTotals(totals)
                }
            })
            .catch(function (error) {
                console.log(error);
                alert('Something went wrong')
            })
    }

    const updateTotals = (data) => {
        axios.post(`${apiURl}/totals`, data)
            .then(function (res) {
                populateTotals();
            })
            .catch(function (error) {
                console.log(error);
                alert('Something went wrong')
            });
    }

    useEffect(() => {
        populateTotals();
        populateUsers();
        populateLoans();
    }, []);

    return (
        <div className="HomePage">
            <CssBaseline />
            <Container maxWidth="65%">
                <div className='container'>
                    <div className={classes.root}>
                        <div className={classes.info}>
                            <span><b>Total Deposit:</b> Rs {totals.total_deposit}</span>
                            <span><b>Total Money lended:</b> Rs {totals.loan}</span>
                            <span><b>Total Interest Earned:</b> Rs {totals.interest_earned}</span>
                            <span><b>Total Money</b><i>(deposit + interest)</i>: Rs {Number(totals.interest_earned) + Number(totals.total_deposit)}</span>
                        </div>
                        <AppBar color='transparent' position="static">
                            <Tabs value={tabs} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="Users" {...a11yProps(0)} />
                                <Tab label="Loan" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={tabs} index={0}>
                            <ShowUsers
                                updateTotals={updateTotals}
                                totals={totals}
                                populateUsers={populateUsers} users={users} />
                        </TabPanel>
                        <TabPanel value={tabs} index={1}>
                            <Loan
                                updateTotals={updateTotals}
                                totals={totals}
                                populateLoans={populateLoans} loans={loans} />
                        </TabPanel>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default HomePage;
