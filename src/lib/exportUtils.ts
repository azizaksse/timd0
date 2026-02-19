import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

// CSV export helper
export const exportToCSV = (filename: string, headers: string[], rows: string[][]) => {
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

// PDF export: captures a DOM element as image
export const exportElementToPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#f9fafb",
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("landscape", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let y = 10;
  if (imgHeight <= pageHeight - 20) {
    pdf.addImage(imgData, "PNG", 10, y, imgWidth, imgHeight);
  } else {
    // Multi-page
    let remainingHeight = canvas.height;
    let srcY = 0;
    const sliceRatio = (pageHeight - 20) / imgWidth * canvas.width / canvas.height;

    while (remainingHeight > 0) {
      const sliceHeight = Math.min(remainingHeight, canvas.height * sliceRatio);
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceHeight;
      const ctx = sliceCanvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(canvas, 0, srcY, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
        const sliceImg = sliceCanvas.toDataURL("image/png");
        const sliceImgH = (sliceHeight * imgWidth) / canvas.width;
        if (srcY > 0) pdf.addPage();
        pdf.addImage(sliceImg, "PNG", 10, 10, imgWidth, sliceImgH);
      }
      srcY += sliceHeight;
      remainingHeight -= sliceHeight;
    }
  }

  pdf.save(`${filename}.pdf`);
};

// PDF export with table data
export const exportTableToPDF = (
  filename: string,
  title: string,
  headers: string[],
  rows: string[][]
) => {
  const pdf = new jsPDF("portrait", "mm", "a4");
  pdf.setFontSize(16);
  pdf.text(title, 14, 20);
  pdf.setFontSize(10);
  pdf.setTextColor(150);
  pdf.text(`Exporté le ${new Date().toLocaleDateString("fr-FR")}`, 14, 28);

  autoTable(pdf, {
    startY: 35,
    head: [headers],
    body: rows,
    theme: "grid",
    headStyles: { fillColor: [124, 58, 237], fontSize: 9 },
    bodyStyles: { fontSize: 8 },
    alternateRowStyles: { fillColor: [249, 250, 251] },
  });

  pdf.save(`${filename}.pdf`);
};
