module.exports = function (migration) {
  /**
   * ABOUT PAGE MODEL (based on your Figma)
   * - About Hero (image + headline + bio + CTAs + quick stats)
   * - Value cards (Clean Code, Performance, etc.)
   * - Technical Proficiency (progress bars)
   * - Education
   * - Languages
   * - About Page singleton container
   *
   * RULES:
   * - Localize user-facing text
   * - Keep order, booleans, URLs non-localized
   */

  // -------------------------
  // 1) About Value Card (4 cards)
  // -------------------------
  const aboutValueCard = migration
    .createContentType("aboutValueCard")
    .name("About Value Card")
    .description("Small cards like Clean Code / Performance First etc.")
    .displayField("title");

  aboutValueCard
    .createField("title")
    .name("Title")
    .type("Symbol")
    .localized(true)
    .required(true);

  aboutValueCard
    .createField("description")
    .name("Description")
    .type("Text")
    .localized(true);

  aboutValueCard
    .createField("iconKey")
    .name("Icon Key (optional)")
    .type("Symbol");

  aboutValueCard
    .createField("order")
    .name("Order")
    .type("Integer");

  // -------------------------
  // 2) About Hero Section
  // -------------------------
  const aboutHeroSection = migration
    .createContentType("aboutHeroSection")
    .name("About Hero Section")
    .description("Top section in About page")
    .displayField("headline");

  aboutHeroSection
    .createField("eyebrow")
    .name("Eyebrow (e.g., ABOUT ME)")
    .type("Symbol")
    .localized(true);

  aboutHeroSection
    .createField("headline")
    .name("Headline")
    .type("Symbol")
    .localized(true)
    .required(true);

  aboutHeroSection
    .createField("subHeadline")
    .name("Sub Headline (optional)")
    .type("Text")
    .localized(true);

  // main body text (multi paragraph)
  aboutHeroSection
    .createField("bio")
    .name("Bio (rich text)")
    .type("RichText")
    .localized(true);

  aboutHeroSection
    .createField("photo")
    .name("Photo / Visual")
    .type("Link")
    .linkType("Asset");

  // small badge like "2+ Years Experience"
  aboutHeroSection
    .createField("badgeValue")
    .name("Badge Value (e.g., 2+)")
    .type("Symbol")
    .localized(true);

  aboutHeroSection
    .createField("badgeLabel")
    .name("Badge Label (e.g., Years Experience)")
    .type("Symbol")
    .localized(true);

  // CTAs
  aboutHeroSection
    .createField("primaryButtonText")
    .name("Primary Button Text (Download CV)")
    .type("Symbol")
    .localized(true);

  aboutHeroSection
    .createField("primaryButtonUrl")
    .name("Primary Button URL")
    .type("Symbol")
    .validations([{ regexp: { pattern: "^(https?:\\/\\/|\\/).+" } }]);

  aboutHeroSection
    .createField("secondaryButtonText")
    .name("Secondary Button Text (Get in Touch)")
    .type("Symbol")
    .localized(true);

  aboutHeroSection
    .createField("secondaryButtonUrl")
    .name("Secondary Button URL")
    .type("Symbol")
    .validations([{ regexp: { pattern: "^(https?:\\/\\/|\\/).+" } }]);

  // value cards (4)
  aboutHeroSection
    .createField("valueCards")
    .name("Value Cards")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["aboutValueCard"] }],
    });

  // -------------------------
  // 3) Technical Proficiency Item (progress bars)
  // -------------------------
  const proficiencyItem = migration
    .createContentType("proficiencyItem")
    .name("Proficiency Item")
    .description("Progress bar row like Laravel/PHP 92%")
    .displayField("label");

  proficiencyItem
    .createField("label")
    .name("Label (e.g., Laravel / PHP)")
    .type("Symbol")
    .localized(true)
    .required(true);

  proficiencyItem
    .createField("percentage")
    .name("Percentage (0-100)")
    .type("Integer")
    .required(true)
    .validations([{ range: { min: 0, max: 100 } }]);

  proficiencyItem
    .createField("colorKey")
    .name("Color Key (optional: red/blue/green/purple etc.)")
    .type("Symbol");

  proficiencyItem
    .createField("order")
    .name("Order")
    .type("Integer");

  // -------------------------
  // 4) Education Item
  // -------------------------
  const educationItem = migration
    .createContentType("educationItem")
    .name("Education Item")
    .description("Education card like BSc Computer Science")
    .displayField("degree");

  educationItem
    .createField("degree")
    .name("Degree")
    .type("Symbol")
    .localized(true)
    .required(true);

  educationItem
    .createField("institution")
    .name("Institution")
    .type("Symbol")
    .localized(true);

  educationItem
    .createField("fromYear")
    .name("From Year")
    .type("Integer");

  educationItem
    .createField("toYear")
    .name("To Year")
    .type("Integer");

  educationItem
    .createField("description")
    .name("Description")
    .type("Text")
    .localized(true);

  educationItem
    .createField("order")
    .name("Order")
    .type("Integer");

  // -------------------------
  // 5) Language Item
  // -------------------------
  const languageItem = migration
    .createContentType("languageItem")
    .name("Language Item")
    .description("Language row like English - Professional")
    .displayField("name");

  languageItem
    .createField("name")
    .name("Language Name")
    .type("Symbol")
    .localized(true)
    .required(true);

  languageItem
    .createField("level")
    .name("Level (Native/Professional/Conversational)")
    .type("Symbol")
    .localized(true);

  languageItem
    .createField("badgeText")
    .name("Badge Text (optional)")
    .type("Symbol")
    .localized(true);

  languageItem
    .createField("iconKey")
    .name("Icon Key (optional: flag/emoji key)")
    .type("Symbol");

  languageItem
    .createField("order")
    .name("Order")
    .type("Integer");

  // -------------------------
  // 6) About Page (Singleton container)
  // -------------------------
  const aboutPage = migration
    .createContentType("aboutPage")
    .name("About Page")
    .description("About page container that references all about sections")
    .displayField("internalName");

  aboutPage
    .createField("internalName")
    .name("Internal Name")
    .type("Symbol")
    .required(true);

  // hero
  aboutPage
    .createField("hero")
    .name("About Hero Section")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["aboutHeroSection"] }]);

  // proficiency section title
  aboutPage
    .createField("proficiencyTitle")
    .name("Proficiency Title (e.g., Technical Proficiency)")
    .type("Symbol")
    .localized(true);

  aboutPage
    .createField("proficiencyItems")
    .name("Proficiency Items")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["proficiencyItem"] }],
    });

  // education section title
  aboutPage
    .createField("educationTitle")
    .name("Education Title")
    .type("Symbol")
    .localized(true);

  aboutPage
    .createField("educationItems")
    .name("Education Items")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["educationItem"] }],
    });

  // languages section title
  aboutPage
    .createField("languagesTitle")
    .name("Languages Title")
    .type("Symbol")
    .localized(true);

  aboutPage
    .createField("languages")
    .name("Languages")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["languageItem"] }],
    });

  // optional bottom note (like your “Worked with international clients…” strip)
  aboutPage
    .createField("highlightNote")
    .name("Highlight Note")
    .type("Text")
    .localized(true);
};