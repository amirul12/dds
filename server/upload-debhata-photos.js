const fs = require('fs');
const path = require('path');
const strapi = require('@strapi/strapi');

strapi.createStrapi().load().then(async app => {
  const dir = "/Volumes/Amirul/work/github/dds-debhata/server/public/members/Debhata Union photo's_Done";
  const files = fs.readdirSync(dir);
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const file of files) {
    if (file.endsWith('.pdf')) {
      skipCount++;
      continue;
    }
    if (file.startsWith('.')) {
      skipCount++;
      continue;
    }
    
    // Parse name like "D 01 01 ABDUL KADER.jpeg"
    const match = file.match(/^D\s+(\d+)\s+(\d+)\s+(.*?)\.[a-zA-Z0-9]+$/i);
    if (!match) {
      console.log(`Skipping unknown pattern: "${file}"`);
      skipCount++;
      continue;
    }
    
    const overallSerial = parseInt(match[1], 10).toString();
    const thanaSerial = parseInt(match[2], 10).toString();
    
    // Find member
    const members = await app.documents('api::member-directory.member-directory').findMany({
      filters: { overallSerial },
    });
    const member = members[0];
    
    if (!member) {
      console.log(`Member not found for ID: ${overallSerial} - file: ${file}`);
      errorCount++;
      continue;
    }
    
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    let mimeType = 'image/jpeg';
    if (file.toLowerCase().endsWith('.png')) mimeType = 'image/png';
    else if (file.toLowerCase().endsWith('.heic')) mimeType = 'image/heic';
    
    console.log(`Uploading "${file}" for member "${member.name}" (ID: ${overallSerial}) ...`);
    
    try {
      const uploadedFiles = await app.plugin('upload').service('upload').upload({
        data: {},
        files: {
          path: filePath,
          name: file,
          type: mimeType,
          size: stat.size,
        },
      });
      
      const uploadedFile = uploadedFiles[0];
      
      await app.documents('api::member-directory.member-directory').update({
        documentId: member.documentId,
        data: {
          photo: uploadedFile.id
        }
      });
      console.log(`-> Successfully linked photo!`);
      successCount++;
    } catch (err) {
      console.error(`-> Error uploading ${file}:`, err.message || err);
      errorCount++;
    }
  }
  
  console.log(`\nFinished: ${successCount} successfully uploaded, ${errorCount} errors, ${skipCount} skipped.`);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
