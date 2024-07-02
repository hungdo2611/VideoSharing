
import { Box, Text } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component'
import { useCheckMobileScreen } from '../components/Navbar';
import { useEffect, useState } from 'react';
import { getListVideoAPI } from '../apis/videoAPI';
import { VideoMobileComponent, VideoDestopComponent } from '../components/VideoComponent'

export const getIdVideo = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}
const ListVideo = () => {
    const [videos, setVideos] = useState([]);

    const getListVideo = async () => {
        let req = await getListVideoAPI(1, 20);
        if (req && !req?.err) {
            setVideos(req.data);
        }
    }
    useEffect(() => {
        getListVideo();

    }, []);
    let ismobile = useCheckMobileScreen();


    const renderVideo = (vid) => {
        if (ismobile) {

            return <VideoMobileComponent
                key={vid?._id}
                link={vid?.link}
                title={vid?.title}
                content={vid?.content}
                email={vid?.user_id?.email}
                time={vid?.time} />
        }
        return <VideoDestopComponent
            link={vid?.link}
            key={vid?._id}
            title={vid?.title}
            content={vid?.content}
            email={vid?.user_id?.email}
            time={vid?.time} />


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