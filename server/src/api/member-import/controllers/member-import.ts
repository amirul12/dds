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
          // Support both Bengali and English column headers
          const serialNumber = String(
            row['ক্রমিক নং'] || row['Serial No'] || row['serialNumber'] || ''
          ).trim();
          const name = String(
            row['নাম'] || row['Name'] || row['name'] || ''
          ).trim();
          const fatherName = String(
            row['পিতার নাম'] || row["Father's Name"] || row['fatherName'] || ''
          ).trim();
          const location = String(
            row['গ্রামের নাম'] || row['Village Name'] || row['location'] || ''
          ).trim();
          const unionRaw = String(
            row['ইউনিয়নের নাম'] || row['Union Name'] || row['union'] || 'Debhata'
          ).trim();
          const presentJob = String(
            row['বর্তমান চাকরি (কোম্পানি/সংস্থা)'] ||
            row['Present Job (Company/Organization)'] ||
            row['presentJob'] ||
            row['company'] ||
            ''
          ).trim();
          const role = String(
            row['বর্তমান চাকরির পদ'] ||
            row['Present Job Designation'] ||
            row['role'] ||
            ''
          ).trim();
          const phone = String(
            row['মোবাইল নম্বর'] || row['Phone Number'] || row['phone'] || ''
          ).trim();

          if (!name) {
            errors.push(`Row skipped: missing name`);
            continue;
          }

          // Map union name
          const union = UNION_MAP[unionRaw] || 'Debhata';

          // Check for duplicate by serial number if present, or by name+phone
          let existing = null;
          if (serialNumber) {
            existing = await strapi.documents('api::member-directory.member-directory').findFirst({
              filters: { serialNumber },
            });
          }

          if (existing) {
            // Update existing record
            await strapi.documents('api::member-directory.member-directory').update({
              documentId: existing.documentId,
              data: {
                name,
                fatherName,
                union,
                phone,
                location,
                presentJob,
                role,
              },
              status: 'published',
            });
            skipped++;
          } else {
            await strapi.documents('api::member-directory.member-directory').create({
              data: {
                name,
                fatherName,
                union,
                phone,
                serialNumber: serialNumber || undefined,
                location,
                presentJob,
                role,
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
          const serialNumber = String(row.serialNumber || '').trim();
          const name = String(row.name || '').trim();
          const fatherName = String(row.fatherName || '').trim();
          const location = String(row.location || '').trim();
          const unionRaw = String(row.union || 'Debhata').trim();
          const presentJob = String(row.company || row.presentJob || '').trim();
          const role = String(row.role || '').trim();
          const phone = String(row.phone || '').trim();

          if (!name) {
            errors.push(`সারি এড়িয়ে গেছে: নাম নেই`);
            continue;
          }

          const union = UNION_MAP[unionRaw] || 'Debhata';

          let existing = null;
          if (serialNumber) {
            existing = await strapi.documents('api::member-directory.member-directory').findFirst({
              filters: { serialNumber },
            });
          }

          if (existing) {
            await strapi.documents('api::member-directory.member-directory').update({
              documentId: existing.documentId,
              data: { name, fatherName, union, phone, location, presentJob, role },
              status: 'published',
            });
            skipped++;
          } else {
            await strapi.documents('api::member-directory.member-directory').create({
              data: {
                name, fatherName, union, phone,
                serialNumber: serialNumber || undefined,
                location, presentJob, role,
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
      'ক্রমিক নং',
      'নাম',
      'পিতার নাম',
      'গ্রামের নাম',
      'ইউনিয়নের নাম',
      'বর্তমান চাকরি (কোম্পানি/সংস্থা)',
      'বর্তমান চাকরির পদ',
      'মোবাইল নম্বর',
    ];

    const sampleData = [
      ['১', 'মোঃ আব্দুল কাদের', 'মোঃ আব্দুল গাফফার', 'ভাতশালা', 'দেবহাটা ইউনিয়ন', 'এস এম সোর্সিং', 'সিনিয়র মার্চেন্ডাইজার', '01912406634'],
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
});
