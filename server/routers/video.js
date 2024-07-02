const express = require('express')
const VideoShare = require('../models/videoshare')
const { auth, authWithoutData } = require('../middleware/auth')
const mongoose = require('mongoose')

const video_router = express.Router()


video_router.post('/sharevideo', auth, async (req, res) => {
    //Login a registered user
    try {
        const { link, content, title } = req.body;
        const bodyrequest = {
            "_id": new mongoose.Types.ObjectId(),
            time: (Date.now() / 1000) >> 0,
            title,
            link,
            content,
            user_id: req.user._id

        }
        const video = new VideoShare(bodyrequest);
        await video.save();
        console.log("video", video);

        res.status(200).send({ data: video, err: false })
    } catch (error) {
        res.status(400).send({ err: true, error })
            ;
        console.log('err share', error)
    }
})

video_router.get('/video', async (req, res) => {
    //Login a registered user
    try {
        const { page_number, page_size } = req.query;
        const video = await VideoShare.paginate({}, {
            populate: { path: 'user_id', select: "email" },
            page: page_number, limit: page_size, sort: { $natural: -1 }
        });
        console.log("video",video)

        res.status(200).send({ data: video.docs, err: false })
    } catch (error) {
        res.status(400).send({ err: true, error })
            ;
        console.log('err share', error)
    }
})



module.exports = video_router;