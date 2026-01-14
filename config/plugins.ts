module.exports = ({ env }) => ({
  // Upload plugin configuration
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
  "strapi-csv-import-export": {
          config: {
            authorizedExports: ["api::machine.machine"],
            authorizedImports: ["api::machine.machine"]
  }
},
  'strapi-import-export': {
    enabled: true,
    config: {
      serverPublicHostname:  env('PUBLIC_URL', 'https://infinity-medicine-backend.onrender.com'),
    },
  },
});
