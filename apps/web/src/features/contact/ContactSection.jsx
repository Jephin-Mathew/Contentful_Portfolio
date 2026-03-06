// /Users/jephin/React/portfolio/apps/web/src/features/contact/ContactSection.jsx

import { useMemo, useState } from "react";
import "./contact.css";

function normalizeList(list = []) {
  return Array.isArray(list) ? list.filter(Boolean) : [];
}

function sortByOrder(a, b) {
  return (a?.fields?.order ?? 0) - (b?.fields?.order ?? 0);
}

function buildMailto({ toEmail, name, email, subject, message }) {
  const finalSubject = subject?.trim() || "New message from portfolio";
  const bodyLines = [
    `Name: ${name || "-"}`,
    `Email: ${email || "-"}`,
    "",
    message || "",
  ];

  const params = new URLSearchParams({
    subject: finalSubject,
    body: bodyLines.join("\n"),
  });

  return `mailto:${toEmail}?${params.toString()}`;
}

export default function ContactSection({ entry }) {
  const f = entry?.fields ?? {};

  const eyebrow = f.eyebrow || "CONTACT";
  const headline = f.headline || "Let’s Work Together";
  const subHeadline = f.subHeadline || "";

  const getInTouchTitle = f.getInTouchTitle || "Get in Touch";
  const connectOnlineTitle = f.connectOnlineTitle || "Connect Online";

  const infoItems = useMemo(
    () => normalizeList(f.infoItems).slice().sort(sortByOrder),
    [f.infoItems]
  );

  const socialLinks = useMemo(
    () => normalizeList(f.socialLinks).slice().sort(sortByOrder),
    [f.socialLinks]
  );

  const formEntry = f.form?.fields ?? {};
  const formTitle = formEntry.title || "Send a Message";
  const toEmail = formEntry.toEmail || "jephinmathew916@gmail.com";

  // Form labels/placeholders (from Contentful)
  const nameLabel = formEntry.nameLabel || "NAME";
  const emailLabel = formEntry.emailLabel || "EMAIL";
  const subjectLabel = formEntry.subjectLabel || "SUBJECT";
  const messageLabel = formEntry.messageLabel || "MESSAGE";

  const namePlaceholder = formEntry.namePlaceholder || "John Doe";
  const emailPlaceholder = formEntry.emailPlaceholder || "john@example.com";
  const subjectPlaceholder = formEntry.subjectPlaceholder || "Project Inquiry, Collaboration, Hire...";
  const messagePlaceholder = formEntry.messagePlaceholder || "Tell me about your project, timeline, and budget...";

  const submitText = formEntry.submitText || "Send Message";
  const successMessage =
    formEntry.successMessage || "Thanks for reaching out! I’ll get back to you within 24 hours.";

  const footerNote = f.footerNote || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    // basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Please fill Name, Email, and Message." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", text: "" });

    // ✅ IMPORTANT:
    // Browser apps cannot send email directly to Gmail without a mail service or backend.
    // So we do:
    // 1) If you later add an API endpoint, we can POST to it.
    // 2) For now, fallback to mailto (opens user's mail app with pre-filled content).

    try {
      const mailto = buildMailto({ toEmail, name, email, subject, message });
      window.location.href = mailto;

      setStatus({ type: "success", text: successMessage });

      // optional: clear fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="contact section">
      <div className="contact__bg" aria-hidden="true">
        <div className="contact__glow contact__glow--left" />
        <div className="contact__glow contact__glow--right" />
        <div className="contact__vignette" />
      </div>

      <div className="section-inner contact__inner">
        {/* Header */}
        <div className="contact__header">
          <div className="contact__eyebrow">
            <span className="contact__dash" />
            <span>{eyebrow}</span>
          </div>

          <h1 className="contact__title">
            <span>{headline.split(" ").slice(0, 1).join(" ")} </span>
            <span className="contact__titleAccent">{headline.split(" ").slice(1).join(" ")}</span>
          </h1>

          {subHeadline ? <p className="contact__sub">{subHeadline}</p> : null}
        </div>

        {/* Grid */}
        <div className="contact__grid">
          {/* Left column */}
          <div className="contact__left">
            {/* Get in Touch card */}
            <div className="contactCard">
              <div className="contactCard__title">{getInTouchTitle}</div>

              <div className="contactCard__stack">
                {infoItems.map((it) => {
                  const x = it?.fields ?? {};
                  const label = x.label || "";
                  const value = x.value || "";
                  const href = x.href || "";
                  const iconKey = x.iconKey || "dot";

                  const Comp = (
                    <div className="contactItem">
                      <div className={`contactItem__icon contactItem__icon--${iconKey}`} />
                      <div className="contactItem__text">
                        <div className="contactItem__label">{label}</div>
                        <div className="contactItem__value">{value}</div>
                      </div>
                    </div>
                  );

                  return href ? (
                    <a className="contactItemLink" key={it.sys.id} href={href} target="_blank" rel="noreferrer">
                      {Comp}
                    </a>
                  ) : (
                    <div key={it.sys.id}>{Comp}</div>
                  );
                })}
              </div>
            </div>

            {/* Connect Online card */}
            <div className="contactCard">
              <div className="contactCard__title">{connectOnlineTitle}</div>

              <div className="contactCard__stack">
                {socialLinks.map((s) => {
                  const x = s?.fields ?? {};
                  const label = x.label || "";
                  const url = x.url || "#";
                  const handle = x.handle || "";
                  const iconKey = x.iconKey || "link";

                  return (
                    <a className="socialRow" key={s.sys.id} href={url} target="_blank" rel="noreferrer">
                      <div className={`socialRow__icon socialRow__icon--${iconKey}`} />
                      <div className="socialRow__text">
                        <div className="socialRow__label">{label}</div>
                        {handle ? <div className="socialRow__handle">{handle}</div> : null}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column: Form */}
          <div className="contact__right">
            <form className="formCard" onSubmit={onSubmit}>
              <div className="formCard__title">{formTitle}</div>

              <div className="formGrid">
                <div className="field">
                  <div className="field__label">{nameLabel}</div>
                  <input
                    className="field__input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={namePlaceholder}
                    autoComplete="name"
                  />
                </div>

                <div className="field">
                  <div className="field__label">{emailLabel}</div>
                  <input
                    className="field__input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={emailPlaceholder}
                    autoComplete="email"
                  />
                </div>

                <div className="field field--full">
                  <div className="field__label">{subjectLabel}</div>
                  <input
                    className="field__input"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={subjectPlaceholder}
                  />
                </div>

                <div className="field field--full">
                  <div className="field__label">{messageLabel}</div>
                  <textarea
                    className="field__textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={messagePlaceholder}
                    rows={6}
                  />
                </div>
              </div>

              {status.text ? (
                <div className={`formStatus formStatus--${status.type || "info"}`}>
                  {status.text}
                </div>
              ) : null}

              <button className="formBtn" type="submit" disabled={submitting}>
                {submitting ? "Sending..." : submitText}
                <span className="formBtn__arrow">➜</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer note */}
        {footerNote ? <div className="contact__footerNote">{footerNote}</div> : null}
      </div>
    </section>
  );
}