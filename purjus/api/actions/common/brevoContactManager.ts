import type { Context } from '@nuxt/types';
import type { AxiosInstance } from 'axios';
import { ConnexionError } from '../../exeptions/ConnexionError';
import type { Form } from '~/purjus/interfaces/mailInterfaces';

type ContactCreated = {
    id: number;
};

export default (context: Context) => ({
    async createBrevoContact(parameters: { email: string }): Promise<ContactCreated> {
        const client: AxiosInstance = context.$purjus.mailClient;
        const response = await client.post<ContactCreated>(`/v3/contacts`, parameters);
        return response.data;
    },
    async createContactInMailList(parameters: { email: string; listId: number }): Promise<ContactCreated> {
        const client: AxiosInstance = context.$purjus.mailClient;
        const response = await client.post<ContactCreated>(`/v3/contacts/lists/${parameters.listId}/contacts/add`, {
            emails: [parameters.email],
        });
        return response.data;
    },
    async sendMail(parameters): Promise<Form> {
        const client: AxiosInstance = context.$purjus.mailClient;
        try {
            const response = await client.post<Form>(`/v3/smtp/email`, parameters);
            return response.data;
        } catch (error: any) {
            if (error.code === 'ECONNREFUSED') {
                throw new ConnexionError();
            }
            return error;
        }
    },
    async addContactToMailList(parameters: { email: string; listId: number }): Promise<void> {
        try {
            await this.createBrevoContact({ email: parameters.email });
            await this.createContactInMailList({
                email: parameters.email,
                listId: parameters.listId,
            });
        } catch (e) {
            try {
                await this.createContactInMailList({
                    email: parameters.email,
                    listId: parameters.listId,
                });
            } catch {
                throw new Error('Error while adding contact to mail list');
            }
        }
    },
});
