import Button from 'react-bootstrap/Button';

import { removeTag } from '../../../../redux/actions/tagsActions';
import { useDispatch } from 'react-redux';
 
import './tagitem.css';

function TagItem(props) {
    const dispatch = useDispatch();

    const handleRemoveTag = () => {
        dispatch(removeTag(props.item.id));
    }

    return(
        <div className='tag-wrapper'>
            <header className='tag'>{props.item.tag}</header>
            <Button
                className='tag-remove'
                variant='danger'
                onClick={() => handleRemoveTag()}
            >
                X
            </Button>
        </div>
    );
}

export default TagItem;