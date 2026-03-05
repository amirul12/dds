import { Core } from '@strapi/strapi';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    // Content update logic moved to separate script or performed via bootstrap once.
    // Logic removed to prevent accidental overwrites on every restart.
  },
};
