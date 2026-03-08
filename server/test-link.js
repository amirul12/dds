const fs = require('fs');
const strapi = require('@strapi/strapi');
strapi.createStrapi().load().then(async app => {
  const member = await app.documents('api::member-directory.member-directory').findFirst({filters: {overallSerial: '1'}});
  const file = await app.db.query('plugin::upload.file').findOne({where: {name: 'D 01 01 ABDUL KADER.jpeg'}});
  console.log("Member:", member.documentId, "File:", file.documentId, file.id);
  
  await app.documents('api::member-directory.member-directory').update({
    documentId: member.documentId,
    data: { photo: file.documentId }
  });
  console.log("Updated with documentId");

  const check1 = await app.documents('api::member-directory.member-directory').findOne({documentId: member.documentId, populate: ['photo']});
  console.log("Photo after docId:", check1.photo?.id);
  
  process.exit();
}).catch(console.error);
