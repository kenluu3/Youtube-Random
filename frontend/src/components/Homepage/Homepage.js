import { Fragment } from 'react';

import YoutubePlayer from './YoutubePlayer/YoutubePlayer';
import TagsList from './TagsList/TagsList';

function Homepage() {
    return(
        <Fragment>
            <YoutubePlayer />
            <TagsList />
        </Fragment>
    )
}

export default Homepage;