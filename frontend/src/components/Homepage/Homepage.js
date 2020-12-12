import { Fragment, Component } from 'react';

// Components in Homepage
import YoutubePlayer from '../YoutubePlayer/YoutubePlayer';
import TagsList from '../TagsList/TagsList';

// bootstrap components

class Homepage extends Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        return(
            <Fragment>
                <YoutubePlayer />
                <TagsList />
            </Fragment>
        )

    }

}


export default Homepage;