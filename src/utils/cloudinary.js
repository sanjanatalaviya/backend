const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "du5s2eegk",
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadeFile = async (localPath, folderName) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(localPath, {
            folder: folderName
        }).catch((error) => { console.log(error) });
        return uploadResult;

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    uploadeFile
}