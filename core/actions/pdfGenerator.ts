import Service from '../api/Service';
import { GeneratePDFRequest } from '../interfaces/PdfGenerator/IRequestPdfGenerator';

export default (context: any) => ({
    generatePDF(params: GeneratePDFRequest) {
        const result = Service(context)
            .pdfGenerator.APIgeneratePDF(params)
            .then((response: any) => {
                return response;
            })
            .catch(() => {});

        return result;
    },
});
