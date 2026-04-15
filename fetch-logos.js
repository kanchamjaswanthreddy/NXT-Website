import fs from 'fs';
import path from 'path';
import https from 'https';

const carriers = [
  "Safeco", "State Auto", "CNA Insurance", "Berkshire Hathaway GUARD", 
  "The Hartford", "Encompass Insurance", "National General Insurance", 
  "AEGIS Insurance", "Burns & Wilcox", "CRC Group"
];

const downloadLogo = async (company) => {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(company)}`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const page = Object.values(pages)[0];
    
    if (page && page.original && page.original.source) {
      let sourceUrl = page.original.source;
      let filename = company.toLowerCase().replace(/[\s&]+/g, '-') + path.extname(sourceUrl);
      console.log(`Found logo for ${company}: ${sourceUrl}`);
      
      return new Promise((resolve) => {
        https.get(sourceUrl, (response) => {
          const fileStream = fs.createWriteStream(path.join(process.cwd(), 'public', 'logos', filename));
          response.pipe(fileStream);
          fileStream.on('finish', () => resolve(filename));
        });
      });
    } else {
      console.log(`No logo found on Wikipedia for ${company}`);
      return null;
    }
  } catch (e) {
    console.log(`Error finding ${company}: `, e.message);
    return null;
  }
}

async function main() {
  for (let c of carriers) {
    await downloadLogo(c);
  }
}

main();
