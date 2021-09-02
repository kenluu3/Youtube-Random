import { useState } from 'react';

import { AppBar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import useStyles from './navbarStyles';

function NavigationBar() {

    const styles = useStyles();

    // toggle menu display.
    const [anchorEl, setAnchorEl] = useState();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenuDisplay = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(!menuOpen);
    }

    return (

        <AppBar position='static' className={styles.navbar}>
            <Typography className={styles.header}>
                YouTube Random
            </Typography>

            <div className={styles.buttonContainer}>
                <IconButton id='home' color='inherit' className={styles.button}>
                    <HomeIcon className={styles.icons} />
                </IconButton>

                <IconButton id='account' color='inherit' className={styles.button} aria-haspopup='true' onClick={(event) => { toggleMenuDisplay(event) }}>
                    <AccountCircleIcon className={styles.icons} />
                </IconButton>

                <Menu
                    keepMounted
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={(event) => { toggleMenuDisplay(event) }}
                >
                    <MenuItem dense onClick={(event) => { toggleMenuDisplay(event) }}>Login</MenuItem>
                    <MenuItem dense onClick={(event) => { toggleMenuDisplay(event) }}>Profile</MenuItem>
                    <MenuItem dense onClick={(event) => { toggleMenuDisplay(event) }}>Logout</MenuItem>
                </Menu>


            </div>
        </AppBar>
    );
}

export default NavigationBar;