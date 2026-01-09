module.exports = ({ env }) => ({
  // Upload plugin configuration
  upload: {
    config: {
      provider: 'local', // use the local provider
      providerOptions: {
        sizeLimit: 100000000, // optional: max file size in bytes (100 MB here)
      },
      actionOptions: {
        upload: {
          // optional: configure upload behavior
        },
        delete: {},
      },
      // Force all uploads into ./public/uploads
      localServer: {
        maxAge: 3600000, // cache age in ms for serving files
        path: 'public/uploads', // all uploaded files go here
      },
    },
  },
});
