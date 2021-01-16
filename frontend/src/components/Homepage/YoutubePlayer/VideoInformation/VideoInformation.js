import { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { putFavorites } from '../../../../api-client';
import { useSelector } from 'react-redux';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import './videoinfo.css';

function VideoInformation(props) {

    const baseChannelURL = 'https://youtube.com/channel/';
    const auth = useSelector(state => state.auth);
    const [infoIcon, setInfoIcon] = useState('+');
    const history = useHistory();

    const handleSave = async () => { // saves video to DB.
        if (auth.user) {
            try {
                let response = await putFavorites(auth.user, props.video); 
                if (response.data.success) { // saved successfully [Saves only once]
                    console.log(response.data.message); 
                }
            } catch(err) { // failed to save.
                console.log(err.response.data);  
            }
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
