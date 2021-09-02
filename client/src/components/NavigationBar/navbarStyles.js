import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    navbar: {
        backgroundColor: '#1434A4',
        borderBottom: '1px solid grey',
        padding: '0',
        display: 'flex',
        flexDirection: 'row'
    },
    header: {
        width: '15%',
        height: '15%',
        fontSize: '1.3rem',
        padding: '1.2rem',
        marginLeft: '1%'
    },
    icons: {
        fontSize: '130%'
    },
    button: {
        padding: '1.2rem'
    },
    buttonContainer: {
        height: '15%',
        width: '10%',
        marginLeft: 'auto'
    }

});

export default useStyles;