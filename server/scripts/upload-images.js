
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

async function uploadImage(filePath, fileName) {
  try {
    const form = new FormData();
    form.append('files', fs.createReadStream(filePath), fileName);

    const response = await axios.post('http://localhost:1337/api/upload', form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    console.log(`Uploaded ${fileName}:`, response.data[0].documentId);
    return response.data[0].id; // or documentId
  } catch (error) {
    console.error(`Error uploading ${fileName}:`, error.response?.data || error.message);
  }
}

async function main() {
  const imgDir = '/Volumes/Amirul/work/github/dds-debhata/img/dds-debhata';
  const imagesToUpload = [
    'picnic-2023.jpeg',
    'ifter-01.jpeg',
    'meeting-01.jpeg'
  ];

  for (const imgName of imagesToUpload) {
    const filePath = path.join(imgDir, imgName);
    if (fs.existsSync(filePath)) {
      await uploadImage(filePath, imgName);
    }
  }
}

main();
