// /Users/jephin/React/portfolio/apps/web/src/pages/ContactPage.jsx

import { useEffect, useState } from "react";
import { getContactPage } from "../services/contentful/api";

import ContactSection from "../features/contact/ContactSection";
import "../features/contact/contact.css";

export default function ContactPage() {
  const [contactEntry, setContactEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        setLoading(true);
        const contact = await getContactPage({ locale: "en-US" });

        if (!alive) return;

        setContactEntry(contact ?? null);

        if (!contact) {
          setError(
            "Contact page content not found. Make sure your Contact Page entry is published in this environment and internalName = 'Contact Page'."
          );
        }
      } catch (e) {
        console.error(e);
        if (!alive) return;
        setError("Failed to load Contact page content.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <div className="section-inner" style={{ padding: 80 }}>Loading Contact...</div>;
  if (error) return <div className="section-inner" style={{ padding: 80 }}>{error}</div>;
  if (!contactEntry) return <div className="section-inner" style={{ padding: 80 }}>No Contact entry.</div>;

  return (
    <main className="contactPage">
      <ContactSection entry={contactEntry} />
    </main>
  );
}