const strapi = require('@strapi/strapi');
strapi.createStrapi().load().then(async app => {
  const global = await app.db.query('api::global.global').findOne({
    populate: { topNav: { populate: '*' } }
  });
  
  if (global && global.topNav && global.topNav.cta) {
    const componentId = global.topNav.cta.id;
    console.log("Found CTA:", global.topNav.cta);
    
    // update component
    await app.db.query('shared.link').update({
      where: { id: componentId },
      data: { href: '/membership-application' }
    });
    console.log("Updated!");
  }
  process.exit();
}).catch(console.error);
