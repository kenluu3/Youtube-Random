import { Component } from 'react';

// bootstrap component
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

// component in tagslist
import TagItem from '../TagItem/TagItem';

// local stylesheet
import './tags.css';

class TagsList extends Component {

    constructor() {
        super();

        this.state = {};
    }

    addTag() {
        console.log('Tag is added :D');
    }

    render() {
        return(
            <Container className='tags-container'>

                <InputGroup className='tags-save-form'>

                    <InputGroup.Prepend>
                        <OverlayTrigger
                            placement='bottom'
                            overlay={
                                <Tooltip>
                                    Add tags to narrow down the generator's results!
                                </Tooltip>
                            }
                        >    
                            <InputGroup.Text className='tags-header'>TAG</InputGroup.Text>
                        </OverlayTrigger>
                    </InputGroup.Prepend>

                    <FormControl className='form-input tags-input'></FormControl>

                    <InputGroup.Append>
                        <Button className='tags-add' onClick={this.addTag}>ADD</Button>
                    </InputGroup.Append>
                    
                </InputGroup>

                <div>
                    <TagItem />
                    <TagItem />
                    <TagItem />
                    <TagItem />
                    <TagItem />
                </div>

            </Container>
        );
    }
}

export default TagsList;