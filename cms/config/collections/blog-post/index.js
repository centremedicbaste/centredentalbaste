const blogPostsCollection = {
    label: 'Blog',
    name: 'blog',
    folder: 'src/es/blog',
    create: true,
    slug: '{{slug}}',
    fields: [
        { label: 'Permalink', name: 'permalink', widget: 'string' },
        { label: 'Meta title', name: 'metaTitle', widget: 'string' },
        { label: 'Meta description', name: 'metaDescription', widget: 'string' },
        { label: 'Meta keywords', name: 'metaKeywords', widget: 'string' },
        { label: 'Meta robots', name: 'metaRobots', widget: 'string' },
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Subtitle', name: 'subtitle', widget: 'string' },
        { label: 'Date', name: 'date', widget: 'datetime', required: false  },
        { label: 'Category', name: 'category', widget: 'string', required: false  },
        { label: 'Tags', name: 'tags', widget: 'list', default: ['post'] , required: false },
        { label: 'Image', name: 'image', widget: 'image' },
        { label: 'Image alt', name: 'imageAlt', widget: 'string', required: false  },
        { label: "Twitter", name: "social_twitter", widget: "string", required: false },
        { label: "LinkedIn", name: "social_linkedin", widget: "string", required: false },
        { label: "WhatsApp", name: "social_whatsapp", widget: "string", required: false },

        { label: 'Body', name: 'body', widget: 'markdown' }
    ],
};

export default blogPostsCollection;
