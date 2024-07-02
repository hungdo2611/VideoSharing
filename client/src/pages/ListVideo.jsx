
import { Box, Text } from '@chakra-ui/react';
import YouTube from 'react-youtube';
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCheckMobileScreen } from '../components/Navbar';
import { useEffect, useState } from 'react';
import { getListVideoAPI } from '../apis/videoAPI';
import ytdl from 'ytdl-core'
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
export const getIdVideo = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}
const ListVideo = () => {
    const [videos, setVideos] = useState([]);
    const opts = {

        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    const onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };
    const getListVideo = async () => {
        let req = await getListVideoAPI(1, 20);
        if (req && !req?.err) {
            setVideos(req.data);
        }
    }
    useEffect(() => {
        getListVideo();
        ytdl.getInfo('https://www.youtube.com/watch?v=YQHsXMglC9A').then(info => {
            console.log(info.videoDetails.title);
        })
    }, []);
    let ismobile = useCheckMobileScreen();


    const renderVideo = (vid) => {
        if (ismobile) {
            return
        }
        return <Box p={10} display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <YouTube videoId={getIdVideo(vid?.link)} opts={opts} onReady={onReady} />
            <Box>
                <Text>Description: {vid?.content}</Text>
                <Text>Author: {vid?.user_id.email}</Text>
            </Box>


        </Box>
    }

    return <Box flex={1}>

        <InfiniteScroll
            style={{ overflowY: 'hidden' }}
            dataLength={videos.length}
            hasMore={true} next={() => { }}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }>
            {videos.map(vid => renderVideo(vid))}
        </InfiniteScroll>
    </Box>
}
export default ListVideo;