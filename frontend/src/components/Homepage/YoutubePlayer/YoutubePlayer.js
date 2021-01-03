import { useState } from 'react';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

// Child Component
import VideoInformation from './VideoInformation/VideoInformation';

// Axios API Client
import { getVideo } from '../../../api-client';

import './player.css';
// https://www.youtube.com/embed/0_1MyxmGCoY
function YoutubePlayer() {

    const baseURL = 'https://www.youtube.com/embed/'; // URL to embed the youtube video.
    const initialVideo = { // Response Format
        channel: '',
        channelID: '',
        description: '',
        id: '',
        title: ''
    }

    const tagsList = useSelector(state => state.tags);
    const [video, setVideo] = useState(initialVideo);

    const generateVideo = () => {
        // Updates local video state.
        getVideo(tagsList)
            .then(response => {
                setVideo({...response.data.video, id: baseURL.concat(response.data.video.id + '?autoplay=1')}); 
            })
            .catch(err => {
                console.log(JSON.stringify(err));
            });
    }   

    return(
        <Container>
            <iframe 
                id='player'
                title='Youtube Player'
                allowFullScreen
                src={video.id} // autoplay onload
            />

            { video.id !== '' ?  // Displays Information if video is generated
                <VideoInformation video={video} /> 
            : 
                <div className='player-initial'> Press the generate button to play a random video!</div>
            }

            <Button 
                id='video-generate'
                variant='success'
                onClick={() => generateVideo()}
            >
                GENERATE
            </Button>
        </Container>
    );

}

export default YoutubePlayer;