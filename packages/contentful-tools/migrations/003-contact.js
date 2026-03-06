module.exports = function (migration) {
  /**
   * CONTACT PAGE MODEL (based on your Figma)
   * - Left: Get in Touch items + Connect Online links
   * - Right: Contact form config
   * - Bottom: availability note
   *
   * RULES:
   * - Localize user-facing text
   * - Keep URLs, hrefs, order non-localized
   */

  // -------------------------
  // 1) Contact Info Item (Email/Phone/Location)
  // -------------------------
  const contactInfoItem = migration
    .createContentType("contactInfoItem")
    .name("Contact Info Item")
    .description("Row item like EMAIL / PHONE / LOCATION")
    .displayField("label");

  contactInfoItem
    .createField("label")
    .name("Label (e.g., EMAIL)")
    .type("Symbol")
    .localized(true)
    .required(true);

  contactInfoItem
    .createField("value")
    .name("Value (e.g., jephin@example.com)")
    .type("Symbol")
    .localized(true)
    .required(true);

  contactInfoItem
    .createField("href")
    .name("Href (optional: mailto/tel)")
    .type("Symbol")
    .validations([{ regexp: { pattern: "^(mailto:|tel:|https?:\\/\\/|\\/).+" } }]);

  contactInfoItem
    .createField("iconKey")
    .name("Icon Key (email/phone/location)")
    .type("Symbol");

  contactInfoItem
    .createField("order")
    .name("Order")
    .type("Integer");

  // -------------------------
  // 2) Contact Social Link (GitHub/LinkedIn/Twitter)
  // -------------------------
  const contactSocialLink = migration
    .createContentType("contactSocialLink")
    .name("Contact Social Link")
    .description("Connect Online row like GitHub + handle + url")
    .displayField("label");

  contactSocialLink
    .createField("label")
    .name("Label (e.g., GitHub)")
    .type("Symbol")
    .localized(true)
    .required(true);

  contactSocialLink
    .createField("url")
    .name("URL")
    .type("Symbol")
    .required(true)
    .validations([{ regexp: { pattern: "^https?:\\/\\/.+" } }]);

  contactSocialLink
    .createField("handle")
    .name("Handle / Display Text (optional)")
    .type("Symbol")
    .localized(true);

  contactSocialLink
    .createField("iconKey")
    .name("Icon Key (github/linkedin/twitter)")
    .type("Symbol");

  contactSocialLink
    .createField("order")
    .name("Order")
    .type("Integer");

  // -------------------------
  // 3) Contact Form Config
  // -------------------------
  const contactFormConfig = migration
    .createContentType("contactFormConfig")
    .name("Contact Form Config")
    .description("Labels/placeholders/button/success message + receiver email")
    .displayField("title");

  contactFormConfig
    .createField("title")
    .name("Title (e.g., Send a Message)")
    .type("Symbol")
    .localized(true)
    .required(true);

  contactFormConfig
    .createField("toEmail")
    .name("To Email (receiver)")
    .type("Symbol")
    .required(true)
    .validations([{ regexp: { pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" } }]);

  // Labels
  contactFormConfig
    .createField("nameLabel")
    .name("Name Label")
    .type("Symbol")
    .localized(true);

  contactFormConfig
    .createField("emailLabel")
    .name("Email Label")
    .type("Symbol")
    .localized(true);

  contactFormConfig
    .createField("subjectLabel")
    .name("Subject Label")
    .type("Symbol")
    .localized(true);

  contactFormConfig
    .createField("messageLabel")
    .name("Message Label")
    .type("Symbol")
    .localized(true);

  // Placeholders
  contactFormConfig
    .createField("namePlaceholder")
    .name("Name Placeholder")
    .type("Symbol")
    .localized(true);

  contactFormConfig
    .createField("emailPlaceholder")
    .name("Email Placeholder")
    .type("Symbol")
    .localized(true);

  contactFormConfig
    .createField("subjectPlaceholder")
    .name("Subject Placeholder")
    .type("Symbol")
    .localized(true);

  contactFormConfig
    .createField("messagePlaceholder")
    .name("Message Placeholder")
    .type("Text")
    .localized(true);

  contactFormConfig
    .createField("submitText")
    .name("Submit Button Text")
    .type("Symbol")
    .localized(true);

  contactFormConfig
    .createField("successMessage")
    .name("Success Message")
    .type("Text")
    .localized(true);

  // -------------------------
  // 4) Contact Page (Singleton container)
  // -------------------------
  const contactPage = migration
    .createContentType("contactPage")
    .name("Contact Page")
    .description("Contact page container")
    .displayField("internalName");

  contactPage
    .createField("internalName")
    .name("Internal Name")
    .type("Symbol")
    .required(true);

  contactPage
    .createField("eyebrow")
    .name("Eyebrow (e.g., CONTACT)")
    .type("Symbol")
    .localized(true);

  contactPage
    .createField("headline")
    .name("Headline")
    .type("Symbol")
    .localized(true)
    .required(true);

  contactPage
    .createField("subHeadline")
    .name("Subheadline")
    .type("Text")
    .localized(true);

  contactPage
    .createField("getInTouchTitle")
    .name("Get In Touch Title")
    .type("Symbol")
    .localized(true);

  contactPage
    .createField("connectOnlineTitle")
    .name("Connect Online Title")
    .type("Symbol")
    .localized(true);

  contactPage
    .createField("infoItems")
    .name("Info Items")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["contactInfoItem"] }],
    });

  contactPage
    .createField("socialLinks")
    .name("Social Links")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["contactSocialLink"] }],
    });

  contactPage
    .createField("form")
    .name("Form Config")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["contactFormConfig"] }]);

  contactPage
    .createField("footerNote")
    .name("Footer Note (availability)")
    .type("Text")
    .localized(true);
};