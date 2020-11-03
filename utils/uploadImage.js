const AWS = require("aws-sdk");

const S3 = new AWS.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
//   endpoint: process.env.S3_ENDPOINT,
  s3ForcePathStyle: true,
  region: process.env.S3_REGION,
  signatureVersion: "v4",
});

module.exports = async (name, data) => {
  const mime = data.substring(data.lastIndexOf(":") + 1, data.lastIndexOf(";"));
  const buffer = Buffer.from(
    data.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const s3Params = {
    Key: name,
    Bucket: process.env.S3_BUCKET,
    Body: buffer,
    ContentEncoding: "base64",
    ContentType: mime,
  };

  return await S3.putObject(s3Params).promise();
};