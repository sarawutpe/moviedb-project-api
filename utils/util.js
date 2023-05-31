const fs = require("fs");
const path = require("path");
const { ROOT_PATH } = require("../config");

// Generate random id
const generateRandomId = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
};

const saveUploadedFile = (file) => {
  if (!file) return "";

  const fileExtension = path.extname(file.originalFilename);
  const newFileName = generateRandomId(10) + fileExtension;
  const newFilePath = path.join(ROOT_PATH, "uploads", newFileName);

  return new Promise((resolve, reject) => {
    fs.writeFile(newFilePath, fs.readFileSync(file.filepath), function (err) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(newFileName);
      }
    });
  });
};

const removeFile = (filePath) => {
  if (!filePath) return;

  const newFilePath = path.join(ROOT_PATH, "uploads", filePath);
  return new Promise((resolve, reject) => {
    fs.unlink(newFilePath, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = { generateRandomId, saveUploadedFile, removeFile };
