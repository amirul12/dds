
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
      },
      // 5. Objectives
      {
        __component: "layout.objectives",
        title: "সমিতির লক্ষ্য ও উদ্দেশ্য",
        items: [
          { content: "(ক) দেবহাটা উপজেলার যে সব অধিবাসী ঢাকায় নিয়মিতভাবে বসবাস তাদের সামাজিক সাংস্কৃতিক উন্নয়ন ও কল্যাণ সাধন, দেবহাটা উপজেলার অধিবাসীদের কল্যাণে উন্নয়নমূলক কাজ করার লক্ষ্যকে সমর্থন করা।" },
          { content: "(খ) সমিতি একটি অরাজনৈতিক সংগঠন, সমগ্র দেবহাটাবাসীর ভিতরে জাতীয় ভিত্তিতে সামাজিক-সাংস্কৃতিক সেবামূলক কল্যাণমুখী কর্মকাণ্ড প্রণয়ন ও তা বাস্তবায়নে প্রচেষ্টা অব্যাহত রাখা।" },
          { content: "(গ) ঢাকা মহানগরীস্থ দেবহাটা উপজেলার অধিবাসীদের মধ্যে সৌহার্দ্য ও ঐক্য প্রতিষ্ঠা এবং তাদের কল্যাণ ও দেবহাটা উপজেলার উন্নয়নে সকলকে উদ্বুদ্ধকরণ।" },
          { content: "(ঘ) দেবহাটা উপজেলার অধিবাসীদের স্বাস্থ্য চিকিৎসা ও সামাজিক আন্দোলনে, মেধাবী ও দরিদ্র শিক্ষার্থীদের বৃত্তি ও সহায়তা প্রদান এবং সংশ্লিষ্ট অন্যান্য সেবা প্রদানে সচেষ্ট প্রচেষ্টা করা।" },
          { content: "(ঙ) দেবহাটা উপজেলার প্রকৃত ইতিহাস ও ঐতিহ্য যথাযথভাবে তুলে ধরা এবং দেবহাটা উপজেলার উন্নয়নে সচেষ্ট থাকা।" },
          { content: "(চ) দেবহাটাবাসীদের আর্থিক উন্নয়ন ও কর্মসংস্থানের লক্ষ্যে বহুমুখী শিক্ষা প্রতিষ্ঠান, ক্ষুদ্র ও কুটির শিল্প স্থাপন ও পরিচালনার কার্যক্রম গ্রহণ করা।" },
          { content: "(ছ) দেবহাটা উপজেলার প্রাকৃতিক দুর্যোগ ও মানব সৃষ্ট দুর্যোগ নিরসনে সহায়তা পদক্ষেপসমূহ গ্রহণ করা।" },
          { content: "(জ) উন্নত ও কারিগরি শিক্ষা সম্প্রসারণ ও সংরক্ষণ করা, স্কুল, মাদ্রাসা, পাঠাগার ইত্যাদি স্থাপন ও পরিচালনা, সাংস্কৃতিক সংগঠন, শিক্ষামূলক প্রতিযোগিতা, সেমিনার, কর্মশালা ইত্যাদির আয়োজন করা।" },
          { content: "(ঝ) দুস্থ, পীড়িত বা বিপন্ন দেবহাটাবাসীকে সামর্থ্য অনুযায়ী সাহায্য করা এবং বেকার অভাবগ্রস্ত দেবহাটাবাসীর কর্মসংস্থান সম্ভব পদক্ষেপ গ্রহণ করা।" },
          { content: "(ঞ) দেবহাটা উপজেলার কৃষি ও শিল্প, পরিবেশ ও নৈতিক জীবন, সমাজ ও শিক্ষা এবং সংস্কৃতি ও সাহিত্য উন্নয়ন বিকাশে সহায়ক উদ্যোগ গ্রহণ করা।" },
          { content: "(ট) দেবহাটা উপজেলার সকল প্রকার অবকাঠামো উন্নয়নে সরকার (অরাজনৈতিক) এবং সংশ্লিষ্ট সকল কর্তৃপক্ষের দৃষ্টি আকর্ষণ করা এবং সে সকল বিষয়ে প্রয়োজনীয় পদক্ষেপ গ্রহণের চেষ্টা করা।" },
          { content: "(ঠ) বিজ্ঞান ও শিক্ষা, সংস্কৃতি ও সাহিত্য, শিল্প ও কৃষি, কৃষি ও জনকল্যাণ এবং অন্যান্য সংশ্লিষ্ট ক্ষেত্রে অনন্য অবদান রাখার জন্য সংশ্লিষ্ট ব্যক্তিদের সম্মাননা প্রদানের পদক্ষেপ গ্রহণ করা।" }
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
