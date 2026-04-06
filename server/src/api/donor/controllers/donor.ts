import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::donor.donor', ({ strapi }) => ({
  async find(ctx) {
    // Calling the default core action
    const { data, meta } = await super.find(ctx);
    
    if (!data) return { data, meta };

    const sanitizedData = data.map((item: any) => {
      // Handle both Strapi v4 and v5 data structures
      const attributes = item.attributes || item;
      if (attributes.isAnonymous) {
        if (item.attributes) {
          return {
            ...item,
            attributes: {
              ...attributes,
              name: "একজন শুভানুধ্যায়ী",
              designation: "",
              location: attributes.location || ""
            }
          };
        } else {
          return {
            ...item,
            name: "একজন শুভানুধ্যায়ী",
            designation: "",
            location: item.location || ""
          };
        }
      }
      return item;
    });

    return { data: sanitizedData, meta };
  },

  async findOne(ctx) {
    const response = await super.findOne(ctx);
    if (!response || !response.data) return response;

    const { data } = response;
    const attributes = data.attributes || data;

    if (attributes.isAnonymous) {
      if (data.attributes) {
        return {
          ...response,
          data: {
            ...data,
            attributes: {
              ...attributes,
              name: "একজন শুভানুধ্যায়ী",
              designation: "",
              location: attributes.location || ""
            }
          }
        };
      } else {
        return {
          ...response,
          data: {
            ...data,
            name: "একজন শুভানুধ্যায়ী",
            designation: "",
            location: data.location || ""
          }
        };
      }
    }

    return response;
  }
}));
