import { jsPDF as JsPDF } from 'jspdf';

// Example of options: {
//   project: 'Auchan',
//   template: 'invoice',
//   filename: 'invoiceExport || invoiceExport.pdf',
//   margin: [10, 10, 10, 10],
//   x: 0,
//   y: 0,
//   width: 190,
//   windowWidth: 860,
// }
//
// This is the structure of the templates folder:
//
// ├── PdfGenerator.ts
// └── pdfTemplates
//     └── {project}
//         └── {template}
//             ├── {staticFile}.twig
//             ├── {staticFile}.twig
//             ├── {staticFile}.twig
//             └── {staticFile}.twig
interface PdfGeneratorOptions {
    project: string | null;
    template: string | null;
    filename: string;
    margin: number[];
    x: number;
    y: number;
    width: number;
    windowWidth: number;
}

const A4_DEFAULT_OPTIONS: PdfGeneratorOptions = {
    project: null,
    template: null,
    filename: 'file',
    margin: [10, 10, 10, 10],
    x: 0,
    y: 0,
    width: 190,
    windowWidth: 860,
};

/**
 * PdfGenerator
 * @class
 * @classdesc Generate PDF from twig template
 * @example
 * const pdfGenerator = new PdfGenerator();
 * pdfGenerator
 *    .declareOptions({
 *       project: 'Auchan',
 *      template: 'invoice',
 *     filename: 'invoiceExport',
 *   })
 * .declareStaticFiles(['logo'])
 * .generate({
 *   invoice: {
 *    number: '2020-0001',
 *  },
 *  customer: {
 *   name: 'John Doe',
 *  },
 *  supplier: {
 *  name: 'My Company',
 *  },
 * });
 */
class PdfGenerator {
    doc: JsPDF;
    html: string;
    staticFiles: string[];
    options: PdfGeneratorOptions;
    context: {
        static: Object;
    };

    constructor(
        orientation?: 'p' | 'portrait' | 'l' | 'landscape',
        unit?: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc',
        format?: string | number[],
        compressPdf?: boolean,
    ) {
        this.doc = new JsPDF(orientation, unit, format, compressPdf);
        this.html = '';
        this.staticFiles = [];
        this.context = {
            static: {},
        };
        this.options = A4_DEFAULT_OPTIONS;
    }

    /**
     * declareOptions
     * @param {PdfGeneratorOptions} options
     * @returns {PdfGenerator}
     * @example
     * pdfGenerator.declareOptions({
     *  project: 'Auchan',
     *  template: 'invoice',
     *  filename: 'invoiceExport',
     * });
     */
    declareOptions(options: PdfGeneratorOptions) {
        this.options = {
            ...this.options,
            ...options,
        };
        return this;
    }

    /**
     * declareStaticFiles
     * @param {string[]} staticFiles
     * @returns {PdfGenerator}
     * @example
     * pdfGenerator.declareStaticFiles(['logo', 'logo2']);
     * //can also be imported with .twig extension
     */
    declareStaticFiles(staticFiles: string[]) {
        this.staticFiles = staticFiles;
        return this;
    }

    /**
     * generate
     * @param {Object} values
     * @returns {Promise<void>}
     * @example
     * pdfGenerator.generate({
     *  invoice: {
     *   number: '2020-0001',
     *  },
     *  customer: {
     *   name: 'John Doe',
     *  },
     * });
     */
    async generate(values: Object) {
        const base = (await import(`./pdfTemplates/${this.options.project}/${this.options.template}/base.twig`))
            .default;
        for (const file of this.staticFiles) {
            const twigStaticFile = await import(
                `./pdfTemplates/${this.options.project}/${this.options.template}/${file}${
                    file.endsWith('.twig') ? '' : '.twig'
                }`
            );
            this.context.static[file] = twigStaticFile.default;
        }
        this.context = {
            ...this.context,
            ...values,
        };
        this.html = base(this.context);
        const downloadDoc = this.doc.html(this.html, {
            callback: (doc) => {
                doc.save(`${this.options.filename}${this.options.filename.endsWith('.pdf') ? '' : '.pdf'}`);
            },
            margin: this.options.margin,
            autoPaging: 'text',
            x: this.options.x,
            y: this.options.y,
            width: this.options.width,
            windowWidth: this.options.windowWidth,
        });
        return downloadDoc;
    }
}

export default () => ({
    PdfGenerator,
});
