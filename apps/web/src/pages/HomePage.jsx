import { useEffect, useState } from "react";
import { getHomePage, getSiteSettings } from "../services/contentful/api";

import HeroSection from "../features/home/HeroSection";
import ServicesSection from "../features/home/ServicesSection";
import ProjectsSection from "../features/home/ProjectsSection";
import SkillsSection from "../features/home/SkillsSection";
import ExperienceSection from "../features/home/ExperienceSection";

export default function HomePage() {
  const [home, setHome] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    Promise.all([
      getHomePage({ locale: "en-US" }),
      getSiteSettings({ locale: "en-US" }),
    ]).then(([homeRes, settingsRes]) => {
      setHome(homeRes);
      setSettings(settingsRes);
    });
  }, []);

  if (!home || !settings) return <div>Loading...</div>;

  const fields = home.fields;
  console.log("HOME fields:", fields);
console.log("skillGroups:", fields.skillGroups);

  return (
    <>
      <HeroSection heroEntry={fields.hero} siteSettings={settings} />
      

      <section className="section">
        <div className="section-inner">
          <ServicesSection title={fields.servicesTitle} data={fields.services} />
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <ProjectsSection
            title={fields.featuredProjectsTitle}
            data={fields.featuredProjects}
          />
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <SkillsSection title={fields.skillsTitle} data={fields.skillGroups} />
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <ExperienceSection
            title={fields.experienceTitle}
            data={fields.experiences}
          />
        </div>
      </section>
    </>
  );
}