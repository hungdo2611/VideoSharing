import {
    Box, Button, Input, Text, Textarea
} from "@chakra-ui/react"
import { Navbar } from "../components";
import { getIdVideo } from "./ListVideo";
import { useState } from "react";
import YouTube from "react-youtube";
import useWindowDimensions from "../ultis";
import { ToastContainer, toast } from 'react-toastify';

const ShareVideo = () => {
    const [video, setVideo] = useState('');
    const dimension = useWindowDimensions();
    console.log("dimension", dimension)
    const onPaste = (e) => {
        const url = e.clipboardData.getData('Text');

        const idVideo = getIdVideo(url);
        console.log("url", idVideo)

        if (idVideo) {
            setVideo(idVideo);
        }
    }
    const widthVideo = dimension.width - 50 > 800 ? 800 : dimension.width - 100;
    const opts = {
        height: widthVideo * 9 / 16,
        width: widthVideo,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    const onSharevideo = () => {
        toast("Wow so easy!", { onOpen: () => console.log('hello'), closeOnClick: true });
    }

    return <>
        <Navbar />
        <Box
            display={'flex'}
            alignItems={'center'}
            justifyItems={'center'}
            flexDirection={"column"}
            p={10}>
            <Input onPaste={onPaste} placeholder="Enter url Youtube video" />
            <Textarea my={5} placeholder="Description" />
            <Button isDisabled={!video} onClick={onSharevideo} my={5}>
                Share Video
            </Button>
            {video && <Box
                display={'flex'}
                alignItems={'center'}
                flexDirection={"column"}
                justifyItems={'center'}>
                <YouTube videoId={video} opts={opts} />
                <Text>Preview Video</Text>
            </Box>}

        </Box>
    </>

}
export default ShareVideo;
