// Email template for carrier appointment outreach

export const buildEmail = ({ carrierName, senderName, agencyName, agencyPhone, agencyWebsite, senderEmail }) => {
  const subject = `Partnership Appointment Request – ${agencyName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; background: #f4f7fb; margin: 0; padding: 0; }
    .wrapper { max-width: 640px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background: #0a2540; padding: 36px 40px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 22px; margin: 0; font-weight: 700; letter-spacing: 0.5px; }
    .header p { color: #00d4ff; margin: 6px 0 0; font-size: 14px; }
    .body { padding: 40px; }
    .body p { font-size: 15px; line-height: 1.75; color: #334155; margin: 0 0 18px; }
    .body ul { padding-left: 20px; margin: 0 0 18px; }
    .body ul li { font-size: 15px; line-height: 1.8; color: #334155; }
    .highlight { background: #f0f9ff; border-left: 4px solid #00d4ff; padding: 16px 20px; border-radius: 4px; margin: 24px 0; }
    .highlight p { margin: 0; color: #0a2540; font-weight: 500; }
    .cta { text-align: center; margin: 32px 0; }
    .cta a { display: inline-block; background: #0a2540; color: #ffffff; text-decoration: none; padding: 14px 36px; border-radius: 8px; font-weight: 600; font-size: 15px; }
    .footer { background: #f8fafc; padding: 28px 40px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer p { font-size: 13px; color: #64748b; margin: 4px 0; }
    .footer a { color: #0a2540; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>NXT Insurance Group</h1>
      <p>Independent Insurance Agency · Partnership Request</p>
    </div>
    <div class="body">
      <p>Dear ${carrierName} Appointments Team,</p>

      <p>My name is <strong>${senderName}</strong>, and I am reaching out on behalf of <strong>${agencyName}</strong> to formally request a carrier appointment and explore a partnership opportunity with ${carrierName}.</p>

      <p>We are a licensed, independent insurance agency focused on delivering exceptional coverage solutions to our clients across personal and commercial lines. Here is a brief overview of who we are:</p>

      <ul>
        <li><strong>Agency:</strong> ${agencyName}</li>
        <li><strong>License:</strong> Licensed independent agency</li>
        <li><strong>Focus:</strong> Personal Lines, Commercial Lines &amp; Specialty Coverage</li>
        <li><strong>Website:</strong> <a href="${agencyWebsite}">${agencyWebsite}</a></li>
        <li><strong>Contact:</strong> ${agencyPhone}</li>
      </ul>

      <div class="highlight">
        <p>We are actively growing our book of business and believe ${carrierName}'s products are an excellent fit for our client base. We are committed to driving quality submissions and maintaining strong loss ratios.</p>
      </div>

      <p>We would love the opportunity to discuss an appointment and learn more about your producer requirements, product appetite, and onboarding process.</p>

      <p>Please feel free to reach out to schedule a call or send over the necessary appointment paperwork. I look forward to the possibility of partnering with ${carrierName}.</p>

      <div class="cta">
        <a href="mailto:${senderEmail}">Reply to Schedule a Call</a>
      </div>

      <p>Thank you for your time and consideration.</p>

      <p>
        Warm regards,<br/>
        <strong>${senderName}</strong><br/>
        ${agencyName}<br/>
        ${agencyPhone}<br/>
        <a href="mailto:${senderEmail}">${senderEmail}</a><br/>
        <a href="${agencyWebsite}">${agencyWebsite}</a>
      </p>
    </div>
    <div class="footer">
      <p>${agencyName} · Licensed Independent Insurance Agency</p>
      <p><a href="${agencyWebsite}">${agencyWebsite}</a></p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
Dear ${carrierName} Appointments Team,

My name is ${senderName}, and I am reaching out on behalf of ${agencyName} to formally request a carrier appointment and explore a partnership with ${carrierName}.

Agency: ${agencyName}
License: Licensed independent agency
Focus: Personal Lines, Commercial Lines & Specialty Coverage
Website: ${agencyWebsite}
Phone: ${agencyPhone}

We are actively growing our book of business and believe ${carrierName}'s products are an excellent fit for our client base. We would love to discuss appointment requirements, product appetite, and onboarding.

Please reply or call us to schedule a conversation.

Thank you,
${senderName}
${agencyName}
${agencyPhone}
${senderEmail}
${agencyWebsite}
  `.trim();

  return { subject, html, text };
};
