import { Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DownloadPdfButton() {
  const download = async () => {
    const element = document.getElementById("resume-preview");

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("ResumeIQ.pdf");
  };

  return (
    <Button
      variant="contained"
      sx={{ mt: 3 }}
      onClick={download}
    >
      Download PDF
    </Button>
  );
}
