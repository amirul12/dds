
module.exports = async ({ strapi }) => {
  try {
    console.log("Updating Global Settings...");

    const globalData = {
      title: "দেবহাটা উপজেলা সমিতি, ঢাকা",
      description: "দেবহাটা উপজেলা সমিতি, ঢাকা-এর অফিসিয়াল ওয়েবসাইট",
      topNav: {
        logoText: "দেবহাটা উপজেলা সমিতি, ঢাকা",
        navItems: [
          { text: "হোম", href: "/", isExternal: false },
          { text: "সদস্য তালিকা", href: "/directory", isExternal: false },
          { text: "বিজ্ঞপ্তি", href: "/notices", isExternal: false },
          { text: "ইভেন্ট", href: "/events", isExternal: false },
          { text: "কমিটি", href: "/committee", isExternal: false },
          { text: "গ্যালারি", href: "/gallery", isExternal: false },
          { text: "স্মরণিকা", href: "/smaranika", isExternal: false },
          { text: "যোগাযোগ", href: "/contact", isExternal: false },
        ],
        cta: {
          text: "সদস্য আবেদন",
          href: "/contact#form",
          isExternal: false
        }
      },
      footer: {
        text: "© ২০২৪ দেবহাটা উপজেলা সমিতি, ঢাকা। সর্বস্বত্ব সংরক্ষিত।",
        socialLinks: []
      },
      publishedAt: new Date(),
    };

    const existing = await strapi.documents('api::global.global').findFirst();

    if (existing) {
       await strapi.documents('api::global.global').update({
        documentId: existing.documentId,
        data: globalData,
        status: 'published'
      });
      console.log("Global Settings Updated Successfully!");
    } else {
      await strapi.documents('api::global.global').create({
        data: globalData,
        status: 'published'
      });
      console.log("Global Settings Created Successfully!");
    }
  } catch (error) {
    console.error("Error updating Global Settings:", error);
  }
};
