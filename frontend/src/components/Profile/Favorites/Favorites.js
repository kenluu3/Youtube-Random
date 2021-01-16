import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { deleteFavorite } from '../../../api-client';

import './favorites.css';

function Favorites(props) {

    const [favoritesList,setFavoritesList] = useState(props.favorites); // prop data different if user is logged in & viewing own profile.
    const baseChannel = 'https://youtube.com/channel/';
    const baseYT = 'https://www.youtube.com/watch?v=';

    useEffect(() => { // re-initialize if props change (only changes if a new user is being viewed.)
        setFavoritesList(props.favorites);
    }, [props.favorites]);

    const handleRemove = async (id) => { // removes the item from favorites.
        try {
            let response = await deleteFavorite(id);
            if (response.data.success) { // successful delete.
                setFavoritesList(favoritesList.filter(favorite => favorite.id !== id));
            }
        } catch(err) { // error occurred in removal.
            console.log(err.response.data);
        } 
    }

    const noItems = props.sameUser ? 'You do not have any favorites saved!' : 'This user does not have any favorites.';

    const renderFavorites = favoritesList.map(favorite => {
        return(
            <tr className='favorites-content' key={favorite.id}>
                <td>
                    <a href={baseYT.concat(favorite.id)} className='favorites-link'>
                        {favorite.title}
                    </a>
                </td>
                <td>
                    <a href={baseChannel.concat(favorite.channelID)} className='favorites-link'>
                        {favorite.channel}
                    </a>
                </td>
                { props.sameUser ? // only enable removal if viewing own profile.
                    <td className='text-center'>
                        <button
                            className='favorites-remove-btn'
                            onClick={() => handleRemove(favorite.id)}
                        >
                            X
                        </button>
                    </td>
                :
                    null
                }
            </tr>
        );
    });

    return(
        <Container className='favorites-list-container'>
            { favoritesList.length > 0 ? // only display this if user has favorites.
                <Table bordered size='sm' variant='dark' className='favorites-table'>
                    <thead>
                        <tr className='favorites-header'>
                            <th>Title</th>
                            <th>Channel</th>
                            { props.sameUser ? <th></th> : null }
                        </tr>
                    </thead>
                    <tbody>
                        {renderFavorites }
                    </tbody>
                </Table>
            : 
                <h5 className='text-white text-center'>{noItems}</h5>
            }
        </Container>
    );
}

export default Favorites;