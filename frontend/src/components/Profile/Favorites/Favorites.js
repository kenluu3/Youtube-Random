import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { deleteFavorite } from '../../../api-client';

import './favorites.css';

function Favorites(props) {

    const [favoritesList,setFavoritesList] = useState(props.sameUser ? props.favorites.favorites : props.favorites); // prop data different if user is logged in & viewing own profile.


    const handleRemove = async (id) => { // removes the item from favorites.
        console.log(id);
        try {
            let response = await deleteFavorite(props.authuser, id, props.token);
            if (response.data.success) { // successful delete.
                setFavoritesList(favoritesList.filter(favorite => {
                    if (favorite.id !== id) { // removes the video with removed ID.
                        return favorite;
                    }
                }));
                console.log(response.data.message);
            }
        } catch(err) { // error occurred in removal.
            console.log(err.response.data);
        } 
    }

    const renderFavorites = favoritesList.map(favorite => {

        const baseChannel = 'https://youtube.com/channel/';
        const baseYT = 'https://www.youtube.com/watch?v=';

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
                        {renderFavorites}
                    </tbody>
                </Table>
            : props.sameUser ? <h5 className='text-center text-white'>You do not have any favorites saved!</h5> // different message depending on user.
                : <h5 className='text-center text-white'>This user does not have any favorites!</h5>
            }
        </Container>
    );
}

export default Favorites;