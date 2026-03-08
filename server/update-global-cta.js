const strapi = require('@strapi/strapi');
strapi.createStrapi().load().then(async app => {
  const global = await app.db.query('api::global.global').findOne({
    populate: { topNav: { populate: ['cta'] } }
  });
  
  if (global && global.topNav && global.topNav.cta) {
    const ctaId = global.topNav.cta.id;
    console.log("Found CTA ID:", ctaId);
    
    await app.db.query('shared.link').update({
      where: { id: ctaId },
      data: { href: '/membership-application' }
    });
    
    console.log("Done");
  } else {
    console.log("Not found", global);
  }
  process.exit();
}).catch(console.error);
