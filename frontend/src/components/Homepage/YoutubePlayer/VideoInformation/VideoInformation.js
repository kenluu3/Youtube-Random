import { useState } from 'react';

import { useHistory } from 'react-router-dom';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import './videoinfo.css';

function VideoInformation(props) {

    const baseChannelURL = 'https://youtube.com/channel/';
    const [infoIcon, setInfoIcon] = useState('+');
    const history = useHistory();

    const handleSave = () => {
        if (localStorage.getItem('token')) {
            console.log('Saved Video to Favorites!');
        } else {
            history.push('/login'); // cannot save without logging in.
        }
    }

    const handleToggle = () => {
        if (infoIcon === '+') {
            setInfoIcon('-')
        } else {
            setInfoIcon('+')
        }
    }

    return(
        <Accordion>
            <Card>
                <Accordion.Toggle 
                    as={Card.Header} 
                    eventKey='0' 
                    onClick={() => handleToggle()}
                >
                    <header className='video-title'>{props.video.title}</header>
                    <span className='video-more-info'>{infoIcon}</span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                    <Card.Body>
                        <a 
                            className='video-channel'
                            href={baseChannelURL.concat(props.video.channelID)}
                        >
                            {props.video.channel}
                        </a>
                        <Card.Text>{props.video.description}</Card.Text>
                        <button
                            className='video-save'
                            onClick={() => handleSave()}
                        >
                            Save Video
                        </button>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default VideoInformation;
