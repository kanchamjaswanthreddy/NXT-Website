import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') });

const { RESEND_API_KEY, SENDER_EMAIL, SENDER_NAME, AGENCY_NAME, AGENCY_PHONE, AGENCY_WEBSITE } = process.env;

const TEST_CARRIER = { name: "Attune", contact: "newagents@attuneinsurance.com" };

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

async function main() {
  const resend = new Resend(RESEND_API_KEY);
  const { subject, html } = buildEmail(TEST_CARRIER.name);

  console.log(`📧 Sending test email to: ${TEST_CARRIER.name} <${TEST_CARRIER.contact}>`);
  console.log(`   Subject: ${subject}\n`);

  const { data, error } = await resend.emails.send({
    from: `${SENDER_NAME} – ${AGENCY_NAME} <${SENDER_EMAIL}>`,
    to: TEST_CARRIER.contact,
    reply_to: SENDER_EMAIL,
    bcc: SENDER_EMAIL,
    subject,
    html,
  });

  if (error) {
    console.error('❌ Failed:', error.message);
    if (error.message.includes('domain')) {
      console.error('\n👉 Your domain nxtfinancialgroup.com needs to be verified in Resend.');
      console.error('   Go to: resend.com/domains → Add Domain → follow the DNS steps');
    }
  } else {
    console.log('✅ Email sent successfully!');
    console.log(`   Email ID: ${data.id}`);
    console.log('\n✅ Ready to send to all 57 carriers. Run:');
    console.log('   node outreach/send.mjs');
  }
}

main().catch(console.error);
