const strapi = require('@strapi/strapi');
strapi.createStrapi().load().then(async app => {
  const file = await app.db.query('plugin::upload.file').findOne({where:{}});
  const member = await app.db.query('api::member-directory.member-directory').findOne({where:{}});
  
  if (!file || !member) return console.log("Missing data");
  
  console.log("File:", file.id, file.documentId);
  console.log("Member:", member.documentId);
  
  await app.documents('api::member-directory.member-directory').update({
    documentId: member.documentId,
    data: { photo: file.documentId }
  });
  
  const m2 = await app.documents('api::member-directory.member-directory').findOne({documentId: member.documentId, populate: ['photo']});
  console.log("After update:", m2.photo);
  
  process.exit(0);
});
