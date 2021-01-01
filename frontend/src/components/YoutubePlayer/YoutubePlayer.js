import { useState } from 'react';
import { useSelector } from 'react-redux';

// bootstrap components 
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import './youtubeplayer.css';

import { getVideo } from '../../api-client';

function YoutubePlayer() {

    const initialState = {
        channel: '',
        channelID: '',
        description: '',
        id: '',
        title: ''
    }

    const tags = useSelector(state => state.tags);
    const [video, setVideo] = useState(initialState);

    const generateVideo = async (tags) => {
    const baseURL = 'https://www.youtube.com/embed/'
        try {
            let response = await getVideo(tags);
            const video = {...response.data.video, id: baseURL.concat(response.data.video.id + '?autoplay=1')}
            setVideo(video);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Container>
            <iframe 
                id='player'
                title='Youtube Player'
                allowFullScreen
                allow='autoplay'
                sandbox='allow-scripts allow-same-origin'
                src={video.id}
            />

            <div className='video-info-container'>
                <header className='video-title'>TITLE PLACEMENT</header>    
            
                <article>
                    <header className='video-channel-container'>
                        <span className='video-channel'>CHANNEL</span>
                        <Button className='video-save'>Save</Button>
                    </header>

                    <p className='video-description'>
                        Description;Description;Description;Description;Description;
                        Description;Description;Description;Description;Description;
                        Description;Description;Description;Description;Description;
                    </p>
                </article>
            </div>   

            <Button id='video-generate' variant='success' onClick={() => generateVideo(tags)}>GENERATE</Button>

        </Container>
    )
}

            

export default YoutubePlayer;