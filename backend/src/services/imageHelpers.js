const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const renameImageAndSendFilename = (req, res) => {
  const { originalname } = req.file;

  const { filename } = req.file;

  const newFilename = `${uuidv4()}-${originalname}`;

  fs.rename(
    `../public/uploads/${filename}`,
    `public/uploads/${newFilename}`,
    (err) => {
      if (err) throw err;
      res.status(200).send({ message: "File Uploaded", filename: newFilename });
    }
  );
};

module.exports = { renameImageAndSendFilename };
