import { Component } from 'react';

// bootstrap components 
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import './youtubeplayer.css';

class YoutubePlayer extends Component {

    saveVideo() {
        console.log("VIDEO SAVED :)");
    }

    // src={'https://www.youtube.com/embed/4NFrA8PqBA8?autoplay=1'}
    render() { 
        return(
            <Container>
                <iframe 
                    id='player'
                    title='Youtube Player'
                    allowFullScreen
                    allow='autoplay'
                    sandbox='allow-scripts allow-same-origin'
                >
                </iframe>

                <div className='video-info-container'>
                    <header className='video-title'>TITLE PLACEMENT</header>    
                    <article>
                        <header className='video-channel-container'>
                            <span className='video-channel'>CHANNEL</span>
                            <Button className='video-save' onClick={this.saveVideo}>Save</Button>
                        </header>

                        <p className='video-description'>
                            Description;Description;Description;Description;Description;
                            Description;Description;Description;Description;Description;
                            Description;Description;Description;Description;Description;
                        </p>

                    </article>
                </div>   

            </Container>
        );
    }

}


export default YoutubePlayer;