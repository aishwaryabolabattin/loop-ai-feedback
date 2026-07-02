import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Hash passwords
  const adminPassword = await bcrypt.hash("admin123", 10);
  const analystPassword = await bcrypt.hash("analyst123", 10);
  const viewerPassword = await bcrypt.hash("viewer123", 10);

  // Workspace
  const workspace = await prisma.workspace.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      id: 1,
      name: "Project LOOP Workspace",
    },
  });

  console.log("✅ Workspace Ready");

  // Admin
  const admin = await prisma.user.upsert({
    where: {
      email: "admin@loop.dev",
    },
    update: {},
    create: {
      name: "Aishwarya",
      email: "admin@loop.dev",
      password: adminPassword,
      role: "ADMIN",
      workspaceId: workspace.id,
    },
  });

  // Analyst
  const analyst = await prisma.user.upsert({
    where: {
      email: "analyst@loop.dev",
    },
    update: {},
    create: {
      name: "Nasiroddin",
      email: "analyst@loop.dev",
      password: analystPassword,
      role: "ANALYST",
      workspaceId: workspace.id,
    },
  });

  // Viewer
  const viewer = await prisma.user.upsert({
    where: {
      email: "viewer@loop.dev",
    },
    update: {},
    create: {
      name: "Viewer User",
      email: "viewer@loop.dev",
      password: viewerPassword,
      role: "VIEWER",
      workspaceId: workspace.id,
    },
  });

  console.log("✅ Users Ready");

  // Check if feedback already exists
  const feedbackCount = await prisma.feedback.count();

  if (feedbackCount === 0) {
    await prisma.feedback.createMany({
      data: [
        {
          message: "Excellent customer support.",
          sentiment: "POSITIVE",
          status: "NEW",
          theme: "Support",
          channel: "Email",
          workspaceId: workspace.id,
          userId: admin.id,
        },
        {
          message: "Delivery was delayed.",
          sentiment: "NEGATIVE",
          status: "REVIEW",
          theme: "Delivery",
          channel: "Website",
          workspaceId: workspace.id,
          userId: analyst.id,
        },
        {
          message: "Application UI is very clean.",
          sentiment: "POSITIVE",
          status: "ACTIONED",
          theme: "UI",
          channel: "Mobile",
          workspaceId: workspace.id,
          userId: viewer.id,
        },
      ],
    });

    console.log("✅ Feedback Created");
  } else {
    console.log("ℹ️ Feedback already exists");
  }

  console.log("🎉 Database Seeded Successfully");
}

main()
  .catch((e) => {
    console.error("❌ Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });