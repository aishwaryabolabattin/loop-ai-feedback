import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  request,
  { params }
) {
  try {
    // Next.js 16 route parameters

    const { id } = await params;

    const reportId = Number(id);

    console.log(
      "Requested report ID:",
      reportId
    );

    // Check whether the ID is valid

    if (
      !Number.isInteger(reportId) ||
      reportId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid Voice-of-Customer report ID.",
        },
        {
          status: 400,
        }
      );
    }

    // Find the report using only its ID

    const report =
      await prisma.vocReport.findUnique({
        where: {
          id: reportId,
        },
      });

    console.log(
      "Report found:",
      report
    );

    // Report does not exist

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          error:
            `Voice-of-Customer report with ID ${reportId} was not found.`,
        },
        {
          status: 404,
        }
      );
    }

    // Return the report

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error(
      "Report details API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error.message ||
          "The report could not be loaded.",
      },
      {
        status: 500,
      }
    );
  }
}