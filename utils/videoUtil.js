const { google } = require('googleapis');

const youtube = google.youtube({
    version:'v3',
    auth: process.env.GKEY
})

async function getVideo(query) {
    // randomizer for pagination purposes.
    let repeat = Math.floor(Math.random() * 3) + 1;
    let token = '';
    let data = {};

    // loops "repeat" number of times to better randomize results.
    do {
        try {
            // query
            const params = {
                part: 'snippet',
                maxResults: 50,
                q: query,
                pageToken: token,
                type: 'video'
            }

            const response = await youtube.search.list(params);
            const content = response.data;

            // more results exists.
            if (content.nextPageToken && repeat > 1) {
                token = content.nextPageToken;
            } else {
                // determines the video to return.
                const randomizer = Math.floor(Math.random() * content.pageInfo.resultsPerPage) + 1;
                const extract = content.items[randomizer];

                data = {
                    videoId: extract.id.videoId,
                    title: extract.snippet.title,
                    description: extract.snippet.description,
                    channelId: extract.snippet.channelId,
                    channelTitle: extract.snippet.channelTitle,
                    publishedAt: extract.snippet.publishedAt
                }
            }
        // error occurred from API.
        } catch(err) {
            data = `An error has occurred: ${err}`; 
            return data;
        }

    } while ((repeat-- > 1) && token);

    return data;
};

module.exports = {
    getVideo
};