/**
 * throws a `ConnexionError` if the response is not OK. This allows us to handle connection errors separately from other types of errors.
 */
export class ConnexionError extends Error {
    constructor() {
        super('Connexion refused');
        this.name = 'ConnexionError';
    }
}
