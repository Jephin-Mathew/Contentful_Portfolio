// import { createClient } from "contentful";

// const {
//   VITE_CONTENTFUL_SPACE_ID,
//   VITE_CONTENTFUL_ENV,
//   VITE_CONTENTFUL_DELIVERY_TOKEN,
//   VITE_CONTENTFUL_PREVIEW_TOKEN,
//   VITE_CONTENTFUL_USE_PREVIEW
// } = import.meta.env;

// const isPreview = VITE_CONTENTFUL_USE_PREVIEW === "true";

// export const contentfulClient = createClient({
//   space: VITE_CONTENTFUL_SPACE_ID,
//   environment: VITE_CONTENTFUL_ENV,
//   accessToken: isPreview
//     ? VITE_CONTENTFUL_PREVIEW_TOKEN
//     : VITE_CONTENTFUL_DELIVERY_TOKEN,
//   host: isPreview ? "preview.contentful.com" : "cdn.contentful.com"
// });

import { createClient } from "contentful";

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const ENV_ID = import.meta.env.VITE_CONTENTFUL_ENV_ID;
const CDA_TOKEN = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN;
const CPA_TOKEN = import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN;

export function getClient({ preview = false } = {}) {
  return createClient({
    space: SPACE_ID,
    environment: ENV_ID,
    accessToken: preview ? CPA_TOKEN : CDA_TOKEN,
    host: preview ? "preview.contentful.com" : "cdn.contentful.com",
  });
}