import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') });

const { RESEND_API_KEY, SENDER_EMAIL, SENDER_NAME, AGENCY_NAME, AGENCY_PHONE, AGENCY_WEBSITE } = process.env;

// ─── 57 VERIFIED CARRIERS ────────────────────────────────────────────────────
const carriers = [
  { name: "Annex Risk",              contact: "support@annexrisk.com" },
  { name: "Arrowhead General",       contact: "MarketingInfo@ArrowheadGrp.com" },
  { name: "Attune",                  contact: "newagents@attuneinsurance.com" },
  { name: "Bamboo",                  contact: "agencyonboarding@bambooinsurance.com" },
  { name: "BTIS",                    contact: "service@btisinc.com" },
  { name: "Burns & Wilcox",          contact: "newcredentialing@burnsandwilcox.com" },
  { name: "Cabrillo Coastal",        contact: "MMCNITT@CABGEN.COM" },
  { name: "CannGen",                 contact: "cannapp@canngenins.com" },
  { name: "CNA",                     contact: "CNAAgencyRequests@cna.com" },
  { name: "Cover Tree",              contact: "agentsales@covertree.com" },
  { name: "Cowbell Cyber",           contact: "support@cowbellcyber.ai" },
  { name: "CRC Group",               contact: "agencyappointments@crcgroup.com" },
  { name: "CRC Tapco",               contact: "TapcoNewBrokers@crcgroup.com" },
  { name: "Cypress",                 contact: "appointments@cypressig.com" },
  { name: "Dairyland",               contact: "Help@DairylandInsurance.com" },
  { name: "Elephant Insurance",      contact: "advertising@elephant.com" },
  { name: "Embark General",          contact: "Communications@embarkgeneral.com" },
  { name: "Foremost",                contact: "acm@foremost.com" },
  { name: "Foremost Signature",      contact: "acm@foremost.com" },
  { name: "GBLI / Penn-America",     contact: "generalinfo@penn-america.com" },
  { name: "Guard Insurance",         contact: "csr@guard.com" },
  { name: "Grange Insurance",        contact: "agencylicensing@grangeinsurance.com" },
  { name: "Hagerty",                 contact: "agent@hagerty.com" },
  { name: "Heritage Insurance",      contact: "salesandmarketing@heritagepci.com" },
  { name: "Homeowners of America",   contact: "sales@hoaic.com" },
  { name: "Hugo",                    contact: "support@withhugo.com" },
  { name: "ICAT",                    contact: "marketing@icat.com" },
  { name: "Indigo Insurance",        contact: "info@indigo-insurance.com" },
  { name: "ISC",                     contact: "appointments@iscmga.com" },
  { name: "K2 Specialty",            contact: "jtanner@k2constructionins.com" },
  { name: "Kemper Auto",             contact: "getanswers@kemper.com" },
  { name: "Lamar General Agency",    contact: "underwriting@lamargenagency.com" },
  { name: "Lemonade",                contact: "agents@lemonade.com" },
  { name: "Liberty Surety",          contact: "bonds@libertymutual.com" },
  { name: "Lincoln Financial",       contact: "Contracting@LFG.com" },
  { name: "National General",        contact: "service@ngic.com" },
  { name: "Obie",                    contact: "support@obieinsurance.com" },
  { name: "Openly",                  contact: "service@openly.com" },
  { name: "Orchid Insurance",        contact: "marketing@orchidinsurance.com" },
  { name: "Palomar Specialty",       contact: "Contact@plmr.com" },
  { name: "Pathpoint Northeast",     contact: "mschamble@pathpoint.com" },
  { name: "Pathpoint Southeast",     contact: "dcoakley@pathpoint.com" },
  { name: "Pathpoint Central",       contact: "jrespeliers@pathpoint.com" },
  { name: "Pathpoint Texas",         contact: "zsutika@pathpoint.com" },
  { name: "Philadelphia Insurance",  contact: "phlysales@phly.com" },
  { name: "Propeller Bonds",         contact: "danny@propellerbonds.com" },
  { name: "Rohrer & Associates",     contact: "info@rbrokers.com" },
  { name: "RPS",                     contact: "CustomerCare@rpsins.com" },
  { name: "SES Insurance",           contact: "partners@ses-ins.com" },
  { name: "Sport Underwriters",      contact: "Nick@sportsinsurance.com" },
  { name: "Starwind WC",             contact: "info@starwindins.com" },
  { name: "Steadily",                contact: "appointments@steadily.com" },
  { name: "Tokio Marine HCC",        contact: "specialty@tmhcc.com" },
  { name: "Trexis",                  contact: "marketing@trexis.com" },
  { name: "Victor Insurance",        contact: "info.us@victorinsurance.com" },
  { name: "Wellington Insurance",    contact: "personallines@wellingtoninsgroup.com" },
  { name: "XS Brokers",              contact: "bdm@xsbrokers.com" },
];

// ─── EMAIL TEMPLATE ──────────────────────────────────────────────────────────
const buildEmail = (carrierName) => {
  const subject = `Partnership Appointment Request – ${AGENCY_NAME}`;
  const html = `
<!DOCTYPE html><html><head><meta charset="UTF-8">
<style>
  body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a2e;background:#f4f7fb;margin:0;padding:0}
  .wrapper{max-width:640px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)}
  .header{background:#0a2540;padding:36px 40px;text-align:center}
  .header h1{color:#fff;font-size:22px;margin:0;font-weight:700}
  .header p{color:#00d4ff;margin:6px 0 0;font-size:14px}
  .body{padding:40px}
  .body p{font-size:15px;line-height:1.75;color:#334155;margin:0 0 18px}
  .body ul{padding-left:20px;margin:0 0 18px}
  .body ul li{font-size:15px;line-height:1.8;color:#334155}
  .highlight{background:#f0f9ff;border-left:4px solid #00d4ff;padding:16px 20px;border-radius:4px;margin:24px 0}
  .highlight p{margin:0;color:#0a2540;font-weight:500}
  .footer{background:#f8fafc;padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0}
  .footer p{font-size:13px;color:#64748b;margin:4px 0}
  a{color:#0a2540}
</style></head><body>
<div class="wrapper">
  <div class="header">
    <h1>${AGENCY_NAME}</h1>
    <p>Independent Insurance Agency · Partnership Request</p>
  </div>
  <div class="body">
    <p>Dear ${carrierName} Appointments Team,</p>
    <p>My name is <strong>${SENDER_NAME}</strong>, and I am reaching out on behalf of <strong>${AGENCY_NAME}</strong> to formally request a carrier appointment and explore a partnership with <strong>${carrierName}</strong>.</p>
    <p>Here is a brief overview of our agency:</p>
    <ul>
      <li><strong>Agency:</strong> ${AGENCY_NAME}</li>
      <li><strong>Type:</strong> Licensed Independent Insurance Agency</li>
      <li><strong>Focus:</strong> Personal Lines, Commercial Lines &amp; Specialty Coverage</li>
      <li><strong>Website:</strong> <a href="${AGENCY_WEBSITE}">${AGENCY_WEBSITE}</a></li>
      <li><strong>Phone:</strong> ${AGENCY_PHONE}</li>
    </ul>
    <div class="highlight">
      <p>We are actively growing our book of business and believe ${carrierName}'s products are an excellent fit for our clients. We are committed to driving quality submissions and maintaining strong loss ratios.</p>
    </div>
    <p>We would love to discuss appointment requirements, product appetite, and the onboarding process. Please feel free to reply or reach out to schedule a call.</p>
    <p>Thank you for your time and consideration.</p>
    <p>Warm regards,<br/>
    <strong>${SENDER_NAME}</strong><br/>
    ${AGENCY_NAME}<br/>
    ${AGENCY_PHONE}<br/>
    <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a><br/>
    <a href="${AGENCY_WEBSITE}">${AGENCY_WEBSITE}</a></p>
  </div>
  <div class="footer">
    <p>${AGENCY_NAME} · Licensed Independent Insurance Agency</p>
  </div>
</div>
</body></html>`.trim();
  return { subject, html };
};

// ─── SEND ENGINE ─────────────────────────────────────────────────────────────
const DELAY_MS = 1500;
const LOG_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), 'send_log.json');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  const resend = new Resend(RESEND_API_KEY);

  console.log(`\n📬 NXT Financial Group — Carrier Outreach`);
  console.log(`📤 Sending from: ${SENDER_EMAIL}`);
  console.log(`📋 Total carriers: ${carriers.length}\n`);
  console.log('─────────────────────────────────────────\n');

  const results = { sent: [], failed: [] };

  for (let i = 0; i < carriers.length; i++) {
    const carrier = carriers[i];
    const { subject, html } = buildEmail(carrier.name);

    process.stdout.write(`[${i + 1}/${carriers.length}] ${carrier.name} <${carrier.contact}>... `);

    const { data, error } = await resend.emails.send({
      from: `${SENDER_NAME} – ${AGENCY_NAME} <${SENDER_EMAIL}>`,
      to: carrier.contact,
      reply_to: SENDER_EMAIL,
      bcc: SENDER_EMAIL,
      subject,
      html,
    });

    if (error) {
      console.log(`❌ Failed — ${error.message}`);
      results.failed.push({ name: carrier.name, email: carrier.contact, error: error.message });
    } else {
      console.log(`✅ Sent`);
      results.sent.push({ name: carrier.name, email: carrier.contact, id: data.id, timestamp: new Date().toISOString() });
    }

    if (i < carriers.length - 1) await sleep(DELAY_MS);
  }

  writeFileSync(LOG_FILE, JSON.stringify(results, null, 2));

  console.log('\n─────────────────────────────────────────');
  console.log(`✅ Sent:   ${results.sent.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`📋 Full log saved to: outreach/send_log.json`);

  if (results.failed.length > 0) {
    console.log('\nFailed:');
    results.failed.forEach(f => console.log(`  - ${f.name}: ${f.error}`));
  }
}

main().catch(console.error);
