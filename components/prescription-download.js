import IsFormProcessingSpinner from '@/components/components/isFormProcessingSpinner';
import { authToken } from '@/components/helpers/authToken';
import { doObjToFormData } from '@/components/helpers/helpers';
import http from '@/components/helpers/http';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ExportTransactionPdf({ prescrption_id }) {
    console.log("hi")
  const [isLoading, setIsLoading] = useState(false);

  // Format the current date and time
  const getFormattedDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

  // Function to download PDF
  const downloadPdf = async () => {
    setIsLoading(true);
    const fileName = `invoice-booking-${getFormattedDateTime()}.pdf`;

    try {
      // Make an HTTP request to generate the PDF
      const response = await http.post(`/generate-prescription/${prescrption_id}`, doObjToFormData({ token: authToken() }), {
        responseType: 'blob', // Ensures we handle binary data properly
      });
// console.log(response?.data)
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // Use the custom file name
      document.body.appendChild(a);
      a.click();

      // Cleanup
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success('PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to download PDF');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={downloadPdf} className="download_btn" disabled={isLoading}>
      <img src="/images/download.svg" /> {isLoading && <IsFormProcessingSpinner isProcessing={isLoading} />}
    </button>
  );
}