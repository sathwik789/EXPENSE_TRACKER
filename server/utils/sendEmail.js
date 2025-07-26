const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
      port: process.env.EMAIL_PORT, // e.g., 587
      secure: false,                // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // HTML version of the email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb; color: #333;">
        <h2 style="color: #4f46e5;">💰 Expense Tracker</h2>
        <p>Hi there,</p>
        <p>${text}</p>
        <div style="margin: 20px 0; border-top: 1px solid #ddd;"></div>
        <p style="font-size: 14px; color: #555;">
          Thank you for using <strong>Expense Tracker</strong>.<br/>
          Keep tracking, keep saving! 📊
        </p>
        <p style="font-size: 12px; color: #aaa;">
          This is an automated email – please do not reply.
        </p>
      </div>
    `;

    // Send the email
    await transporter.sendMail({
      from: `"Expense Tracker" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: htmlContent,
    });

    console.log(`✅ Email successfully sent to ${to}`);

  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    throw new Error("Email failed to send.");
  }
};

module.exports = sendEmail;
