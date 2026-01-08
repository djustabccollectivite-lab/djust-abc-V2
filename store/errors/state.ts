import type { ErrorLine } from './interfaces';

const state = (): { errors: { [key: string]: ErrorLine[] } } => ({
    errors: {},
});

export default state;
