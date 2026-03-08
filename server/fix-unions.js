const fs = require('fs');

function replaceFile(file, oldStr, newStr) {
  if (fs.existsSync(file)) {
    const data = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, data.replace(oldStr, newStr));
  }
}

// 1. member-directory schema
let schemaDir = '/Volumes/Amirul/work/github/dds-debhata/server/src/api/member-directory/content-types/member-directory/schema.json';
let schemaData = JSON.parse(fs.readFileSync(schemaDir, 'utf8'));
schemaData.attributes.union.enum = ["Debhata", "Kulya", "Parulia", "Sakhipur", "Nawapara"];
fs.writeFileSync(schemaDir, JSON.stringify(schemaData, null, 4));

// 2. membership-application schema
let appSchema = '/Volumes/Amirul/work/github/dds-debhata/server/src/api/membership-application/content-types/membership-application/schema.json';
let appData = JSON.parse(fs.readFileSync(appSchema, 'utf8'));
appData.attributes.union.enum = ["Debhata", "Kulya", "Parulia", "Sakhipur", "Nawapara"];
fs.writeFileSync(appSchema, JSON.stringify(appData, null, 4));

// 3. member-import.ts (UNION_MAP)
const importCtrl = '/Volumes/Amirul/work/github/dds-debhata/server/src/api/member-import/controllers/member-import.ts';
let ctrlData = fs.readFileSync(importCtrl, 'utf8');
const newUnionMap = `const UNION_MAP: Record<string, string> = {
  'দেবহাটা ইউনিয়ন': 'Debhata',
  'কুল্যা ইউনিয়ন': 'Kulya',
  'কুলিয়া ইউনিয়ন': 'Kulya',
  'পারুলিয়া ইউনিয়ন': 'Parulia',
  'সখিপুর ইউনিয়ন': 'Sakhipur',
  'নওয়াপাড়া ইউনিয়ন': 'Nawapara',
  'Debhata': 'Debhata',
  'Kulya': 'Kulya',
  'Kulia': 'Kulya',
  'Parulia': 'Parulia',
  'Sakhipur': 'Sakhipur',
  'Nawapara': 'Nawapara',
};`;
ctrlData = ctrlData.replace(/const UNION_MAP: Record<string, string> = \{[\s\S]*?\};/, newUnionMap);
fs.writeFileSync(importCtrl, ctrlData);

// 4. client UI (directory page)
const dirPage = '/Volumes/Amirul/work/github/dds-debhata/client/src/app/(root)/directory/page.tsx';
let dirData = fs.readFileSync(dirPage, 'utf8');
dirData = dirData.replace(/const UNIONS = \[[\s\S]*?\];/, `const UNIONS = [\n  "Debhata",\n  "Kulya",\n  "Parulia",\n  "Sakhipur",\n  "Nawapara"\n];`);
// Also fix the dropdown so it knows "Kulya" = "কুল্যা" etc? 
// In the select dropdown it currently just renders values. Let's provide a better mapping for the frontend!
dirData = dirData.replace(
  /const UNIONS = \[\n  "Debhata",\n  "Kulya",\n  "Parulia",\n  "Sakhipur",\n  "Nawapara"\n\];/,
  `const UNIONS = [
  { value: "Debhata", bn: "দেবহাটা" },
  { value: "Kulya", bn: "কুল্যা" },
  { value: "Parulia", bn: "পারুলিয়া" },
  { value: "Sakhipur", bn: "সখিপুর" },
  { value: "Nawapara", bn: "নওয়াপাড়া" }
];`
);
fs.writeFileSync(dirPage, dirData);

// 5. client Form (MembershipForm)
const formPage = '/Volumes/Amirul/work/github/dds-debhata/client/src/components/forms/MembershipForm.tsx';
let formData = fs.readFileSync(formPage, 'utf8');
formData = formData.replace(/const UNIONS = \[[\s\S]*?\];/, `const UNIONS = [\n  "Debhata",\n  "Kulya",\n  "Parulia",\n  "Sakhipur",\n  "Nawapara"\n];`);
fs.writeFileSync(formPage, formData);

