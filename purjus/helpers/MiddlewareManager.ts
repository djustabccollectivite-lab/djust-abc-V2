import { Context } from '@nuxt/types';

class MiddlewareManager {
    // eslint-disable-next-line no-use-before-define
    private static instance: MiddlewareManager;
    private context: Context;
    private middlewareDefined: boolean;

    private constructor(context: Context) {
        this.context = context;
        this.middlewareDefined = false;
    }

    public static getInstance(context: Context): MiddlewareManager {
        if (!MiddlewareManager.instance) {
            MiddlewareManager.instance = new MiddlewareManager(context);
        }
        return MiddlewareManager.instance;
    }

    public defineRouteMiddleware(middlewareFunction?: Function): void {
        if (!this.middlewareDefined) {
            if (middlewareFunction) {
                this.context.app.router?.afterEach((to, from) => {
                    middlewareFunction(to, from);
                });
            }
            this.middlewareDefined = true;
        }
    }

    public redefineMiddleware(middlewareFunction?: () => void): void {
        this.middlewareDefined = false;
        this.defineRouteMiddleware(middlewareFunction);
    }
}

export default MiddlewareManager;
