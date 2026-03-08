const XLSX = require('xlsx');
const wb = XLSX.readFile('/Volumes/Amirul/work/github/dds-debhata/server/public/members/Contact Information (Responses)_28.02.2026_Final.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(ws);
const unions = new Set();
for (const row of data) {
  const v = row['ইউনিয়নের নাম'] || row['ইউনি ইউনিয়নের নাম'] || row['Union'] || Object.values(row)[7];
  if (v) unions.add(v.toString().trim());
}
console.log(Array.from(unions));
