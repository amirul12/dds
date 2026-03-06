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

    /*
    try {
      console.log("Bootstrap: Importing Members from PDF Data...");
      const importScriptPath = path.join(process.cwd(), 'scripts', 'import-members.js');
      await require(importScriptPath)({ strapi });
      console.log("Bootstrap: Member Import Complete.");
    } catch (error) {
      console.error("Bootstrap Member Import Error:", error);
    }
    */
  },
};
