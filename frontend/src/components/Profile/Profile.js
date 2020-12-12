import { Component, Fragment } from 'react';

// Bootstrap
import Container from 'react-bootstrap/Container'

class Profile extends Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {
        return(
            <Fragment>

                <Container style={{color: "white", fontSize: "2em"}}>
                    PROFILE PAGE
                </Container>

            </Fragment>
        );
    }

}


export default Profile;