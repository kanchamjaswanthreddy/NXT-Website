import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const companies = [
  { name: "State Farm", domain: "statefarm.com" },
  { name: "Geico", domain: "geico.com" },
  { name: "Progressive", domain: "progressive.com" },
  { name: "Allstate", domain: "allstate.com" },
  { name: "Liberty Mutual", domain: "libertymutual.com" },
  { name: "Farmers", domain: "farmers.com" },
  { name: "Nationwide", domain: "nationwide.com" },
  { name: "American Family", domain: "amfam.com" },
  { name: "Travelers", domain: "travelers.com" },
  { name: "Chubb", domain: "chubb.com" },
  { name: "AIG", domain: "aig.com" },
  { name: "MetLife", domain: "metlife.com" },
  { name: "Prudential", domain: "prudential.com" },
  { name: "New York Life", domain: "newyorklife.com" },
  { name: "MassMutual", domain: "massmutual.com" },
  { name: "Cigna", domain: "cigna.com" },
  { name: "Aetna", domain: "aetna.com" },
  { name: "Humana", domain: "humana.com" },
  { name: "UnitedHealthcare", domain: "uhc.com" },
  { name: "Anthem", domain: "anthem.com" }
];

const downloadDir = path.join(__dirname, 'public', 'logos');
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

async function downloadLogo(company) {
  const url = `https://logo.uplead.com/${company.domain}`;
  const filePath = path.join(downloadDir, `${company.name.replace(/\s+/g, '-').toLowerCase()}.png`);
  
  return new Promise((resolve) => {
    https.get(url, (res) => {
      // follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          const fileStream = fs.createWriteStream(filePath);
          redirectRes.pipe(fileStream);
          fileStream.on('finish', () => { fileStream.close(); resolve(true); });
        });
      } else if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded ${company.name}`);
          // if file size is very small, it might be an invalid image, but we'll try it.
          resolve(true);
        });
      } else {
        console.log(`Failed ${company.name}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`Error downloading ${company.name}:`, err);
      resolve(false);
    });
  });
}

async function main() {
  for (const company of companies) {
    await downloadLogo(company);
  }
}

main();
