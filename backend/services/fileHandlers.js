import s3 from '../config/s3.config';

export const uploadFile = async ({ bucket, file, key, type }) => {
  return await s3.upload({
    Bucket: bucket,
    Body: file,
    Key: key,
    ContentType: type,
  });
};

export const deleteFile = async ({ bucket, key }) => {
  return await s3.deleteObject({
    Bucket: bucket,
    Key: key,
  });
};
