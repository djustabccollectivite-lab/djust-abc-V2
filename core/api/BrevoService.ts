import type { Context } from '@nuxt/types';
import { SendMailRequest, CreateContactRequest, AddContactToListRequest } from '../interfaces/Brevo/IRequestBrevo';
import { SendMailResponse, CreateContactResponse, AddContactToListResponse } from '../interfaces/Brevo/IResponseBrevo';

export default (context: Context) => ({
    async APIsendEmail(parameters: SendMailRequest): Promise<SendMailResponse> {
        const response = await fetch(`${context.$config.sendMailBaseUrl}/api/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        });

        return response.json();
    },

    async APIcreateContact(parameters: CreateContactRequest): Promise<CreateContactResponse> {
        const response = await fetch(`${context.$config.sendMailBaseUrl}/api/create-contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        });

        return response.json();
    },

    async APIaddContactsToList(parameters: AddContactToListRequest): Promise<AddContactToListResponse> {
        const response = await fetch(`${context.$config.sendMailBaseUrl}/api/add-contacts-to-list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        });

        return response.json();
    },
});
