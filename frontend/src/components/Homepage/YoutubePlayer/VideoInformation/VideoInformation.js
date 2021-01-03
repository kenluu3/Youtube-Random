import { useState } from 'react';

import Accordian from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import './videoinfo.css';
import Accordion from 'react-bootstrap/Accordion';

function VideoInformation(props) {

    const baseChannelURL = 'https://youtube.com/channel/';
    const [infoIcon, setInfoIcon] = useState('+');

    const handleSave = () => {
        console.log('Saved Video to Favorites!');
    }

    const handleToggle = () => {
        if (infoIcon === '+') {
            setInfoIcon('-')
        } else {
            setInfoIcon('+')
        }
    }

    return(
        <Accordian>
            <Card>
                <Accordian.Toggle 
                    as={Card.Header} 
                    eventKey='0' 
                    onClick={() => handleToggle()}
                >
                    <header className='video-title'>{props.video.title}</header>
                    <span className='video-more-info'>{infoIcon}</span>
                </Accordian.Toggle>
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
        </Accordian>
    )
}

export default VideoInformation;
