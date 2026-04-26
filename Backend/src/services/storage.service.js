const { ImageKit } = require("@imagekit/nodejs");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadImage(buffer) {
  const result = await imageKit.files.upload({
    file: buffer.toString("base64"),
    fileName: "image.jpg",
    folder: "My-insta-miniClone",
  });

  return result;
}

module.exports = uploadImage;
