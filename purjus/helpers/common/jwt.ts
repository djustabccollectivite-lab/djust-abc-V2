interface JWTDecoded {
    header: any;
    payload: any;
    signature: string;
    isExpired: boolean;
}

export function decodeJWT(token: string): JWTDecoded {
    try {
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('Invalid JWT format');
        }

        const [headerB64, payloadB64, signature] = parts;

        const base64UrlDecode = (str: string): string => {
            str = str.replace(/-/g, '+').replace(/_/g, '/');
            str += '='.repeat((4 - (str.length % 4)) % 4);
            return atob(str);
        };

        const header = JSON.parse(base64UrlDecode(headerB64));
        const payload = JSON.parse(base64UrlDecode(payloadB64));

        const isExpired = payload.exp ? Date.now() >= payload.exp * 1000 : false;

        return {
            header,
            payload,
            signature,
            isExpired,
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        throw new Error('Failed to decode JWT: ' + errorMessage);
    }
}
