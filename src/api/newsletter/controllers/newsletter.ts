import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
})

export default {
  async subscribe(ctx) {
    const { email } = ctx.request.body

    if (!email) {
      return ctx.badRequest('Email is required')
    }

    try {
      await mailchimp.lists.addListMember(
        process.env.MAILCHIMP_AUDIENCE_ID!,
        {
          email_address: email,
          status: 'subscribed', // or 'pending' for double opt-in
        },
      )

      ctx.send({
        success: true,
        message: 'You’ve been subscribed successfully.',
      })
    } catch (err: any) {
      // Already subscribed
      if (err?.status === 400 && err?.response?.body?.title === 'Member Exists') {
        return ctx.send({
          success: true,
          message: 'You are already subscribed.',
        })
      }

      strapi.log.error('Mailchimp error', err)
      ctx.internalServerError('Subscription failed')
    }
  },
}
