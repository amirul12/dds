import { Core } from '@strapi/strapi';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    try {
      console.log("Bootstrap: Running Comprehensive Population Script...");
      await require('../scripts/populate-landing-page.js')({ strapi });
      console.log("Bootstrap: Population Complete.");
    } catch (error) {
      console.error("Bootstrap Error:", error);
    }
  },
};
