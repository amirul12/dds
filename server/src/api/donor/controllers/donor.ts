import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::donor.donor', ({ strapi }) => ({
  async find(ctx) {
    // Calling the default core action
    const { data, meta } = await super.find(ctx);

    if (!data) return { data, meta };

    const sanitizedData = data.map((item: any) => {
      // Handle both Strapi v4 and v5 data structures
      const attributes = item.attributes || item;

      // Remove amount field from public API response
      const { amount, ...restAttributes } = attributes;

      if (attributes.isAnonymous) {
        if (item.attributes) {
          return {
            ...item,
            attributes: {
              ...restAttributes,
              name: "একজন শুভানুধ্যায়ী",
              designation: "",
              location: attributes.location || ""
            }
          };
        } else {
          return {
            ...item,
            ...restAttributes,
            name: "একজন শুভানুধ্যায়ী",
            designation: "",
            location: item.location || ""
          };
        }
      }

      // Return item without amount field
      if (item.attributes) {
        return {
          ...item,
          attributes: restAttributes
        };
      } else {
        return {
          ...item,
          ...restAttributes
        };
      }
    });

    return { data: sanitizedData, meta };
  },

  async findOne(ctx) {
    const response = await super.findOne(ctx);
    if (!response || !response.data) return response;

    const { data } = response;
    const attributes = data.attributes || data;

    // Remove amount field from public API response
    const { amount, ...restAttributes } = attributes;

    if (attributes.isAnonymous) {
      if (data.attributes) {
        return {
          ...response,
          data: {
            ...data,
            attributes: {
              ...restAttributes,
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
            ...restAttributes,
            name: "একজন শুভানুধ্যায়ী",
            designation: "",
            location: data.location || ""
          }
        };
      }
    }

    // Return response without amount field
    if (data.attributes) {
      return {
        ...response,
        data: {
          ...data,
          attributes: restAttributes
        }
      };
    } else {
      return {
        ...response,
        data: {
          ...data,
          ...restAttributes
        }
      };
    }
  }
}));
