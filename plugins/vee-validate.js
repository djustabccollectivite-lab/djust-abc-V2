import { extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages as messagesFR } from 'vee-validate/dist/locale/fr.json';
import { messages as messagesEN } from 'vee-validate/dist/locale/en.json';

export default ({ app }) => {
    const i18n = app.i18n.locale;
    let messages;
    switch (i18n) {
        case 'fr':
            messages = messagesFR;
            break;
        case 'en':
            messages = messagesEN;
            break;
        default:
            messages = messagesFR;
            break;
    }
    Object.keys(rules).forEach((rule) => {
        extend(rule, {
            ...rules[rule],
            message: messages[rule],
        });
    });

    extend('verify_password', {
        message:
            i18n === 'fr'
                ? `Le mot de passe doit contenir au moins 8 caractères dont 1 lettre majuscule, 1 lettre minuscule, 1 chiffre et 1 un caractère spécial`
                : `The password must contain at least: 8 characters including 1 uppercase letter, 1 lowercase letter, 1 number, at least one special character`,
        validate: (value) => {
            const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_.;,?:!@+#$%^&*\/-])(?=.{8,})/;
            return strongRegex.test(value);
        },
    });

    extend('confirmTrue', {
        params: ['target'],
        validate(value, { target }) {
            return value === true || target === true;
        },
        message:
            i18n === 'fr'
                ? `Vous devez sélectionner l'un des types d'adresse`
                : `You should select one of the address type`,
    });

    extend('emails_authorized', {
        params: ['emails'],
        validate(value, { emails }) {
            return emails.some((elt) => value.endsWith(elt));
        },
        message:
            i18n === 'fr' ? "L'adresse e-mail renseignée n'est pas autorisée" : 'This email address is not authorized',
    });
};

// A avoir
//   export default function ({ app }) {
//     configure({
//         defaultMessage: (field, values) => {
//             values._field_ = app.i18n.t(`${field}`);
//             return app.i18n.t(`validation.${values._rule_}`, values);
//         }
//     });
// }
