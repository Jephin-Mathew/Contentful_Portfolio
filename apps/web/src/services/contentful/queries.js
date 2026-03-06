// /Users/jephin/React/portfolio/apps/web/src/services/contentful/queries.js

export const SITE_SETTINGS_QUERY = {
  content_type: "siteSettings",
  limit: 1,
  include: 2,
};

export const HOME_PAGE_QUERY = {
  content_type: "homePage",
  "fields.internalName": "Homepage",
  include: 5,
  limit: 1,
};

export const ABOUT_PAGE_QUERY = {
  content_type: "aboutPage",
  include: 10,
  limit: 1,
};

export const CONTACT_PAGE_QUERY = {
  content_type: "contactPage",
  include: 10,
  limit: 1,
};

// Projects
export const PROJECTS_QUERY = {
  content_type: "project",
  include: 2,
  order: "fields.order",
};