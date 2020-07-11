import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
    const useStyles = makeStyles((theme) => ({
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

    return (
        <div className="HomePage">
            <CssBaseline />
            <Container maxWidth="65%">
                <div className='container'>
                    <div className={classes.root}>
                        <AppBar color='transparent' position="static">
                            <Tabs value={tabs} onChange={handleChange} aria-label="simple tabs example">
                                <Tab label="Users" {...a11yProps(0)} />
                                <Tab label="Loan" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={tabs} index={0}>
                            <ShowUsers/>
                        </TabPanel>
                        <TabPanel value={tabs} index={1}>
                            Loan
                        </TabPanel>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default HomePage;
