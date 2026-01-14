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

    // Respond immediately — DO NOT await email
    ctx.send({ ok: true })

    // Fire & forget email (prevents Render timeout)
    setImmediate(async () => {
      try {
        await strapi.plugin('email').service('email').send({
          to: process.env.CONTACT_TO_EMAIL,
          from: process.env.CONTACT_FROM_EMAIL,
          replyTo: email,
          subject: `New Demo Request – ${clinicName}`,
          html: `
            <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
              <h2 style="margin-bottom:12px">New Demo Request</h2>

              <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
                <tr><td><strong>Clinic</strong></td><td>${clinicName}</td></tr>
                <tr><td><strong>Contact</strong></td><td>${contactName}</td></tr>
                <tr><td><strong>Email</strong></td><td>${email}</td></tr>
                <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
                <tr><td><strong>Country</strong></td><td>${country || '-'}</td></tr>
                <tr><td><strong>Product Interest</strong></td><td>${interest}</td></tr>
                ${
                  demoDate
                    ? `<tr><td><strong>Demo Date</strong></td><td>${demoDate}</td></tr>`
                    : ''
                }
              </table>

              ${
                notes
                  ? `<p style="margin-top:12px"><strong>Notes:</strong><br/>${notes}</p>`
                  : ''
              }
            </div>
          `,
        })
      } catch (err) {
        strapi.log.error('Contact email failed', err)
      }
    })
  },
}
