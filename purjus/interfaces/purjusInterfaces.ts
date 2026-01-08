type PdaFileFailure = {
    id: string;
    qteCommandee: number;
    reason: string;
};

export interface PdaFileProcessResult {
    customerAccountId: string;
    name: string;
    success: string[];
    failures: PdaFileFailure[];
}
