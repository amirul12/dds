const fs = require('fs');
const path = require('path');

module.exports = async ({ strapi }) => {
  const dataPath = path.join(process.cwd(), 'scripts', 'committee_data.json');
  if (!fs.existsSync(dataPath)) {
    console.error("Committee data file not found at", dataPath);
    return;
  }
  
  const committeeMembers = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  console.log(`Starting import of ${committeeMembers.length} committee members...`);
  
  let successCount = 0;
  let errorCount = 0;

  for (const memberData of committeeMembers) {
    try {
      // Check if member already exists to avoid duplicates on every restart
      const existing = await strapi.documents('api::committee-member.committee-member').findMany({
        filters: { 
          name: memberData.name,
          designation: memberData.designation,
          committeeType: memberData.committeeType
        }
      });

      if (existing.length > 0) {
        console.log(`Skipping duplicate: ${memberData.name}`);
        continue;
      }

      await strapi.documents('api::committee-member.committee-member').create({
        data: {
          name: memberData.name,
          designation: memberData.designation,
          committeeType: memberData.committeeType,
          order: memberData.order,
          union: memberData.union || "",
          status: 'published'
        }
      });
      
      console.log(`Imported: ${memberData.name} - ${memberData.designation} (${memberData.committeeType})`);
      successCount++;
    } catch (err) {
      console.error(`Error importing ${memberData.name}:`, err.message || err);
      errorCount++;
    }
  }
  
  console.log(`\nImport finished: ${successCount} success, ${errorCount} errors.`);
};
