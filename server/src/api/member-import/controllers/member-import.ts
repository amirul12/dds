import { Core } from '@strapi/strapi';
// @ts-ignore
import * as XLSX from 'xlsx';

const UNION_MAP: Record<string, string> = {
  'দেবহাটা ইউনিয়ন': 'Debhata',
  'কুল্যা ইউনিয়ন': 'Kulya',
  'পারুলিয়া ইউনিয়ন': 'Parulia',
  'সাকড়া ইউনিয়ন': 'Sakhra',
  'নলতা ইউনিয়ন': 'Nalta',
  'দেবহাটা সদর': 'Debhata Sadar',
  'Debhata': 'Debhata',
  'Kulya': 'Kulya',
  'Parulia': 'Parulia',
  'Sakhra': 'Sakhra',
  'Nalta': 'Nalta',
  'Debhata Sadar': 'Debhata Sadar',
};

export default ({ strapi }: { strapi: any }) => ({
  async importExcel(ctx: any) {
    try {
      // Get the uploaded file from the request
      const { request } = ctx;

      if (!request.files || !request.files.file) {
        return ctx.badRequest('No file uploaded');
      }

      const file = Array.isArray(request.files.file)
        ? request.files.file[0]
        : request.files.file;

      // Parse the Excel file using xlsx
      const workbook = XLSX.readFile(file.filepath || file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      if (!rows || rows.length === 0) {
        return ctx.badRequest('Excel file is empty or has no data');
      }

      let imported = 0;
      let skipped = 0;
      let errors: string[] = [];

      for (const row of rows) {
        try {
          // Mapping fields based on user request (Bengali and English fallback)
          const overallSerial = String(
            row['সামগ্রিক ক্রমিক নং'] || row['Overall Serial No'] || row['overallSerial'] || row['serialNumber'] || row['ক্রমিক নং'] || ''
          ).trim();
          const thanaSerial = String(
            row['থানা ভিত্তিক ক্রমিক নং'] || row['Thana Serial No'] || row['thanaSerial'] || ''
          ).trim();
          
          // Helper to find column value by partial match (since actual excel has newlines like "নাম \r\n(Name)")
          const getColValue = (possibleNames: string[]) => {
            for (const key of Object.keys(row)) {
              for (const name of possibleNames) {
                if (key.toLowerCase().includes(name.toLowerCase())) {
                  return row[key];
                }
              }
            }
            return '';
          };
          
          const name = String(getColValue(['নাম', 'Name'])).replace(/\r\n|\n/g, '').trim();
          if (!name) {
             errors.push(`Row skipped: missing name`);
             continue;
          }
          const fatherName = String(getColValue(['পিতার নাম', "Father's Name"])).replace(/\r\n|\n/g, '').trim();
          const motherName = String(getColValue(['মাতার নাম', "Mother's Name"])).replace(/\r\n|\n/g, '').trim();
          const dobRaw = getColValue(['জন্ম তারিখ', 'Date of Birth', 'dob']);
          const village = String(getColValue(['গ্রামের নাম', 'Village Name'])).replace(/\r\n|\n/g, '').trim();
          const unionRaw = String(getColValue(['ইউনিয়নের নাম', 'ইউনিয়নের নাম', 'Union Name', 'union']) || 'Debhata').replace(/\r\n|\n/g, '').trim();
          const permanentAddress = String(getColValue(['স্থায়ী ঠিকানা', 'Permanent Address'])).replace(/\r\n|\n/g, '').trim();
          const presentAddress = String(getColValue(['বর্তমান ঠিকানা', 'Present Address'])).replace(/\r\n|\n/g, '').trim();
          const email = String(getColValue(['ইমেইল আইডি', 'Email ID', 'email'])).replace(/\r\n|\n/g, '').trim();
          
          // Ensure phone has leading zero if it was parsed as number
          let phoneRaw = String(getColValue(['মোবাইল নম্বর', 'Phone Number', 'phone'])).replace(/\r\n|\n/g, '').trim();
          let phone = phoneRaw;
          if (phoneRaw && !phoneRaw.startsWith('0') && phoneRaw.length >= 9) {
             phone = '0' + phoneRaw;
          }
          
          const education = String(getColValue(['শিক্ষাগত যোগ্যতা', 'Educational Qualification', 'education'])).replace(/\r\n|\n/g, '').trim();
          const bloodGroup = String(getColValue(['রক্তের গ্রুপ', 'Blood Group', 'bloodGroup'])).replace(/\r\n|\n/g, '').trim();
          const nid = String(getColValue(['এনআইডি নং', 'NID No', 'nid'])).replace(/\r\n|\n/g, '').trim();
          const presentJob = String(getColValue(['বর্তমান চাকরি', 'Present Job', 'company'])).replace(/\r\n|\n/g, '').trim();
          const presentWorkplace = String(getColValue(['বর্তমান কর্মস্থলের নাম', 'Present Workplace Name', 'presentWorkplace'])).replace(/\r\n|\n/g, '').trim();
          const designation = String(getColValue(['বর্তমান চাকরির পদ', 'Present Job Designation', 'designation', 'role'])).replace(/\r\n|\n/g, '').trim();
          const organizations = String(getColValue(['অন্যান্য সামাজিক প্রতিষ্ঠান', 'Other Social Organizations', 'organizations'])).replace(/\r\n|\n/g, '').trim();

          const membershipTypeRaw = String(getColValue(['সদস্য পদের ধরণ', 'সদস্যের ধরন', 'Membership Type', 'membershipType'])).replace(/\r\n|\n/g, '').trim();
          let membershipType = undefined;
          if (membershipTypeRaw.includes('আজীবন') || membershipTypeRaw.toLowerCase().includes('life')) {
            membershipType = 'Life';
          } else if (membershipTypeRaw.includes('সাধারণ') || membershipTypeRaw.toLowerCase().includes('general')) {
            membershipType = 'General';
          }

          // Map union name
          const union = UNION_MAP[unionRaw] || 'Debhata';

          // Format date if needed (Excel date can be a number or string)
          let dob = null;
          if (dobRaw) {
            if (typeof dobRaw === 'number') {
              // Convert Excel serial date to JS Date
              const date = XLSX.utils.format_cell({ t: 'd', v: dobRaw });
              dob = date;
            } else {
              dob = dobRaw;
            }
          }

          // Check for duplicate by overallSerial if present, otherwise fallback to name+union+phone
          let existing = null;
          if (overallSerial) {
            existing = await strapi.documents('api::member-directory.member-directory').findFirst({
              filters: { overallSerial },
            });
          } else if (name && phone) {
            existing = await strapi.documents('api::member-directory.member-directory').findFirst({
              filters: { 
                name, 
                phone,
                union 
              },
            });
          }

          const data = {
            name,
            membershipType,
            overallSerial: overallSerial || undefined,
            thanaSerial: thanaSerial || undefined,
            fatherName: fatherName || undefined,
            motherName: motherName || undefined,
            dob: dob || undefined,
            village: village || undefined,
            union,
            permanentAddress: permanentAddress || undefined,
            presentAddress: presentAddress || undefined,
            email: email || undefined,
            phone: phone || undefined,
            education: education || undefined,
            bloodGroup: bloodGroup || undefined,
            nid: nid || undefined,
            presentJob: presentJob || undefined,
            presentWorkplace: presentWorkplace || undefined,
            designation: designation || undefined,
            organizations: organizations || undefined,
          };

          if (existing) {
            // Update existing record
            await strapi.documents('api::member-directory.member-directory').update({
              documentId: existing.documentId,
              data,
              status: 'published',
            });
            skipped++;
          } else {
            await strapi.documents('api::member-directory.member-directory').create({
              data: {
                ...data,
                isVerified: false,
              },
              status: 'published',
            });
            imported++;
          }
        } catch (rowError: any) {
          errors.push(`Error on row: ${rowError.message}`);
        }
      }

      return ctx.send({
        success: true,
        imported,
        updated: skipped,
        total: rows.length,
        errors,
        message: `সফলভাবে ${imported} জন নতুন সদস্য যোগ হয়েছে, ${skipped} জন আপডেট হয়েছে।`,
      });
    } catch (err: any) {
      console.error('Excel import error:', err);
      return ctx.internalServerError('Excel import failed: ' + err.message);
    }
  },

  async importJson(ctx: any) {
    try {
      const { members } = ctx.request.body;

      if (!members || !Array.isArray(members) || members.length === 0) {
        return ctx.badRequest('members array is required and must not be empty');
      }

      let imported = 0;
      let skipped = 0;
      let errors: string[] = [];

      for (const row of members) {
        try {
          const overallSerial = String(row.overallSerial || row.serialNumber || '').trim();
          const name = String(row.name || '').trim();
          if (!name) {
            errors.push(`সারি এড়িয়ে গেছে: নাম নেই`);
            continue;
          }

          const union = UNION_MAP[row.union] || 'Debhata';

          let existing = null;
          if (overallSerial) {
            existing = await strapi.documents('api::member-directory.member-directory').findFirst({
              filters: { overallSerial },
            });
          }

          const data = {
            ...row,
            union,
            overallSerial: overallSerial || undefined,
          };

          if (existing) {
            await strapi.documents('api::member-directory.member-directory').update({
              documentId: existing.documentId,
              data,
              status: 'published',
            });
            skipped++;
          } else {
            await strapi.documents('api::member-directory.member-directory').create({
              data: {
                ...data,
                isVerified: false,
              },
              status: 'published',
            });
            imported++;
          }
        } catch (rowError: any) {
          errors.push(`Error: ${rowError.message}`);
        }
      }

      return ctx.send({
        success: true,
        imported,
        updated: skipped,
        total: members.length,
        errors,
        message: `সফলভাবে ${imported} জন নতুন সদস্য যোগ হয়েছে, ${skipped} জন আপডেট হয়েছে।`,
      });
    } catch (err: any) {
      console.error('JSON import error:', err);
      return ctx.internalServerError('JSON import failed: ' + err.message);
    }
  },

  async downloadTemplate(ctx: any) {
    // Create a template Excel file
    const headers = [
      'সামগ্রিক ক্রমিক নং',
      'থানা ভিত্তিক ক্রমিক নং',
      'সদস্য পদের ধরণ',
      'নাম',
      'পিতার নাম',
      'মাতার নাম',
      'জন্ম তারিখ',
      'গ্রামের নাম',
      'ইউনিয়নের নাম',
      'স্থায়ী ঠিকানা',
      'বর্তমান ঠিকানা',
      'ইমেইল আইডি',
      'মোবাইল নম্বর',
      'শিক্ষাগত যোগ্যতা',
      'রক্তের গ্রুপ',
      'এনআইডি নং',
      'বর্তমান চাকরি (কোম্পানি/সংস্থা)',
      'বর্তমান কর্মস্থলের নাম',
      'বর্তমান চাকরির পদ / পদবি',
      'অন্যান্য সামাজিক প্রতিষ্ঠানের সাথে জড়িত থাকলে তার নাম ও পদবি'
    ];

    const sampleData = [
      ['১', '১', 'আজীবন সদস্য', 'মোঃ আব্দুল কাদের', 'মোঃ আব্দুল গাফফার', 'মোছাঃ আমেনা খাতুন', '1990-01-01', 'ভাতশালা', 'দেবহাটা ইউনিয়ন', 'ভাতশালা, দেবহাটা', 'উত্তরা, ঢাকা', 'test@example.com', '01912406634', 'মাঝার্স', 'B+', '1234567890', 'এস এম সোর্সিং', 'ঢাকা অফিস', 'সিনিয়র মার্চেন্ডাইজার', 'সদস্য, রোটারি ক্লাব'],
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...sampleData]);

    // Set column widths
    ws['!cols'] = headers.map(() => ({ wch: 25 }));

    XLSX.utils.book_append_sheet(wb, ws, 'Members');

    const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    ctx.set('Content-Disposition', 'attachment; filename="member-template.xlsx"');
    ctx.body = buffer;
  },

  async clean(ctx: any) {
    try {
      const members = await strapi.documents('api::member-directory.member-directory').findMany({ limit: 10000 });
      let deletedCount = 0;
      for (const m of members) {
        if (m.documentId) {
          await strapi.documents('api::member-directory.member-directory').delete({ documentId: m.documentId });
          deletedCount++;
        }
      }
      return ctx.send({ message: `Deleted ${deletedCount} members` });
    } catch (e: any) {
      console.error(e);
      return ctx.badRequest('Failed to delete members', { details: e.message });
    }
  },
});
