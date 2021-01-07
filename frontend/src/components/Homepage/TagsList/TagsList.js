import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

// child component
import TagItem from './TagItem/TagItem';

import { addTag, clearTags } from '../../../redux/actions/tagsActions';
import { useSelector, useDispatch } from 'react-redux';

import './tags.css';

// Next Steps: Implement solution to only re-render child elements when added.

function TagsList() {

    const tagsList = useSelector(state => state.tags); // Forces re-render when tags are added.

    const [inputTag, setTag] = useState(''); // Local state for Tags
    const [tagID, setTagID] = useState(tagsList.length); // Ensuring ID always increments up.
    const dispatch = useDispatch();

    const renderTagItems = tagsList.map(tag => <TagItem key={tag.id} item={tag} />);

    const handleTagInput = (event) => { 
        setTag(event.target.value);
    }

    const handleTagSubmit = (event) => {
        if (event.which === 13) { // Enter key
            handleAdd()
        }
    }

    const handleAdd = () => { // Saves Tag to App state.
        if (inputTag.trim() !== '') {
            dispatch(addTag({id: tagID, tag: inputTag}));
            setTagID(tagID + 1); 
            setTag('');
        }
    }

    const handleClear = () => {
        if (tagsList.length > 0) {
            dispatch(clearTags());
        }
    }

    return(
        <Container className='tags-container'>
            <header className='tags-header'>TAGS</header>
                <FormControl
                    className='form-input-field tags-input'
                    value={inputTag}
                    placeholder='Add tags to narrow results!'
                    onChange={(event) => handleTagInput(event)}
                    onKeyDown={(event) => handleTagSubmit(event)}
                    autoComplete='off'
                />    
                    

            <div className='tags-action-wrapper'>
                <button 
                    className='tags-clear'
                    onClick={() => handleClear()}
                >
                    Clear Tags
                </button>
                
                <Button
                    onClick={() => handleAdd()}
                    className='tags-add'
                    variant='dark'
                >
                    ADD
                </Button>
            </div>

            <div className='tags-list'>
                {renderTagItems}
            </div>
        </Container>
    );  
}

export default TagsList;