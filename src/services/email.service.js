const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `Backend Ledger <${process.env.EMAIL_USER}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

async function sendRegistrationEmail(userEmail, name) {
    const subject = 'Welcome to Backend Ledger!';

    const text = `
Hi ${name},

Welcome to Backend Ledger! 🎉

Your account has been successfully created, and we're excited to have you with us.

Backend Ledger is here to help you manage your backend operations and keep everything organized in one place.

You can now log in and start exploring your account.

If you have any questions or need help, feel free to reach out to our support team.

Thanks for joining Backend Ledger!

Best regards,
The Backend Ledger Team
`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Backend Ledger</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif; color:#333333;">
    <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">

        <!-- Header -->
        <div style="background:#111827; padding:30px; text-align:center;">
            <h1 style="margin:0; color:#ffffff; font-size:28px;">
                Backend Ledger
            </h1>
        </div>

        <!-- Content -->
        <div style="padding:40px 30px;">
            <h2 style="margin-top:0; color:#111827;">
                Welcome, ${name}! 🎉
            </h2>

            <p style="font-size:16px; line-height:1.6;">
                Your Backend Ledger account has been successfully created.
                We're excited to have you with us!
            </p>

            <p style="font-size:16px; line-height:1.6;">
                You can now log in and start exploring Backend Ledger.
                We're here to help you keep your backend operations organized
                and easy to manage.
            </p>

            <!-- Button -->
            <div style="text-align:center; margin:30px 0;">
                <a href="https://your-domain.com/login"
                   style="display:inline-block; padding:14px 28px; background:#2563eb; color:#ffffff; text-decoration:none; border-radius:6px; font-size:16px; font-weight:bold;">
                    Go to Backend Ledger
                </a>
            </div>

            <p style="font-size:15px; line-height:1.6; color:#555555;">
                If you have any questions or need assistance, feel free to
                contact our support team.
            </p>

            <p style="font-size:16px; line-height:1.6;">
                Thanks for joining Backend Ledger!
            </p>

            <p style="font-size:16px; line-height:1.6;">
                Best regards,<br>
                <strong>The Backend Ledger Team</strong>
            </p>
        </div>

        <!-- Footer -->
        <div style="background:#f9fafb; padding:20px 30px; text-align:center; border-top:1px solid #e5e7eb;">
            <p style="margin:0; font-size:13px; color:#888888;">
                © ${new Date().getFullYear()} Backend Ledger. All rights reserved.
            </p>
        </div>

    </div>
</body>
</html>
`;

    await sendEmail(userEmail, subject, text, html);
}


module.exports = {
    sendRegistrationEmail
};
