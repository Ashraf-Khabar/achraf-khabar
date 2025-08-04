import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

const DownloadCV = () => {
  const { t } = useLanguage();
  
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
    
    toast.success(t('cv.success'));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <Button
        onClick={handleDownload}
        size="lg"
        className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Download className="h-5 w-5" />
        {t('cv.download')}
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        className="gap-2"
        onClick={() => window.open("/cv-ashraf-khabar.pdf", "_blank")}
      >
        <FileText className="h-5 w-5" />
        {t('cv.view')}
      </Button>
    </div>
  );
};

export default DownloadCV;