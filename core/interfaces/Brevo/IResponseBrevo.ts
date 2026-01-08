export interface SendMailResponse {
    success: boolean;
    message: string;
}

export interface CreateContactResponse {
    success: boolean;
    id: number;
}

export interface AddContactToListResponse {
    success: boolean;
    contacts: [success: string[], faillure: string[]];
}
