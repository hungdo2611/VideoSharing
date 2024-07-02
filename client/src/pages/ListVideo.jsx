
import { Box } from '@chakra-ui/react';
import YouTube from 'react-youtube';

const YoutubeEmbed = ({ embedId }) => (
    <div className="video-responsive">
        <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${embedId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);
const ListVideo = () => {
    const list_video = ['https://www.youtube.com/watch?v=vIaH35-MLsk&list=RD6EEW-9NDM5k&index=11', 'https://www.youtube.com/watch?v=vIaH35-MLsk&list=RD6EEW-9NDM5k&index=11', 'https://www.youtube.com/watch?v=vIaH35-MLsk&list=RD6EEW-9NDM5k&index=11']
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    const getIdVideo = (url) => {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }
    const onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
    return <Box flex={1}>
        {list_video.map(item =>
            <YouTube videoId={getIdVideo(item)} opts={opts} onReady={onReady} />
        )}
    </Box>
}
export default ListVideo;