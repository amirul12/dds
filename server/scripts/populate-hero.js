
const fs = require('fs');
const path = require('path');

module.exports = async ({ strapi }) => {
  try {
    const imgDir = '/Volumes/Amirul/work/github/dds-debhata/img/dds-debhata';
    const imagesToUpload = [
      { name: 'picnic-2023.jpeg', title: 'বার্ষিক বনভোজন ২০২৩' },
      { name: 'ifter-01.jpeg', title: 'ইফতার ও দোয়া মাহফিল' },
      { name: 'meeting-01.jpeg', title: 'সাধারণ সভা ও আলোচনা' }
    ];

    console.log("Starting image upload via Strapi service...");

    const uploadedImages = [];

    for (const imgSpec of imagesToUpload) {
      const filePath = path.join(imgDir, imgSpec.name);
      if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        continue;
      }

      const stats = fs.statSync(filePath);
      
      const [uploaded] = await strapi.plugins.upload.services.upload.upload({
        data: {}, // optional metadata
        files: {
          path: filePath,
          name: imgSpec.name,
          type: 'image/jpeg',
          size: stats.size,
        },
      });

      console.log(`Uploaded ${imgSpec.name} with ID: ${uploaded.id}`);
      uploadedImages.push({
        ...imgSpec,
        id: uploaded.id
      });
    }

    console.log("Updating Landing Page with Hero Slider...");

    const landingPage = await strapi.documents('api::landing-page.landing-page').findFirst();

    const heroSliderBlock = {
      __component: "layout.hero-slider",
      slides: uploadedImages.map(img => ({
        title: img.title,
        subtitle: "ঐতিহ্য ও ভ্রাতৃত্বের বন্ধন",
        desc: "ঢাকাস্থ দেবহাটা উপজেলা সমিতির সাথে যুক্ত হয়ে সামাজিক উন্নয়নে অংশ নিন। আমরা একতাবদ্ধ হয়ে দেবহাটার কল্যাণে কাজ করি।",
        cta: "সদস্য হোন",
        href: "/directory",
        image: img.id
      }))
    };

    if (landingPage) {
      await strapi.documents('api::landing-page.landing-page').update({
        documentId: landingPage.documentId,
        data: {
          blocks: [heroSliderBlock] // Replacing blocks with just the hero slider for now as requested
        },
        status: 'published'
      });
      console.log("Landing Page Hero Section Updated Successfully!");
    } else {
      await strapi.documents('api::landing-page.landing-page').create({
        data: {
          title: "Home",
          blocks: [heroSliderBlock]
        },
        status: 'published'
      });
      console.log("Landing Page Created with Hero Section!");
    }

  } catch (error) {
    console.error("Error in upload and update script:", error);
  }
};
