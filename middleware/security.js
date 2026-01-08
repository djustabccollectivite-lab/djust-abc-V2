// eslint-disable-next-line @typescript-eslint/no-var-requires
const helmet = require('helmet');

const helmetMiddleware = helmet({
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
});

module.exports = function (req, res, next) {
    helmetMiddleware(req, res, () => {
        res.setHeader('Permissions-Policy', 'geolocation=(self), microphone=(self), camera=(self)');
        res.setHeader('Content-Security-Policy', 'block-all-mixed-content; upgrade-insecure-requests');

        if (process.env.THEME === 'eiffage') {
            res.setHeader('Cross-Origin-Resource-Policy', 'same-origin-allow-popups');
            res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
        }
        // veja
        if (process.env.NUXT_ENV_TITLE?.toLowerCase() === 'veja' && process.env.APPLICATION_ENV !== 'prod') {
            res.removeHeader('Strict-Transport-Security');
            res.removeHeader('Content-Security-Policy');
        }

        if (process.env.THEME === 'cofaq') {
            const allowedIframeOrigin = process.env.ALLOWED_IFRAME_ORIGIN || "'self'";
            res.setHeader('Content-Security-Policy', `frame-ancestors ${allowedIframeOrigin}`);
        }
        next();
    });
};
