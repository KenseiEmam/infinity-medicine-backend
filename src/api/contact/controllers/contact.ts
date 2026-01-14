export default {
  async submit(ctx) {
    const {
      clinicName,
      contactName,
      email,
      phone,
      country,
      interest,
      demoDate,
      notes,
    } = ctx.request.body

    if (!clinicName || !contactName || !email || !phone || !interest) {
      return ctx.badRequest('Missing required fields')
    }

    await strapi.plugin('email').service('email').send({
      to: process.env.CONTACT_TO_EMAIL,
      from: process.env.CONTACT_FROM_EMAIL,
      replyTo: email,
      subject: `New Demo Request – ${clinicName}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2>New Demo Request</h2>
          <table cellpadding="6">
            <tr><td><strong>Clinic</strong></td><td>${clinicName}</td></tr>
            <tr><td><strong>Contact</strong></td><td>${contactName}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
            <tr><td><strong>Country</strong></td><td>${country}</td></tr>
            <tr><td><strong>Product Interest</strong></td><td>${interest}</td></tr>
            ${
              demoDate
                ? `<tr><td><strong>Demo Date</strong></td><td>${demoDate}</td></tr>`
                : ''
            }
          </table>

          ${
            notes
              ? `<p><strong>Notes:</strong><br/>${notes}</p>`
              : ''
          }
        </div>
      `,
    })

    ctx.send({ ok: true })
  },
}
