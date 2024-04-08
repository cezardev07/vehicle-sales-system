import multer from "multer";
import path from "path";
import fs from "fs"

const storage = multer.diskStorage({
  destination: function(req, avatar, cb) {
    if(!fs.existsSync(path.join(process.cwd(),"src",'uploads'))){
      fs.mkdirSync(path.join(process.cwd(),"src",'uploads'))
    }
    cb(null, path.join(process.cwd(),"src",'uploads'));
  },
  filename: function(req, avatar, cb) {
    cb(null, Date.now() + '&' + avatar.originalname);
  }
});

export const upload = multer({ storage: storage });