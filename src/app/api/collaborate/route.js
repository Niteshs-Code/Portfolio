import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, email, phone, role, portfolio } = await req.json();

    // 1. Strict Backend Fallback Validation
    if (!name || !email || !phone || !role || !portfolio) {
      return NextResponse.json(
        { success: false, error: "All required fields must be provided." },
        { status: 400 }
      );
    }

    // Input Length Constraints
    if (name.length > 60 || email.length > 80 || phone.length > 20 || portfolio.length > 200) {
      return NextResponse.json(
        { success: false, error: "Input character limit constraint violation." },
        { status: 400 }
      );
    }

    // Email Regex Format Check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address structure." },
        { status: 400 }
      );
    }

    // Phone Regex Format Check (Allows digits, +, spaces, hyphens)
    const phoneRegex = /^[0-9+\s-]{10,20}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number format." },
        { status: 400 }
      );
    }

    // 2. Server-Side HTML Sanitization (XSS & Markup Injection Prevention)
    const sanitize = (str) => {
      if (!str) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
    };

    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safePhone = sanitize(phone);
    const safeRole = sanitize(role);
    const safePortfolio = sanitize(portfolio);

    const apiKey = process.env.BREVO_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!apiKey || !adminEmail) {
      console.error("Missing Environment Variables: BREVO_API_KEY or ADMIN_EMAIL");
      return NextResponse.json(
        { success: false, error: "Server environment misconfiguration." },
        { status: 500 }
      );
    }

    // Helper Brevo POST Helper Function
    const sendBrevoEmail = async (payload) => {
      return await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(payload),
      });
    };

    // ==========================================
    // 1. ADMIN ALERT EMAIL (Application Received)
    // ==========================================
    const adminMailResponse = await sendBrevoEmail({
      sender: {
        email: adminEmail,
        name: "Dev Network Hub",
      },
      to: [{ email: adminEmail }],
      subject: `⚡ New Collaboration Request: ${safeName} (${safeRole})`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 40px; background: #09090b; color: #ffffff; max-width: 600px; margin: 0 auto; border: 1px solid #27272a; border-radius: 16px;">
          <div style="margin-bottom: 24px; border-bottom: 1px solid #27272a; padding-bottom: 16px;">
            <span style="background: rgba(59, 130, 246, 0.15); color: #60a5fa; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(59, 130, 246, 0.3);">
              COLLABORATION APPLICANT
            </span>
            <h2 style="color: #ffffff; font-size: 22px; margin-top: 12px; margin-bottom: 0;">New Developer Application Received 🚀</h2>
          </div>

          <table style="width: 100%; text-align: left; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <th style="padding: 10px 0; color: #71717a; font-size: 13px; width: 130px; border-bottom: 1px solid #18181b;">Applicant Name:</th>
              <td style="padding: 10px 0; color: #ffffff; font-size: 14px; font-weight: bold; border-bottom: 1px solid #18181b;">${safeName}</td>
            </tr>
            <tr>
              <th style="padding: 10px 0; color: #71717a; font-size: 13px; border-bottom: 1px solid #18181b;">Email Address:</th>
              <td style="padding: 10px 0; color: #60a5fa; font-size: 14px; border-bottom: 1px solid #18181b;">${safeEmail}</td>
            </tr>
            <tr>
              <th style="padding: 10px 0; color: #71717a; font-size: 13px; border-bottom: 1px solid #18181b;">Phone / WhatsApp:</th>
              <td style="padding: 10px 0; color: #34d399; font-size: 14px; font-weight: bold; border-bottom: 1px solid #18181b;">${safePhone}</td>
            </tr>
            <tr>
              <th style="padding: 10px 0; color: #71717a; font-size: 13px; border-bottom: 1px solid #18181b;">Primary Skill Set:</th>
              <td style="padding: 10px 0; color: #c084fc; font-size: 14px; font-weight: bold; border-bottom: 1px solid #18181b;">${safeRole}</td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <p style="color: #71717a; font-size: 13px; margin-bottom: 8px;">Portfolio / Profile Link:</p>
            <div style="padding: 16px; background: #18181b; border: 1px solid #27272a; border-radius: 12px;">
              <a href="${safePortfolio}" target="_blank" style="color: #60a5fa; text-decoration: underline; word-break: break-all; font-size: 14px;">
                ${safePortfolio}
              </a>
            </div>
          </div>

          <p style="margin-top: 30px; font-size: 12px; color: #52525b; text-align: center;">
            Sent from portfolio collaboration network system • Automated Alert
          </p>
        </div>
      `,
    });

    if (!adminMailResponse.ok) {
      const errLog = await adminMailResponse.text();
      console.error("Brevo API Admin Mail Dispatch Error:", errLog);
      return NextResponse.json(
        { success: false, error: "Failed to process application dispatch." },
        { status: 500 }
      );
    }

    // ==========================================
    // 2. APPLICANT AUTO-REPLY CONFIRMATION EMAIL
    // ==========================================
    await sendBrevoEmail({
      sender: {
        email: adminEmail,
        name: "Nitesh",
      },
      to: [{ email: email }],
      subject: "Application Received | Nitesh Developer Network ⚡",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 40px; background: #09090b; color: #ffffff; max-width: 600px; margin: 0 auto; border: 1px solid #27272a; border-radius: 16px;">
          <h2 style="color: #60a5fa; font-size: 22px; margin-bottom: 16px;">Hey ${safeName},</h2>
          
          <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
            Thank you for applying to join the dev collaboration network! Your profile as a <strong style="color: #ffffff;">${safeRole}</strong> has been received.
          </p>

          <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
            I regularly take on high-impact client projects and client gigs. I'll personally review your portfolio link (<a href="${safePortfolio}" style="color: #60a5fa; text-decoration: none;">Link</a>) and connect with you on WhatsApp/Phone (<strong style="color: #ffffff;">${safePhone}</strong>) whenever a matching opportunity comes up.
          </p>

          <div style="margin-top: 24px; padding: 16px; background: #18181b; border-left: 3px solid #3b82f6; border-radius: 6px; color: #71717a; font-size: 13px; line-height: 1.5;">
            "We value real-world execution, fair revenue sharing, and clean coding standards."
          </div>

          <p style="margin-top: 32px; border-top: 1px solid #27272a; padding-top: 20px; font-size: 14px; color: #a1a1aa;">
            Best Regards,<br/>
            <strong style="color: #ffffff; font-size: 15px;">Nitesh</strong><br/>
            <span style="font-size: 12px; color: #71717a;">Full-Stack Engineer & Project Lead</span>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Global API Collaborate Route Exception:", error);
    return NextResponse.json(
      { success: false, error: "Internal operational failure." },
      { status: 500 }
    );
  }
}