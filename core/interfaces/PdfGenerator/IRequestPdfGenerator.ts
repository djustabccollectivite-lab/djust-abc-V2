export interface GeneratePDFRequest {
    client: string;
    template: string;
    data: any;
    displayHeaderFooter: boolean;
    directDownload: boolean;
}
