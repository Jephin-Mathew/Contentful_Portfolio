
import { useEffect, useState } from "react";
import { getAboutPage, getSiteSettings } from "../services/contentful/api";

import AboutHero from "../features/about/AboutHero";
import ProficiencySection from "../features/about/ProficiencySection";
import AboutGridSection from "../features/about/AboutGridSection";

import "../features/about/about.css";

export default function AboutPage() {
  const [aboutEntry, setAboutEntry] = useState(null);
  const [siteSettings, setSiteSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        setLoading(true);

        const [about, settings] = await Promise.all([
          getAboutPage({ locale: "en-US" }),
          getSiteSettings({ locale: "en-US" }),
        ]);

        if (!alive) return;

        console.log("ABOUT entry:", about);

        setAboutEntry(about ?? null);
        setSiteSettings(settings ?? null);

        if (!about) {
          setError(
            "About page content not found. Check AboutPage entry is published in this environment and query filter matches internalName."
          );
        }
      } catch (e) {
        console.error(e);
        if (!alive) return;
        setError("Failed to load About page content.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <div className="section-inner" style={{ padding: 80 }}>Loading About...</div>;
  if (error) return <div className="section-inner" style={{ padding: 80 }}>{error}</div>;
  if (!aboutEntry) return <div className="section-inner" style={{ padding: 80 }}>No About entry.</div>;

  const about = aboutEntry.fields;

  return (
    <main className="aboutPage">
      <AboutHero heroEntry={about.hero} siteSettings={siteSettings} />

      <ProficiencySection title={about.proficiencyTitle} items={about.proficiencyItems} />

      <AboutGridSection
        educationTitle={about.educationTitle}
        educationItems={about.educationItems}
        languagesTitle={about.languagesTitle}
        languages={about.languages}
        highlightNote={about.highlightNote}
      />
    </main>
  );
}