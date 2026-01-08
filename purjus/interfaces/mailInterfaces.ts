export interface Form {
    sender: {
        email: String;
    };
    to: { email: String }[];
    replyTo: {
        email: String;
    };
    subject: String;
    templateId: Number;
    params: {
        nom: String;
        prenom: String;
        text: String;
    };
}
