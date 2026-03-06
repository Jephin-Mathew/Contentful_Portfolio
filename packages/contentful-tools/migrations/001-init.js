module.exports = function (migration) {
  /**
   * ENTERPRISE NOTES:
   * - Localize only user-facing text fields (en-US + ar)
   * - Keep URLs, slugs, booleans, ordering NOT localized
   * - Use Reference fields to keep sections modular
   * - Validations added where it makes sense (basic enterprise hygiene)
   */

  // -------------------------
  // 1) Site Settings (Singleton)
  // -------------------------
  const siteSettings = migration
    .createContentType("siteSettings")
    .name("Site Settings")
    .description("Global site configuration: navbar, footer, social links, SEO defaults")
    .displayField("siteName");

  siteSettings
    .createField("siteName")
    .name("Site Name")
    .type("Symbol")
    .localized(true)
    .required(true);

siteSettings
  .createField("availabilityLabel")
  .name("Availability Label")
  .type("Symbol")
  .localized(true);

  siteSettings
    .createField("logo")
    .name("Logo")
    .type("Link")
    .linkType("Asset");

  siteSettings
    .createField("primaryCtaText")
    .name("Primary CTA Text")
    .type("Symbol")
    .localized(true);

  siteSettings
    .createField("primaryCtaUrl")
    .name("Primary CTA URL")
    .type("Symbol")
    .validations([{ regexp: { pattern: "^(https?:\\/\\/|\\/).+" } }]);

  siteSettings
    .createField("footerText")
    .name("Footer Text")
    .type("Text")
    .localized(true);

  // Social links as a simple JSON object list (enterprise-friendly for small sites)
  // Example value: [{"label":"LinkedIn","url":"https://..."},{"label":"GitHub","url":"https://..."}]
  siteSettings
    .createField("socialLinks")
    .name("Social Links (JSON array)")
    .type("Object");

  // -------------------------
  // 2) Stat Item
  // -------------------------
  const statItem = migration
    .createContentType("statItem")
    .name("Stat Item")
    .description("Small metric on hero section, e.g., 5+ Projects Shipped")
    .displayField("label");

  statItem
    .createField("value")
    .name("Value (e.g., 5)")
    .type("Integer")
    .required(true);

  statItem
    .createField("suffix")
    .name("Suffix (e.g., +)")
    .type("Symbol")
    .localized(true);

  statItem
    .createField("label")
    .name("Label (e.g., Projects Shipped)")
    .type("Symbol")
    .localized(true)
    .required(true);

  statItem
    .createField("order")
    .name("Order")
    .type("Integer");

  // -------------------------
  // 3) Hero Section
  // -------------------------
  const heroSection = migration
    .createContentType("heroSection")
    .name("Hero Section")
    .description("Homepage hero section content")
    .displayField("headline");

  heroSection
    .createField("headline")
    .name("Headline (Your name)")
    .type("Symbol")
    .localized(true)
    .required(true);

  heroSection
    .createField("subHeadline")
    .name("Sub-headline (Role)")
    .type("Symbol")
    .localized(true);

  heroSection
    .createField("description")
    .name("Description")
    .type("Text")
    .localized(true);

  heroSection
    .createField("primaryButtonText")
    .name("Primary Button Text")
    .type("Symbol")
    .localized(true);

  heroSection
    .createField("primaryButtonUrl")
    .name("Primary Button URL")
    .type("Symbol")
    .validations([{ regexp: { pattern: "^(https?:\\/\\/|\\/).+" } }]);

  heroSection
    .createField("secondaryButtonText")
    .name("Secondary Button Text")
    .type("Symbol")
    .localized(true);

  heroSection
    .createField("secondaryButtonUrl")
    .name("Secondary Button URL")
    .type("Symbol")
    .validations([{ regexp: { pattern: "^(https?:\\/\\/|\\/).+" } }]);

  heroSection
    .createField("heroVisual")
    .name("Hero Visual / Illustration")
    .type("Link")
    .linkType("Asset");

  heroSection
    .createField("stats")
    .name("Stats")
    .type("Array")
    .items({ type: "Link", linkType: "Entry", validations: [{ linkContentType: ["statItem"] }] });

  // -------------------------
  // 4) Service Item (What I Do)
  // -------------------------
  const serviceItem = migration
    .createContentType("serviceItem")
    .name("Service Item")
    .description("Service card used in What I Do section")
    .displayField("title");

  serviceItem
    .createField("title")
    .name("Title")
    .type("Symbol")
    .localized(true)
    .required(true);

  serviceItem
    .createField("description")
    .name("Description")
    .type("Text")
    .localized(true);

  // Keep icon as a string (bootstrap icon name / custom key)
  serviceItem
    .createField("iconKey")
    .name("Icon Key (e.g., 'code', 'cloud', 'shop')")
    .type("Symbol");

  serviceItem
    .createField("order")
    .name("Order")
    .type("Integer");

  // -------------------------
  // 5) Project
  // -------------------------
  const project = migration
    .createContentType("project")
    .name("Project")
    .description("Portfolio project card")
    .displayField("title");

  project
    .createField("title")
    .name("Title")
    .type("Symbol")
    .localized(true)
    .required(true);

  project
    .createField("clientOrCategory")
    .name("Client / Category")
    .type("Symbol")
    .localized(true);

  project
    .createField("thumbnail")
    .name("Thumbnail")
    .type("Link")
    .linkType("Asset");

  // Array of tech badges (React, Laravel, MySQL, etc.)
  project
    .createField("techStack")
    .name("Tech Stack (badges)")
    .type("Array")
    .items({ type: "Symbol" });

  project
    .createField("websiteUrl")
    .name("Website URL")
    .type("Symbol")
    .validations([{ regexp: { pattern: "^https?:\\/\\/.+" } }]);

  project
    .createField("featured")
    .name("Featured")
    .type("Boolean")
    .required(false);

  project
    .createField("order")
    .name("Order")
    .type("Integer");

  // -------------------------
  // 6) Skill Group (Technical Expertise)
  // -------------------------
  const skillGroup = migration
    .createContentType("skillGroup")
    .name("Skill Group")
    .description("Skills grouped by category: Frontend, Backend, CMS, etc.")
    .displayField("category");

  skillGroup
    .createField("category")
    .name("Category")
    .type("Symbol")
    .localized(true)
    .required(true);

  skillGroup
    .createField("skills")
    .name("Skills (badges)")
    .type("Array")
    .items({ type: "Symbol" });

  skillGroup
    .createField("order")
    .name("Order")
    .type("Integer");

  // -------------------------
  // 7) Experience Item (Work Experience)
  // -------------------------
  const experienceItem = migration
    .createContentType("experienceItem")
    .name("Experience Item")
    .description("Work experience card/timeline item")
    .displayField("jobTitle");

  experienceItem
    .createField("jobTitle")
    .name("Job Title")
    .type("Symbol")
    .localized(true)
    .required(true);

  experienceItem
    .createField("company")
    .name("Company")
    .type("Symbol")
    .required(true);

  experienceItem
    .createField("employmentType")
    .name("Employment Type (Full-time, Internship, etc.)")
    .type("Symbol")
    .localized(true);

  experienceItem
    .createField("startDate")
    .name("Start Date")
    .type("Date");

  experienceItem
    .createField("endDate")
    .name("End Date")
    .type("Date");

  experienceItem
    .createField("isCurrent")
    .name("Currently Working Here")
    .type("Boolean");

  experienceItem
    .createField("description")
    .name("Description")
    .type("Text")
    .localized(true);

  experienceItem
    .createField("order")
    .name("Order")
    .type("Integer");

  // -------------------------
  // 8) Home Page (Singleton)
  // -------------------------
  const homePage = migration
    .createContentType("homePage")
    .name("Home Page")
    .description("Homepage container that references all homepage sections")
    .displayField("internalName");

  homePage
    .createField("internalName")
    .name("Internal Name")
    .type("Symbol")
    .required(true);

  homePage
    .createField("hero")
    .name("Hero Section")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["heroSection"] }]);

  homePage
    .createField("servicesTitle")
    .name("Services Title (e.g., What I Do)")
    .type("Symbol")
    .localized(true);

  homePage
    .createField("services")
    .name("Services")
    .type("Array")
    .items({ type: "Link", linkType: "Entry", validations: [{ linkContentType: ["serviceItem"] }] });

  homePage
    .createField("featuredProjectsTitle")
    .name("Featured Projects Title")
    .type("Symbol")
    .localized(true);

  homePage
    .createField("featuredProjects")
    .name("Featured Projects")
    .type("Array")
    .items({ type: "Link", linkType: "Entry", validations: [{ linkContentType: ["project"] }] });

  homePage
    .createField("skillsTitle")
    .name("Skills Title (e.g., Technical Expertise)")
    .type("Symbol")
    .localized(true);

  homePage
    .createField("skillGroups")
    .name("Skill Groups")
    .type("Array")
    .items({ type: "Link", linkType: "Entry", validations: [{ linkContentType: ["skillGroup"] }] });

  homePage
    .createField("experienceTitle")
    .name("Experience Title (e.g., Work Experience)")
    .type("Symbol")
    .localized(true);

  homePage
    .createField("experiences")
    .name("Experiences")
    .type("Array")
    .items({ type: "Link", linkType: "Entry", validations: [{ linkContentType: ["experienceItem"] }] });
};