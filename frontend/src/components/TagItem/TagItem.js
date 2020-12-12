// bootstrap components
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';

// local stylesheet
import './tagitem.css';

function TagItem() {

    return(
        <InputGroup className='tag-wrapper'>
            <InputGroup.Text className='tag'>TAGN</InputGroup.Text>   
            <InputGroup.Append>
                <Button className='tag-remove'>X</Button>
            </InputGroup.Append>         
        </InputGroup>
    );
}


export default TagItem;