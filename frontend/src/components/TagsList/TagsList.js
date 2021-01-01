import { useState, React } from 'react';

// bootstrap components
import Container from 'react-bootstrap/Container';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

// component in tagslist
import TagItem from '../TagItem/TagItem';

// actions
import { addTag, clearTags } from '../../actions/tagsActions';
import { useSelector, useDispatch } from 'react-redux';

// local stylesheet
import './tags.css';

// Next Steps:  think about implementing so that i do not have to re-render the entire parent component tree and only the child

function TagsList() {

    // retrieve the tags stored in application state.
    const tags = useSelector(state => state.tags);  // this forces re-render if theres a new result.

    // local state for inputbox for tags
    const [inputTag, setTag] = useState('');
    const [tagId, setTagId] = useState(tags.length); 

    const dispatch = useDispatch();

    // Renders the individual tag items.
    const renderTagItems = tags.map(tag => {
        return <TagItem key={tag.id} item={tag} />
    })

    // Functions for handling user interaction
    const handleTagInput = (e) => {
        setTag(e.target.value);
    }
    
    const handleTagEnter = (e) => { 
        if (e.which === 13) { // enter (13)
            handleAdd();
        }
    }

    const handleAdd = () => { // clears & increments for id.
        if (inputTag.trim() !== '') {
            dispatch(addTag({id: tagId, tag: inputTag}));
            setTagId(tagId + 1); 
            setTag('');
        }
    }

    const handleClear = () => { // only clearable if tags list exists.
        if (tags !== undefined && tags.length !== 0) {
            dispatch(clearTags())
        }
    } 

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

                <FormControl 
                    className='form-input tags-input' 
                    onChange={handleTagInput} 
                    onKeyDown={handleTagEnter} 
                    value={inputTag} 
                    autoComplete='off'
                />
  
                <InputGroup.Append>
                    <Button className='tags-btn' onClick={() => handleAdd()}>ADD</Button>
                    <Button className='tags-btn' variant='danger' onClick={() => handleClear()}>CLEAR</Button>
                </InputGroup.Append>
            
            </InputGroup>
                            
            <div className='tags-list'>
                {renderTagItems}
            </div>

        </Container>
    );
}


export default TagsList;