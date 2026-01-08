export interface DjustApiResponse {
    content: any;
    warnings: DjustApiWarning[];
    errors: DjustApiException[];
}

export interface DjustApiWarning {
    code: string;
    message: string;
    field: string;
}

export interface DjustApiException {
    message: string;
    detail: string;
    code: string;
}


