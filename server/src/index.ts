import { Core } from '@strapi/strapi';
import path from 'path';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    try {
      console.log("Bootstrap: Running Comprehensive Population Script...");
      const scriptPath = path.join(process.cwd(), 'scripts', 'populate-landing-page.js');
      await require(scriptPath)({ strapi });
      console.log("Bootstrap: Population Complete.");
    } catch (error) {
      console.error("Bootstrap Error:", error);
    }

    try {
      console.log("Bootstrap: Importing Committee Members...");
      const committeeImportPath = path.join(process.cwd(), 'scripts', 'import-committees.js');
      await require(committeeImportPath)({ strapi });
      console.log("Bootstrap: Committee Import Complete.");
    } catch (error) {
      console.error("Bootstrap Committee Import Error:", error);
    }
  },
};
