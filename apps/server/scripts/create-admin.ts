#!/usr/bin/env bun
import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { user } from "../src/db/schema/auth";

async function createAdmin() {
  const args = process.argv.slice(2);

  // Parse command line arguments
  const emailArg = args.find((arg) => arg.startsWith("--email="));
  const nameArg = args.find((arg) => arg.startsWith("--name="));

  const email = emailArg?.split("=")[1] || process.env.ADMIN_EMAIL;
  const name = nameArg?.split("=")[1] || process.env.ADMIN_NAME;

  if (!email) {
    console.error(`
❌ Missing required email parameter!

Usage:
  bun create-admin --email=admin@example.com --name="Admin Name"

Or set environment variables:
  ADMIN_EMAIL=admin@example.com
  ADMIN_NAME="Admin Name"
  bun create-admin

Example:
  bun create-admin --email=admin@mysite.com --name="Site Administrator"

Note: The user must already exist (signed up via /auth/login).
This script only promotes existing users to admin role.
		`);
    process.exit(1);
  }

  try {
    console.log(`🔐 Promoting user to admin: ${email}`);

    // Check if user exists
    const existingUser = await db.select().from(user).where(eq(user.email, email)).limit(1);

    if (existingUser.length === 0) {
      console.error(`❌ User with email ${email} does not exist!`);
      console.log("   First, the user needs to sign up at /auth/login");
      console.log("   Then run this command again to promote them to admin.");
      process.exit(1);
    }

    // Update user to admin role
    const updateData: { role: "admin"; name?: string } = { role: "admin" };
    if (name) {
      updateData.name = name;
    }

    await db.update(user).set(updateData).where(eq(user.email, email));

    console.log(`✅ Successfully promoted ${email} to admin role`);

    if (name) {
      console.log(`✅ Updated name to: ${name}`);
    }

    console.log("🎉 Admin user setup completed!");
    console.log("🔗 They can now login at: http://localhost:3001/auth/login");
    console.log("🏛️  Admin panel: http://localhost:3001/admin");
  } catch (error) {
    console.error("❌ Error promoting user to admin:", error);
    process.exit(1);
  }
}

createAdmin().then(() => process.exit(0));
