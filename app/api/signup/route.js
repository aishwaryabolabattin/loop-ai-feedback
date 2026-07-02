import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      password
    } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered.",
        },
        {
          status: 409,
        }
      );
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default Workspace (Change later if needed)
    const workspaceId = 1;

    // Create User
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "VIEWER",
        workspaceId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        workspaceId: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user: newUser,
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    console.error("Signup Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}