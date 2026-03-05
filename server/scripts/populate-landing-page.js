
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

    console.log("Starting comprehensive landing page population...");

    const uploadedImages = [];
    for (const imgSpec of imagesToUpload) {
      const filePath = path.join(imgDir, imgSpec.name);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const [uploaded] = await strapi.plugins.upload.services.upload.upload({
          data: {},
          files: {
            path: filePath,
            name: imgSpec.name,
            type: 'image/jpeg',
            size: stats.size,
          },
        });
        uploadedImages.push({ ...imgSpec, id: uploaded.id });
      }
    }

    // fallback to existing images if upload failed or already exists
    if (uploadedImages.length === 0) {
      const existingImages = await strapi.plugins.upload.services.upload.fetchAll();
      if (existingImages && existingImages.length > 0) {
        uploadedImages.push({ id: existingImages[0].id, title: "Image 1" });
        if (existingImages[1]) uploadedImages.push({ id: existingImages[1].id, title: "Image 2" });
        if (existingImages[2]) uploadedImages.push({ id: existingImages[2].id, title: "Image 3" });
      }
    }

    const blocks = [
      // 1. Hero Slider
      {
        __component: "layout.hero-slider",
        slides: [
          {
            title: "ঐতিহ্য ও ভ্রাতৃত্বের বন্ধন",
            subtitle: "পরিচয় ও উদ্দেশ্য",
            desc: "ঢাকাস্থ দেবহাটা উপজেলা সমিতি একটি অলাভজনক সামাজিক সংগঠন যা আমাদের এলাকার মানুষের কল্যাণে কাজ করে।",
            cta: "বিস্তারিত জানুন",
            href: "/about",
            image: uploadedImages[0]?.id
          },
          {
            title: "সেবা ও কল্যাণমূলক কার্যক্রম",
            subtitle: "আমাদের কর্মপদ্ধতি",
            desc: "আমরা নিয়মিত সভা, মিলনমেলা এবং বিভিন্ন চ্যারেটি ইভেন্টের মাধ্যমে সদস্যদের সহায়তা প্রদান করি।",
            cta: "কার্যক্রম দেখুন",
            href: "/events",
            image: uploadedImages[1]?.id
          },
          {
            title: "একটি সমৃদ্ধ দেবহাটা পরিবার",
            subtitle: "আমাদের মূল লক্ষ্য",
            desc: "আমাদের লক্ষ্য ঢাকার প্রতিটি দেবহাটা পরিবারকে একই ছাতার নিচে আনা এবং সমৃদ্ধি নিশ্চিত করা।",
            cta: "সদস্য হোন",
            href: "/directory",
            image: uploadedImages[2]?.id
          }
        ]
      },
      // 2. Quick Actions
      {
        __component: "layout.quick-actions",
        actions: [
          { title: 'সদস্য তালিকা', icon: 'Users', href: '/directory', color: 'blue' },
          { title: 'বিজ্ঞপ্তি', icon: 'Bell', href: '/notices', color: 'amber' },
          { title: 'ইভেন্ট', icon: 'Calendar', href: '/events', color: 'green' },
          { title: 'যোগাযোগ', icon: 'Phone', href: '/contact', color: 'rose' }
        ]
      },
      // 3. Section Heading
      {
        __component: "layout.section-heading",
        title: "আমাদের অর্জন ও কার্যক্রম",
        subtitle: "দেবহাটা উপজেলা সমিতির অগ্রযাত্রা"
      },
      // 4. Stats
      {
        __component: "layout.stats",
        stats: [
          { label: 'নিবন্ধিত সদস্য', value: '৫০০+' },
          { label: 'বার্ষিক ইভেন্ট', value: '২০+' },
          { label: 'শিক্ষা প্রকল্প', value: '১০+' },
          { label: 'উপকারভোগী পরিবার', value: '১০০০+' }
        ]
      }
    ];

    const landingPage = await strapi.documents('api::landing-page.landing-page').findFirst();

    if (landingPage) {
      await strapi.documents('api::landing-page.landing-page').update({
        documentId: landingPage.documentId,
        data: { blocks },
        status: 'published'
      });
      console.log("Landing Page blocks updated successfully!");
    } else {
      await strapi.documents('api::landing-page.landing-page').create({
        data: { title: "Home", blocks },
        status: 'published'
      });
      console.log("Landing Page created with blocks successfully!");
    }

  } catch (error) {
    console.error("Error in comprehensive population script:", error);
  }
};
