import type { Context } from '@nuxt/types';
import { GeneratePDFRequest } from '../interfaces/PdfGenerator/IRequestPdfGenerator';

export default (context: Context) => ({
    async APIgeneratePDF(parameters: GeneratePDFRequest): Promise<any> {
        const response = await fetch(`${context.$config.pdfGeneratorUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        });

        return response.blob();
    },
});
