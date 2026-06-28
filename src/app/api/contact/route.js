import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, service, message } = await req.json();

    // 1. Strict Backend Fallback Validation
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    if (name.length > 50 || message.length > 1000) {
      return NextResponse.json({ success: false, error: "Input length constraint violation." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format structure." }, { status: 400 });
    }

    // 2. Strict Server-Side Sanitization (To completely block markup/script injection)
    const cleanString = (str) => {
      if (!str) return "";
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
    };

    const safeName = cleanString(name);
    const safeEmail = cleanString(email);
    const safeService = cleanString(service) || "General Query / Customized Route";
    const safeMessage = cleanString(message);

    const apiKey = process.env.BREVO_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!apiKey || !adminEmail) {
      console.error("Missing Environment Variables: BREVO_API_KEY or ADMIN_EMAIL");
      return NextResponse.json({ success: false, error: "Server misconfiguration." }, { status: 500 });
    }

    const sendEmail = async (data) => {
      return await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey
        },
        body: JSON.stringify(data)
      });
    };

    // EMAIL TO YOU (Admin Alert with Selected Service)
    const adminRes = await sendEmail({
      sender: {
        email: adminEmail,
        name: "Portfolio Hub"
      },
      to: [{ email: adminEmail }],
      subject: `🚀 Lead: ${safeService} - ${safeName}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 40px; background: #000000; color: #ffffff; max-w: 600px; margin: 0 auto; border: 1px solid #1f2937; border-radius: 16px;">
          <h2 style="color: #3b82f6; font-size: 24px; margin-bottom: 20px; border-bottom: 1px solid #1f2937; padding-bottom: 10px;">New Portfolio Client Inquiry</h2>
          
          <table style="width: 100%; text-align: left; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <th style="padding: 8px 0; color: #9ca3af; font-size: 14px; width: 120px;">Client Name:</th>
              <td style="padding: 8px 0; color: #ffffff; font-size: 14px; font-weight: bold;">${safeName}</td>
            </tr>
            <tr>
              <th style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Email ID:</th>
              <td style="padding: 8px 0; color: #3b82f6; font-size: 14px;">${safeEmail}</td>
            </tr>
            <tr>
              <th style="padding: 8px 0; color: #9ca3af; font-size: 14px;">Service Selected:</th>
              <td style="padding: 8px 0; color: #a855f7; font-size: 14px; font-weight: bold;">${safeService}</td>
            </tr>
          </table>

          <p style="color: #9ca3af; font-size: 14px; margin-bottom: 8px;">Project Specifications:</p>
          <div style="padding: 20px; background: #111827; border: 1px solid #1f2937; border-radius: 12px; color: #e5e7eb; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
            ${safeMessage}
          </div>
        </div>
      `
    });

    if (!adminRes.ok) {
      const errLog = await adminRes.text();
      console.error("Brevo API Admin Mail Error:", errLog);
      return NextResponse.json({ success: false, error: "Failed to dispatch email matrix." }, { status: 500 });
    }

    // AUTO REPLY TO CLIENT (Professional Layout)
    await sendEmail({
      sender: {
        email: adminEmail,
        name: "Nitesh "
      },
      to: [{ email: email }], // Original target string
      subject: "Project Inquiry Received | Nitesh ",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 40px; background: #000000; color: #ffffff; max-w: 600px; margin: 0 auto; border: 1px solid #1f2937; border-radius: 16px;">
          <h2 style="color: #a855f7; font-size: 22px; margin-bottom: 15px;">Hello ${safeName},</h2>
          <p style="color: #d1d5db; font-size: 14px; line-height: 1.6;">
            Thank you for reaching out! I have successfully received your request regarding the <strong style="color: #3b82f6;">${safeService}</strong> pipeline.
          </p>
          <p style="color: #d1d5db; font-size: 14px; line-height: 1.6;">
            I am currently reviewing your custom requirements and technical specifications. You can expect a detailed roadmap response or calendar invitation within the next 12-24 hours.
          </p>
          
          <div style="margin-top: 25px; padding: 15px; background: #111827; border-left: 3px solid #a855f7; border-radius: 4px; color: #9ca3af; font-size: 13px; font-style: italic;">
            "Your submitted request has been safely logged in our primary operational database."
          </div>

          <p style="margin-top: 30px; border-t: 1px solid #1f2937; padding-top: 20px; font-size: 14px; color: #9ca3af;">
            Best Regards,<br/>
            <strong style="color: #ffffff; font-size: 15px;">Nitesh</strong><br/>
            <span style="font-size: 12px; color: #6b7280;">Full-Stack Engineer & Conversion Architect</span>
          </p>
        </div>
      `
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Global API Contact Route Exception:", error);
    return NextResponse.json({ success: false, error: "Internal operational loop crash." }, { status: 500 });
  }
}