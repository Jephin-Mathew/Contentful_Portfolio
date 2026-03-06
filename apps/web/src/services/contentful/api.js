// /Users/jephin/React/portfolio/apps/web/src/services/contentful/api.js

import { getClient } from "./client";
import {
  HOME_PAGE_QUERY,
  SITE_SETTINGS_QUERY,
  PROJECTS_QUERY,
  ABOUT_PAGE_QUERY,
  CONTACT_PAGE_QUERY, // ✅ add
} from "./queries";

// ✅ Generic helper
export async function fetchEntries(query, { locale = "en-US", preview = false } = {}) {
  const client = getClient({ preview });

  return client.getEntries({
    ...query,
    locale,
  });
}

export async function getHomePage({ locale = "en-US", preview = false } = {}) {
  const res = await fetchEntries(HOME_PAGE_QUERY, { locale, preview });
  return res.items?.[0] || null;
}

export async function getSiteSettings({ locale = "en-US", preview = false } = {}) {
  const res = await fetchEntries(SITE_SETTINGS_QUERY, { locale, preview });
  return res.items?.[0] || null;
}

export async function getProjects({ locale = "en-US", preview = false } = {}) {
  const res = await fetchEntries(PROJECTS_QUERY, { locale, preview });
  return res.items || [];
}

export async function getAboutPage({ locale = "en-US", preview = false } = {}) {
  const res = await fetchEntries(ABOUT_PAGE_QUERY, { locale, preview });
  return res.items?.[0] || null;
}

// ✅ Add Contact Page getter
export async function getContactPage({ locale = "en-US", preview = false } = {}) {
  const res = await fetchEntries(CONTACT_PAGE_QUERY, { locale, preview });
  return res.items?.[0] || null;
}