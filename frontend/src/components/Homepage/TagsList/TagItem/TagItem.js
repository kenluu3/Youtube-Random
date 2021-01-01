// bootstrap components
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';

import { removeTag } from '../../../../actions/tagsActions';
import { useDispatch } from 'react-redux';
 
// local stylesheet
import './tagitem.css';

function TagItem(props) {

    const dispatch = useDispatch();

    const handleRemoveTag = (id) => {
        dispatch(removeTag(id));
    }

    return(
        <InputGroup className='tag-wrapper'>
            <InputGroup.Text className='tag'>{props.item.tag}</InputGroup.Text>   
            <InputGroup.Append>
                <Button className='tag-remove' variant='danger' onClick={() => handleRemoveTag(props.item.id)}>X</Button>
            </InputGroup.Append>         
        </InputGroup>
    );
}

export default TagItem;