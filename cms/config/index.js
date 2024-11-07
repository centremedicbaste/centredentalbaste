// Import the configuration of each collection from cms/config/collections

import blogPostsCollection from "./collections/blog-post";

// Build the Netlify JS configuration object
const config = {
  locale: 'es',
  backend: {
    name: "git-gateway",
    repo: "website",
    branch: "main"
  },
  // It is not required to set `load_config_file` if the `config.yml` file is
  // missing, but will improve performance and avoid a load error.
  // For now we also load the yaml file and decap will merge the values
  load_config_file: true,
  media_library: {
    name: "cloudinary",
    config: {
      cloud_name: "XXXX",
      api_key: "XXXX"
    }
  },
  collections: [
    // Include the collections imported from cms/config/collections
    blogPostsCollection,
  ],
};

export default config;
