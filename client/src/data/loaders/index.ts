import sdk from "@/lib/sdk";
const PAGE_SIZE = 3;

export async function getGlobalPageData() {
  const landingPage = await sdk.single("global").find({
    populate: {
      topNav: {
        populate: "*",
      },
      footer: {
        populate: "*",
      },
    },
  });
  return landingPage;
}

export async function getAboutPageData() {
  const page = await sdk.single("about-page").find({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
      seo: {
        populate: "*",
      },
    },
  });
  return page;
}

export async function getLandingPage() {
  const landingPage = await sdk.single("landing-page").find({
    populate: {
      blocks: {
        on: {
          "layout.hero": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
              buttonLink: {
                populate: "*",
              },
              topLink: {
                populate: "*",
              },
            },
          },
          "layout.card-grid": {
            populate: "*",
          },
          "layout.section-heading": {
            populate: "*",
          },
          "layout.content-with-image": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
            },
          },
          "layout.hero-slider": {
            populate: {
              slides: {
                populate: {
                  image: {
                    fields: ["url", "alternativeText", "name"],
                  },
                },
              },
            },
          },
          "layout.quick-actions": {
            populate: {
              actions: {
                populate: "*",
              },
            },
          },
          "layout.stats": {
            populate: {
              stats: {
                populate: "*",
              },
            },
          },
          "layout.spotlight": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
            },
          },
          "layout.objectives": {
            populate: "*",
          },
          "blocks.text": {
            populate: "*",
          },
          "blocks.video": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
            },
          },
        },
      },
    },
  });
  return landingPage;
}

export async function getAllPagesSlugs() {
  const pages = await sdk.collection("pages").find({
    fields: ["slug"],
  });
  return pages;
}

export async function getPageBySlug(slug: string, status: string) {
  const page = await sdk.collection("pages").find({
    populate: {
      blocks: {
        on: {
          "layout.hero": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
              buttonLink: {
                populate: "*",
              },
              topLink: {
                populate: "*",
              },
            },
          },
          "layout.card-grid": {
            populate: "*",
          },
          "layout.section-heading": {
            populate: "*",
          },
          "layout.content-with-image": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
            },
          },
        },
      },
    },
    filters: {
      slug: slug,
    },
    status: status as "draft" | "published" | undefined,
  });
  return page;
}

export async function getCategories() {
  const categories = await sdk.collection("categories").find({
    fields: ["text", "description"],
  });
  return categories;
}

export async function getBlogPostBySlug(slug: string, status: string) {
  const post = await sdk.collection("posts").find({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
      category: {
        fields: ["text"],
      },
      blocks: {
        on: {
          "blocks.video": {
            populate: {
              image: {
                fields: ["url", "alternativeText", "name"],
              },
            },
          },
          "blocks.text": {
            populate: "*",
          },
        },
      },
    },
    filters: {
      slug: { $eq: slug },
    },
    status: status as "draft" | "published" | undefined,
  });
  return post;
}

export async function getBlogPosts(
  page: number,
  queryString: string,
  category: string
) {
  const posts = await sdk.collection("posts").find({
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
      category: {
        fields: ["text"],
      },
    },

    filters: {
      $or: [
        { title: { $containsi: queryString } },
        { description: { $containsi: queryString } },
        { category: { text: { $containsi: queryString || category } } },
      ],
    },

    pagination: {
      pageSize: PAGE_SIZE,
      page: page,
    },
  });
  return posts;
}

export async function getNotices(limit = 10) {
  const notices = await sdk.collection("notices").find({
    populate: {
      attachment: {
        fields: ["url", "alternativeText", "name"],
      },
    },
    filters: {
      isActive: true,
    },
    sort: ["publishedAt:desc"],
    pagination: {
      pageSize: limit,
    },
  });
  return notices;
}

export async function getUrgentNotices() {
  const notices = await sdk.collection("notices").find({
    filters: {
      isActive: true,
      isUrgent: true,
    },
    sort: ["publishedAt:desc"],
    pagination: {
      pageSize: 5,
    },
  });
  return notices;
}

export async function getNoticeBySlug(slug: string) {
  const notice = await sdk.collection("notices").find({
    filters: {
      slug: slug,
    },
    populate: {
      attachment: {
        fields: ["url", "alternativeText", "name"],
      },
    },
  });
  return notice;
}

export async function getCommitteeMembers(type?: string) {
  const filters: any = {};
  if (type) filters.committeeType = type;

  const members = await sdk.collection("committee-members").find({
    filters,
    populate: {
      photo: {
        fields: ["url", "alternativeText"],
      },
    },
    sort: ["order:asc"],
  });
  return members;
}

export async function getEvents() {
  const events = await sdk.collection("events").find({
    filters: {
      isActive: true,
    },
    populate: {
      image: {
        fields: ["url", "alternativeText"],
      },
    },
    sort: ["dateTime:asc"],
  });
  return events;
}

export async function getMemberDirectory(query = "", union = "", page = 1) {
  const filters: any = {};
  if (query) {
    filters.$or = [
      { name: { $containsi: query } },
      { fatherName: { $containsi: query } },
      { overallSerial: { $containsi: query } },
      { thanaSerial: { $containsi: query } },
      { phone: { $containsi: query } },
    ];
  }
  if (union) {
    filters.union = union;
  }

  const members = await sdk.collection("member-directories").find({
    filters,
    populate: {
      photo: {
        fields: ["url", "alternativeText"],
      },
    },
    pagination: {
      pageSize: 21,
      page: page,
    },
    sort: ["overallSerial:asc", "name:asc"],
  });
  return members;
}

export async function getMemberById(documentId: string) {
  try {
    const member = await sdk.collection("member-directories").findOne(documentId, {
      populate: {
        photo: {
          fields: ["url", "alternativeText"],
        },
      },
    });
    return member;
  } catch (error) {
    console.error("Error fetching member by ID:", error);
    return null;
  }
}

export async function getGalleries() {
  const galleries = await sdk.collection("galleries").find({
    filters: {
      isActive: true,
    },
    populate: {
      image: {
        fields: ["url", "alternativeText", "name"],
      },
    },
    sort: ["date:desc", "createdAt:desc"],
  });
  return galleries;
}
