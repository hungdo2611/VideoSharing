import {
    Box, Button, Input, Text, Textarea
} from "@chakra-ui/react"
import { Navbar } from "../components";
import { getIdVideo } from "./ListVideo";
import { useState } from "react";
import YouTube from "react-youtube";
import useWindowDimensions from "../ultis";
import { ToastContainer, toast } from 'react-toastify';
import { ShareVideoAPI } from "../apis/videoAPI";
import { useNavigate } from "react-router-dom";

const ShareVideo = () => {
    const navigate = useNavigate();

    const [video, setVideo] = useState('');
    const [content, setContent] = useState('');
    const [url, setURL] = useState('');
    const dimension = useWindowDimensions();
    const onPaste = (e) => {
        const url = e.clipboardData.getData('Text');
        setURL(url);
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
    const onSharevideo = async () => {
        let title = await getVideoTitle(url);
        let body = {
            title: title.title,
            content,
            link: url
        }
        let request = await ShareVideoAPI(body);
        if (request && !request.err) {
            toast("Share success", { onOpen: () => navigate('/'), closeOnClick: true });
        } else {
            toast.error("Somethings wrong pls try again")
        }
    }
    const getVideoTitle = async (url) => {
        let req = await fetch(`https://noembed.com/embed?dataType=json&url=${url}`);
        return req.json();
    }
    const handleChange = (event) => {
        setContent(event.target.value);
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
            <Textarea onChange={handleChange} my={5} placeholder="Description" />
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
