export class ApiError extends Error {
    constructor() {
        super('API Error');
        this.name = 'ApiError';
    }
}
