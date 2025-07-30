import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DownloadCV = () => {
  const handleDownload = () => {
    // You can replace this with your actual CV file path
    const cvUrl = "/cv-ashraf-khabar.pdf"; // Place your CV in the public folder
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV-Ashraf-Khabar.pdf';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("CV téléchargé avec succès!");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <Button
        onClick={handleDownload}
        size="lg"
        className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Download className="h-5 w-5" />
        Télécharger CV
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        className="gap-2"
        onClick={() => window.open("/cv-ashraf-khabar.pdf", "_blank")}
      >
        <FileText className="h-5 w-5" />
        Voir CV en ligne
      </Button>
    </div>
  );
};

export default DownloadCV;