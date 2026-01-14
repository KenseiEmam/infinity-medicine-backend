module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
    },
  },

  'strapi-import-export': {
    enabled: true,
    config: {
      serverPublicHostname: env(
        'PUBLIC_URL',
        'https://infinity-medicine-backend.onrender.com'
      ),
    },
  },

  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: env('CONTACT_FROM_EMAIL'),
        defaultReplyTo: env('CONTACT_FROM_EMAIL'),
      },
    },
  },
})
