function sanitizeInput(input: string): string {
    return input.replace(/<[^>]+>/g, '').trim();
}

export default function ({ app }: any) {
    document.addEventListener('submit', function(event) {
        
        if (event.target instanceof HTMLFormElement) {
            for (let i = 0; i < event.target.elements.length; i++) {
                const element = event.target.elements[i];

                if ((element as HTMLInputElement).tagName === 'INPUT' && (element as HTMLInputElement).type === 'text' || (element as HTMLTextAreaElement).tagName === 'TEXTAREA') {
                    const sanitizedValue = sanitizeInput((element as HTMLInputElement).value);

                    (element as HTMLInputElement).value = sanitizedValue;
                }
            }
        }
    });
}
