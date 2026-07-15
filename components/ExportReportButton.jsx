"use client";

import { useState } from "react";

export default function ExportReportButton({ reportId, reportTitle }) {
  const [exporting, setExporting] = useState(false);

  async function exportReport() {
    try {
      setExporting(true);

      /*
       * Load PDF libraries only in
       * the browser.
       */

      const html2canvasModule = await import("html2canvas");

      const jsPDFModule = await import("jspdf");

      const html2canvas = html2canvasModule.default;

      const jsPDF = jsPDFModule.default;

      /*
       * Find the report container.
       */

      const reportElement = document.getElementById(reportId);

      if (!reportElement) {
        throw new Error("Report content was not found.");
      }

      /*
       * Wait for fonts and page
       * content to finish loading.
       */

      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      /*
       * Move the browser to the top
       * before creating the image.
       */

      const previousScrollPosition = window.scrollY;

      window.scrollTo({
        top: 0,
        behavior: "instant",
      });

      /*
       * Convert the report HTML
       * into one high-quality image.
       */

      const canvas = await html2canvas(reportElement, {
        scale: 2,

        useCORS: true,

        allowTaint: false,

        logging: false,

        backgroundColor: "#FFFFFF",

        scrollX: 0,

        scrollY: 0,

        windowWidth: reportElement.scrollWidth,

        windowHeight: reportElement.scrollHeight,
      });

      /*
       * Restore the user's original
       * scroll position.
       */

      window.scrollTo({
        top: previousScrollPosition,

        behavior: "instant",
      });

      /*
       * Check whether html2canvas
       * created valid content.
       */

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error("The report could not be converted into a PDF.");
      }

      /*
       * Create an A4 portrait PDF.
       */

      const pdf = new jsPDF({
        orientation: "portrait",

        unit: "mm",

        format: "a4",

        compress: true,
      });

      /*
       * A4 dimensions.
       */

      const pageWidth = pdf.internal.pageSize.getWidth();

      const pageHeight = pdf.internal.pageSize.getHeight();

      /*
       * PDF margins.
       */

      const margin = 8;

      const printableWidth = pageWidth - margin * 2;

      const printableHeight = pageHeight - margin * 2;

      /*
       * Calculate the image height
       * while maintaining its
       * original aspect ratio.
       */

      const scaledImageHeight = (canvas.height * printableWidth) / canvas.width;

      /*
       * Convert the complete report
       * into an image.
       */

      const imageData = canvas.toDataURL("image/jpeg", 0.95);

      /*
       * Add the report image to
       * the first PDF page.
       */

      let imagePosition = margin;

      pdf.addImage(
        imageData,

        "JPEG",

        margin,

        imagePosition,

        printableWidth,

        scaledImageHeight,

        undefined,

        "FAST",
      );

      /*
       * Calculate the report height
       * that remains after page one.
       */

      let remainingHeight = scaledImageHeight - printableHeight;

      /*
       * Add additional pages only
       * when content remains.
       *
       * The 1-mm tolerance prevents
       * an unnecessary blank page.
       */

      while (remainingHeight > 1) {
        pdf.addPage();

        imagePosition = margin - (scaledImageHeight - remainingHeight);

        pdf.addImage(
          imageData,

          "JPEG",

          margin,

          imagePosition,

          printableWidth,

          scaledImageHeight,

          undefined,

          "FAST",
        );

        remainingHeight -= printableHeight;
      }

      /*
       * Remove a final blank page
       * if one was accidentally
       * created.
       */

      const totalPages = pdf.getNumberOfPages();

      if (totalPages > 1 && remainingHeight < -printableHeight) {
        pdf.deletePage(totalPages);
      }

      /*
       * Create a safe file name.
       */

      const safeTitle = (reportTitle || "Voice-of-Customer-Report")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      /*
       * Save the PDF.
       */

      pdf.save(`${safeTitle}.pdf`);
    } catch (error) {
      console.error("PDF export error:", error);

      alert(error.message || "The report could not be exported.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={exportReport}
      disabled={exporting}
      style={{
        ...exportButton,

        opacity: exporting ? 0.65 : 1,

        cursor: exporting ? "not-allowed" : "pointer",
      }}
    >
      {exporting ? "⏳ Creating PDF..." : "📥 Export PDF"}
    </button>
  );
}

const exportButton = {
  padding: "13px 20px",

  border: "none",

  borderRadius: "11px",

  background: "#4F46E5",

  color: "#FFFFFF",

  fontSize: "14px",

  fontWeight: "800",

  boxShadow: "0 6px 15px rgba(79, 70, 229, 0.20)",

  transition: "0.2s",
};
