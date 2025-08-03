import { eq } from "drizzle-orm";
import { db } from ".";
import { user } from "./schema/auth";

async function seed() {
	try {
		console.log("🌱 Starting database seeding...");

		// Check if admin user already exists
		const existingAdmin = await db
			.select()
			.from(user)
			.where(eq(user.role, "admin"))
			.limit(1);

		if (existingAdmin.length > 0) {
			console.log("✅ Admin user already exists, skipping seed");
			return;
		}

		// Get admin email from environment
		const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";

		// Check if user with admin email already exists
		const existingUser = await db
			.select()
			.from(user)
			.where(eq(user.email, adminEmail))
			.limit(1);

		if (existingUser.length > 0) {
			// Update existing user to admin
			await db
				.update(user)
				.set({ role: "admin" })
				.where(eq(user.email, adminEmail));

			console.log(`✅ Updated existing user ${adminEmail} to admin role`);
		} else {
			console.log(`ℹ️  No existing user found with email: ${adminEmail}`);
			console.log("ℹ️  To create an admin user:");
			console.log("   1. First sign up normally at /auth/login");
			console.log(`   2. Then run: bun create-admin --email=${adminEmail}`);
		}

		console.log("🎉 Database seeding completed!");

	} catch (error) {
		console.error("❌ Error seeding database:", error);
		process.exit(1);
	}
}

// Run seed if called directly
if (require.main === module) {
	seed().then(() => process.exit(0));
}

export { seed };