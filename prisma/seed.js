import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.feedback.deleteMany();
  await prisma.user.deleteMany();
  await prisma.workspace.deleteMany();

  // Create Workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: "Project LOOP Workspace",
    },
  });

  // Create Users
  const admin = await prisma.user.create({
    data: {
      name: "Aishwarya Bolabattin",
      email: "admin@projectloop.com",
      password: "admin123",
      role: "ADMIN",
      workspaceId: workspace.id,
    },
  });

  await prisma.user.create({
    data: {
      name: "Rahul Sharma",
      email: "analyst@projectloop.com",
      password: "analyst123",
      role: "ANALYST",
      workspaceId: workspace.id,
    },
  });

  await prisma.user.create({
    data: {
      name: "Viewer User",
      email: "viewer@projectloop.com",
      password: "viewer123",
      role: "VIEWER",
      workspaceId: workspace.id,
    },
  });

  // Create Feedback
  await prisma.feedback.createMany({
    data: [
      {
        message: "Excellent customer support and quick response.",
        sentiment: "POSITIVE",
        status: "RESOLVED",
        theme: "Support",
        channel: "Website",
        confidence: 0.98,
        summary: "Customer appreciated support.",
        workspaceId: workspace.id,
        userId: admin.id,
      },
      {
        message: "Delivery was delayed by three days.",
        sentiment: "NEGATIVE",
        status: "NEW",
        theme: "Delivery",
        channel: "Email",
        confidence: 0.95,
        summary: "Customer unhappy with delivery.",
        workspaceId: workspace.id,
        userId: admin.id,
      },
      {
        message: "Product quality is excellent.",
        sentiment: "POSITIVE",
        status: "RESOLVED",
        theme: "Quality",
        channel: "Website",
        confidence: 0.97,
        summary: "Customer liked product quality.",
        workspaceId: workspace.id,
        userId: admin.id,
      },
      {
        message: "The mobile app crashes frequently.",
        sentiment: "NEGATIVE",
        status: "IN_PROGRESS",
        theme: "Application",
        channel: "Mobile App",
        confidence: 0.96,
        summary: "Crash issue reported.",
        workspaceId: workspace.id,
        userId: admin.id,
      },
      {
        message: "Pricing is reasonable compared to competitors.",
        sentiment: "POSITIVE",
        status: "RESOLVED",
        theme: "Pricing",
        channel: "Website",
        confidence: 0.93,
        summary: "Customer satisfied with pricing.",
        workspaceId: workspace.id,
        userId: admin.id,
      },
      {
        message: "Packaging arrived damaged.",
        sentiment: "NEGATIVE",
        status: "NEW",
        theme: "Packaging",
        channel: "Courier",
        confidence: 0.94,
        summary: "Packaging damaged during delivery.",
        workspaceId: workspace.id,
        userId: admin.id,
      },
    ],
  });

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });