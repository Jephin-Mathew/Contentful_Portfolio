import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getSiteSettings } from "../services/contentful/api";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function MainLayout() {
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        const settings = await getSiteSettings({ locale: "en-US" });
        if (!alive) return;
        setSiteSettings(settings ?? null);
      } catch (error) {
        console.error("Failed to load site settings:", error);
      }
    }

    run();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <Navbar siteSettings={siteSettings} />
      <Outlet />
      <Footer siteSettings={siteSettings} />
    </>
  );
}