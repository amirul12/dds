const strapi = require('@strapi/strapi');
strapi.createStrapi().load().then(async app => {
  const member = await app.db.query('api::member-directory.member-directory').findOne({
    where: { overallSerial: '1' },
    populate: ['photo']
  });
  console.log("Member from DB:", member);
  process.exit();
}).catch(console.error);
