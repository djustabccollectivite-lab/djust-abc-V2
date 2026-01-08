import Service from '../api/Service';
import { SendMailRequest, CreateContactRequest, AddContactToListRequest } from '../interfaces/Brevo/IRequestBrevo';

export default (context: any) => ({
    sendEmail(params: SendMailRequest) {
        const result = Service(context)
            .brevo.APIsendEmail(params)
            .then((response) => {
                return response;
            })
            .catch(() => {});

        return result;
    },

    createContact(params: CreateContactRequest) {
        const result = Service(context)
            .brevo.APIcreateContact(params)
            .then((response) => {
                return response;
            })
            .catch(() => {});

        return result;
    },

    addContactsToList(params: AddContactToListRequest) {
        const result = Service(context)
            .brevo.APIaddContactsToList(params)
            .then((response) => {
                return response;
            })
            .catch(() => {});

        return result;
    },
});
