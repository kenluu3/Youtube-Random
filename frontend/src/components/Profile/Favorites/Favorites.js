import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

import './favorites.css';

function Favorites(props) {

    console.log(JSON.stringify(props));

    // just for testing
    const favoritesList = [
        {
            videoID: 'O59Dk8tjDKY',
            videoTitle: `1OoOo(오넷) - fuxxin' love`,
            channel: 'danielions music',
            channelID: 'UCoFvMg1ju9LUohIAA_0QuPw'
        },
        {
            videoID: 'JSLjC9Waq-M',
            videoTitle: `Dept - Moonlight (feat. Sonny zero, OoOo)`,
            channel: 'danielions music',
            channelID: 'UCoFvMg1ju9LUohIAA_0QuPw'
        }
    ];

    const handleRemove = async () => {
        console.log('Remove favorite item!');
    }

    const renderFavorites = favoritesList.map(favorite => {

        const baseChannel = 'https://youtube.com/channel/';
        const baseYT = 'https://www.youtube.com/watch?v=';

        return(
            <tr className='favorites-content' key={favorite.videoID}>
                <td>
                    <a href={baseYT.concat(favorite.videoID)} className='favorites-link'>
                        {favorite.videoTitle}
                    </a>
                </td>
                <td>
                    <a href={baseChannel.concat(favorite.channelID)} className='favorites-link'>
                        {favorite.channel}
                    </a>
                </td>
                <td className='text-center'>
                    <button
                        className='favorites-remove-btn'
                        onClick={() => handleRemove()}
                    >
                        X
                    </button>
                </td>
            </tr>
        );
    });

    return(
        <Container className='favorites-list-container'>
            <Table bordered size='sm' variant='dark' className='favorites-table'>
                <thead>
                    <tr className='favorites-header'>
                        <th>Title</th>
                        <th>Channel</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {renderFavorites}
                </tbody>
            </Table>
        </Container>
    );
}

export default Favorites;