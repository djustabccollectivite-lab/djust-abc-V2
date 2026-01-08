export interface SendMailRequest {
    clientId: string;
    templateId?: Number;
    sender: {
        email: String;
    };
    to: { email: String }[];
    cc?: { email: String }[];
    replyTo?: {
        email: String;
    };
    subject: String;
    htmlContent?: string;
    textContent?: string;
    params?: {
        nom: String;
        prenom: String;
        text: String;
    };
}

export interface CreateContactRequest {
    clientId: string;
    email: string;
}

export interface AddContactToListRequest {
    clientId: string;
    listId: string;
    emails: string[];
}
