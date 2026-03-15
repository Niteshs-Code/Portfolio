export async function POST(req) {

  try {

    const { name, email, message } = await req.json();

    const apiKey = process.env.BREVO_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

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



    // EMAIL TO YOU
    await sendEmail({
      sender: {
        email: adminEmail,
        name: "Portfolio Contact"
      },
      to: [
        {
          email: adminEmail
        }
      ],
      subject: "🚀 New Portfolio Client Inquiry",
      htmlContent: `
      <div style="font-family:sans-serif;padding:40px;background:#0f172a;color:white">
        <h2 style="color:#38bdf8">New Client Message</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>

        <div style="margin-top:20px;padding:20px;background:#1e293b;border-radius:10px">
          ${message}
        </div>
      </div>
      `
    });



    // AUTO REPLY TO CLIENT
    await sendEmail({
      sender: {
        email: adminEmail,
        name: "Nitesh Kumar"
      },
      to: [
        {
          email
        }
      ],
      subject: "Thanks for contacting me 🚀",
      htmlContent: `
      <div style="font-family:sans-serif;padding:40px;background:#0f172a;color:white">
        <h2 style="color:#38bdf8">Thanks ${name}</h2>

        <p>I have received your message and will reply soon.</p>

        <div style="margin-top:20px;padding:20px;background:#1e293b;border-radius:10px">
          "${message}"
        </div>

        <p style="margin-top:20px">
        Best Regards<br/>
        <strong>Nitesh Kumar</strong>
        </p>
      </div>
      `
    });

    return Response.json({ success: true });

  } catch (error) {

    console.log(error);

    return Response.json({ success: false });

  }

}