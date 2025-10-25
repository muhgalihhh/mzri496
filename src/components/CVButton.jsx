import { motion } from 'framer-motion';
import { useState } from 'react';

// Fungsi untuk download CV yang sudah ada
const downloadCV = () => {
  // Dispatch event untuk reset navigation state
  window.dispatchEvent(new CustomEvent('externalLinkClicked'));

  // Ganti dengan path file CV Anda (sesuaikan dengan lokasi file CV)
  const cvPath = '/cv.pdf'; // atau '/assets/cv/my-cv.pdf' atau path lainnya

  // Membuat link download
  const link = document.createElement('a');
  link.href = cvPath;
  link.download = 'CV_YourName.pdf'; // Nama file yang akan didownload
  link.target = '_blank';

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Component dengan button download
const CVDownloadButton = ({ theme }) => {
  return (
    <motion.button
      className={`px-6 py-3 font-medium transition-all duration-300 border rounded-xl hover:scale-105 ${theme.buttonPrimary} ${theme.border}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={downloadCV}
    >
      <span className={`flex items-center gap-2 ${theme.textPrimary}`}>
        <i className="bx bx-download"></i>
        Download CV
      </span>
    </motion.button>
  );
};

// Atau jika ingin dengan loading state
const CVDownloadButtonWithLoading = ({ theme }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      // Simulasi delay atau proses download
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Panggil fungsi download
      downloadCV();
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal mendownload CV');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.button
      className={`px-6 py-3 font-medium transition-all duration-300 border rounded-xl hover:scale-105 ${theme.buttonPrimary} ${theme.border} ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={{ scale: isDownloading ? 1 : 1.05 }}
      whileTap={{ scale: isDownloading ? 1 : 0.95 }}
      onClick={handleDownload}
      disabled={isDownloading}
    >
      <span className={`flex items-center gap-2 ${theme.textPrimary}`}>
        {isDownloading ? (
          <>
            <i className="bx bx-loader bx-spin"></i>
            Downloading...
          </>
        ) : (
          <>
            <i className="bx bx-download"></i>
            Download CV
          </>
        )}
      </span>
    </motion.button>
  );
};

export default CVDownloadButton;
