import { getEntries } from "../../services/contentful/api";

export async function fetchProjects(currentLocale) {
  return await getEntries({
    content_type: "project",
    locale: currentLocale,
    order: "-fields.publishDate"
  });
}