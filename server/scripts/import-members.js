
const fs = require('fs');
const path = require('path');

module.exports = async ({ strapi }) => {
  try {
    const dataPath = path.join(__dirname, 'members_data.json');
    if (!fs.existsSync(dataPath)) {
      console.error("Data file not found at:", dataPath);
      return;
    }

    const members = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    console.log(`Starting import of ${members.length} members...`);

    let importedCount = 0;
    let skippedCount = 0;

    for (const member of members) {
      try {
        // Check if member already exists by serialNumber
        const existing = await strapi.documents('api::member-directory.member-directory').findFirst({
          filters: { serialNumber: member.serialNumber }
        });

        if (existing) {
          console.log(`Skipping existing member: ${member.name} (SN: ${member.serialNumber})`);
          skippedCount++;
          continue;
        }

        await strapi.documents('api::member-directory.member-directory').create({
          data: {
            name: member.name,
            fatherName: member.fatherName,
            union: member.union,
            phone: member.phone,
            serialNumber: member.serialNumber,
            location: member.location,
            role: member.role,
            isVerified: true
          },
          status: 'published'
        });
        
        importedCount++;
        if (importedCount % 10 === 0) {
          console.log(`Imported ${importedCount} members...`);
        }
      } catch (err) {
        console.error(`Error importing member ${member.name}:`, err.message);
      }
    }

    console.log(`Import complete! Total imported: ${importedCount}, Total skipped: ${skippedCount}`);

  } catch (error) {
    console.error("Critical error in import script:", error);
  }
};
