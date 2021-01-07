import YoutubePlayer from './YoutubePlayer/YoutubePlayer';
import TagsList from './TagsList/TagsList';

import './homepage.css';

function Homepage() {
    return(
        <div id='homepage'>
            <YoutubePlayer />
            <TagsList />
        </div>
    )
}

export default Homepage;