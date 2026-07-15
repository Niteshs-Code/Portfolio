import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      authorName,
      authorImage,
      sectionName,
      title,
      bodyContent,
      expiryDuration,
      articleImage,
      phone,
      userEmail,
    } = await req.json();

    // 1. Strict Fallback Validation
    if (
      !authorName ||
      !authorImage ||
      !sectionName ||
      !title ||
      !bodyContent ||
      !phone ||
      !userEmail
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Email Regex Verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid email structure." },
        { status: 400 }
      );
    }

    // Phone Number Check
    const phoneRegex = /^[0-9+\s-]{10,20}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number structure." },
        { status: 400 }
      );
    }

    // 2. Strict Server-Side HTML Sanitization (Block Script/Markup Injection)
    const cleanString = (str) => {
      if (!str) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
    };

    const safeAuthorName = cleanString(authorName);
    const safeAuthorImage = cleanString(authorImage);
    const safeSectionName = cleanString(sectionName);
    const safeTitle = cleanString(title);
    const safeBodyContent = cleanString(bodyContent);
    const safeExpiry = cleanString(expiryDuration);
    const safeArticleImage = cleanString(articleImage) || "Not Provided";
    const safePhone = cleanString(phone);
    const safeEmail = cleanString(userEmail);

    const apiKey = process.env.BREVO_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!apiKey || !adminEmail) {
      console.error("Missing Environment Variables: BREVO_API_KEY or ADMIN_EMAIL");
      return NextResponse.json(
        { success: false, error: "Server misconfiguration." },
        { status: 500 }
      );
    }

    // Brevo Dispatch Helper Function
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
    // 1. ADMIN ALERT EMAIL (Aapke Inbox mein aayega)
    // ==========================================
    const adminMailRes = await sendBrevoEmail({
      sender: {
        email: adminEmail,
        name: "Editorial Portal",
      },
      to: [{ email: adminEmail }],
      subject: `📰 New Article Submission: "${safeTitle.substring(0, 30)}..." by ${safeAuthorName}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 40px; background: #09090b; color: #ffffff; max-width: 650px; margin: 0 auto; border: 1px solid #27272a; border-radius: 16px;">
          
          <div style="margin-bottom: 24px; border-bottom: 1px solid #27272a; padding-bottom: 16px;">
            <span style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(16, 185, 129, 0.3);">
              ARTICLE SUBMISSION DRAFT
            </span>
            <h2 style="color: #ffffff; font-size: 22px; margin-top: 12px; margin-bottom: 0;">New User Content Pending Approval 📝</h2>
          </div>

          <div style="display: flex; align-items: center; background: #18181b; padding: 16px; border-radius: 12px; border: 1px solid #27272a; margin-bottom: 24px;">
            <img src="${safeAuthorImage}" alt="${safeAuthorName}" style="width: 55px; height: 55px; border-radius: 50%; object-fit: cover; border: 2px solid #10b981; margin-right: 16px;" />
            <div>
              <h3 style="margin: 0; color: #ffffff; font-size: 16px;">${safeAuthorName}</h3>
              <p style="margin: 4px 0 0 0; color: #a1a1aa; font-size: 13px;">Email: <span style="color: #60a5fa;">${safeEmail}</span></p>
              <p style="margin: 2px 0 0 0; color: #a1a1aa; font-size: 13px;">Phone: <span style="color: #34d399;">${safePhone}</span></p>
            </div>
          </div>

          <table style="width: 100%; text-align: left; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <th style="padding: 10px 0; color: #71717a; font-size: 13px; width: 140px; border-bottom: 1px solid #18181b;">Category / Section:</th>
              <td style="padding: 10px 0; color: #a78bfa; font-size: 14px; font-weight: bold; border-bottom: 1px solid #18181b;">${safeSectionName}</td>
            </tr>
            <tr>
              <th style="padding: 10px 0; color: #71717a; font-size: 13px; border-bottom: 1px solid #18181b;">Article Title:</th>
              <td style="padding: 10px 0; color: #ffffff; font-size: 14px; font-weight: bold; border-bottom: 1px solid #18181b;">${safeTitle}</td>
            </tr>
            <tr>
              <th style="padding: 10px 0; color: #71717a; font-size: 13px; border-bottom: 1px solid #18181b;">Requested Lifespan:</th>
              <td style="padding: 10px 0; color: #f59e0b; font-size: 14px; font-weight: bold; border-bottom: 1px solid #18181b;">${safeExpiry}</td>
            </tr>
            <tr>
              <th style="padding: 10px 0; color: #71717a; font-size: 13px; border-bottom: 1px solid #18181b;">Banner Image URL:</th>
              <td style="padding: 10px 0; color: #60a5fa; font-size: 13px; border-bottom: 1px solid #18181b; word-break: break-all;">
                ${safeArticleImage !== "Not Provided" ? `<a href="${safeArticleImage}" target="_blank" style="color: #60a5fa;">${safeArticleImage}</a>` : "None"}
              </td>
            </tr>
          </table>

          <p style="color: #71717a; font-size: 13px; margin-bottom: 8px;">Article Draft Content Body:</p>
          <div style="padding: 20px; background: #18181b; border: 1px solid #27272a; border-radius: 12px; color: #d4d4d8; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${safeBodyContent}</div>

          <p style="margin-top: 30px; font-size: 12px; color: #52525b; text-align: center;">
            Sent from Community Article Submission System • Immediate Action Needed
          </p>
        </div>
      `,
    });

    if (!adminMailRes.ok) {
      const errLog = await adminMailRes.text();
      console.error("Brevo API Admin Mail Error:", errLog);
      return NextResponse.json(
        { success: false, error: "Failed to dispatch email to admin." },
        { status: 500 }
      );
    }

    // ==========================================
    // 2. APPLICANT AUTO-REPLY EMAIL (User Appreciation)
    // ==========================================
    await sendBrevoEmail({
      sender: {
        email: adminEmail,
        name: "Nitesh",
      },
      to: [{ email: userEmail }],
      subject: "Article Received & Under Review 🌟 | Nitesh",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 40px; background: #09090b; color: #ffffff; max-width: 600px; margin: 0 auto; border: 1px solid #27272a; border-radius: 16px;">
          <h2 style="color: #34d399; font-size: 22px; margin-bottom: 16px;">Hello ${safeAuthorName},</h2>
          
          <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
            Thank you for taking out time to write and share your thoughts on <strong style="color: #ffffff;">"${safeTitle}"</strong>. We really appreciate your effort and contribution!
          </p>

          <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
            Our editorial team is currently reviewing your content draft and formatting specs. Once approved, your article will be published live on the portal under the <span style="color: #a78bfa; font-weight: bold;">${safeSectionName}</span> section for your selected duration (${safeExpiry}).
          </p>

          <div style="margin-top: 24px; padding: 16px; background: #18181b; border-left: 3px solid #10b981; border-radius: 6px; color: #71717a; font-size: 13px; line-height: 1.5;">
            "We will send you a direct confirmation link via email as soon as your piece goes live."
          </div>

          <p style="margin-top: 32px; border-top: 1px solid #27272a; padding-top: 20px; font-size: 14px; color: #a1a1aa;">
            Best Regards,<br/>
            <strong style="color: #ffffff; font-size: 15px;">Nitesh</strong><br/>
            <span style="font-size: 12px; color: #71717a;">Founder & Platform Lead</span>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Global Submit Article Route Failure:", error);
    return NextResponse.json(
      { success: false, error: "Internal operational loop crash." },
      { status: 500 }
    );
  }
}