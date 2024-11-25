// middleware/multer.js
import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Cpnfigure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products', // Folder in cloudinary to store images
    allowed_formats:['jpeg', 'jpg', 'png', 'gif'], // Allowed file types
  },
});

const upload = multer({storage});

export default upload;