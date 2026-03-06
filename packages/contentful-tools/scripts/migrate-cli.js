require("dotenv").config();
const { execSync } = require("node:child_process");
const path = require("node:path");

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENV = process.env.CONTENTFUL_ENV || "dev";

if (!SPACE_ID) {
  console.error("Missing CONTENTFUL_SPACE_ID in packages/contentful-tools/.env");
  process.exit(1);
}

const migrationFile = path.resolve(__dirname, "../migrations/001-init.js");

try {
  console.log(`Running migration via Contentful CLI on Space=${SPACE_ID}, Env=${ENV}`);
  execSync(
    `contentful space migration --space-id ${SPACE_ID} --environment-id ${ENV} ${migrationFile} --yes`,
    { stdio: "inherit" }
  );
  console.log("✅ Migration completed");
} catch (e) {
  process.exit(1);
}