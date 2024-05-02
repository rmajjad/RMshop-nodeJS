import 'dotenv/config'

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'delgi26yg',
    api_key: '333189753277433',
    api_secret: 'CLaNRL-ylh4SraDllGqnSaQ8NBw'
});

export default cloudinary;

