import s3 from '../config/s3.config';

export const uploadFile = async ({ bucket, file, key, mimetype, fileSize }) => {
  return await s3.upload({
    Bucket: bucket,
    Body: file,
    Key: key,
    ContentType: mimetype,
    ContentLength: fileSize,
  });
};

export const deleteFile = async ({ bucket, key }) => {
  return await s3.deleteObject({
    Bucket: bucket,
    Key: key,
  });
};
