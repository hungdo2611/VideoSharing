
import { Box, Text } from '@chakra-ui/react';
import moment from 'moment'
import useWindowDimensions from "../ultis";
import YouTube from 'react-youtube';

export const getIdVideo = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

export const VideoDestopComponent = ({ _id, title, content, email, time, link }) => {
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
    return <Box key={_id} gap={10} mx={100} my={10} display={"flex"} flexDirection={"row"} alignItems={"center"}>
        <YouTube videoId={getIdVideo(link)} opts={opts} onReady={onReady} />
        <Box>
            <Text><span style={{ fontWeight: "bold" }}>Title: </span>{title}</Text>
            <Text><span style={{ fontWeight: "bold" }}>Description:</span> {content}</Text>
            <Text><span style={{ fontWeight: "bold" }}>Author: </span> {email}</Text>
            <Text as={"b"}>{moment(time * 1000).format('MMM DD, YYYY')}</Text>
        </Box>
    </Box>
}

export const VideoMobileComponent = ({ _id, title, content, email, time, link }) => {

    const dimension = useWindowDimensions();
    const widthVideo = dimension.width - 50;
    const opt = {
        height: widthVideo * 9 / 16,
        width: widthVideo,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    }


    const onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };
    return <Box key={_id}>
        <Box
            my={10}
            display={'flex'}
            alignItems={'center'}
            flexDirection={"column"}
            key={_id} >
            <YouTube videoId={getIdVideo(link)} opts={opt} onReady={onReady} />

        </Box>
        <Box px={3}>
            <Text><span style={{ fontWeight: "bold" }}>Title: </span>{title}</Text>
            <Text><span style={{ fontWeight: "bold" }}>Description:</span> {content}</Text>
            <Text><span style={{ fontWeight: "bold" }}>Author: </span> {email}</Text>
            <Text as={"b"}>{moment(time * 1000).format('MMM DD, YYYY')}</Text>
        </Box>
    </Box>
}