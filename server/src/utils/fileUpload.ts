import util from 'util';
import fs from 'fs';
import path from 'path';
import { errorMsg, errorStatusCode } from '../bases/errorTypes';
import ErrorHandler from '../controller/error.controller';

const multer = require('multer');

const dirPath = path.resolve(__dirname, '../../uploads/images');
const extName: string[] = ['jpg', 'jpeg', 'png'];
const storage = multer.diskStorage({
  destination(req: any, file: any, cb: any) {
    cb(null, dirPath);
  },
  filename(req: any, file: any, cb: any) {
    const extType = file.mimetype.split('/')[1];
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extType}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

export function checkFileExtName(req: any, file: any, cb: any) {
  const extType = file.mimetype.split('/')[1];
  if (extName.indexOf(extType) > 0) {
    return cb(null, true);
  }
  cb(null, false);
  return cb(new ErrorHandler(errorStatusCode.BadRequest, errorMsg.FileExtNameFailed));
}

export const upload = multer({
  storage,
  fileFilter: checkFileExtName,
});

export const deleteFile = (dirpath: string) => new Promise<void>((resolve, reject) => {
  const absPath = path.resolve(__dirname, '../../uploads/images', dirpath);
  fs.unlink(absPath, (err) => {
    if (err) {
      reject();
    }
    resolve();
  });
});
