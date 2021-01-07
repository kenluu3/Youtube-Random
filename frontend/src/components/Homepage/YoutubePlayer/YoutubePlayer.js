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
        channel: `San E ft Raina (After School) - A Midsummer Night's Sweetness with lyrics`,
        channelID: 'UCweOkPb1wVVH0Q0Tlj4a5Pw',
        description: `San E ft Raina (After School) - A Midsummer Night's Sweetness
        English + Romanization + Hangul subs
        
        Watch the official music video at http://www.youtube.com/watch?v=nkfMN-...`,
        id: baseURL.concat('14W4wGWSnlY'),
        title: `San E ft Raina (After School) - A Midsummer Night's Sweetness with lyrics`
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
        <Container className='player-container'>
            <iframe 
                id='player'
                title='Youtube Player'
                allowFullScreen
                src={video.id} // autoplay onload
            />

            <Button 
                id='video-generate'
                variant='dark'
                block
                onClick={() => generateVideo()}
            >
                GENERATE
            </Button>

            { video.id !== '' ?  // Displays Information if video is generated
                <VideoInformation video={video} /> 
            : 
                <div className='player-initial'> Press the generate button to play a random video!</div>
            }

        </Container>
    );

}

export default YoutubePlayer;