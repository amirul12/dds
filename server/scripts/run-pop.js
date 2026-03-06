
const strapi = require('@strapi/strapi');

async function run() {
  const app = await strapi().load();
  await require('./populate-landing-page.js')({ strapi: app });
  process.exit(0);
}

run();
