import service from '~/core/api/Service';

export default (ctx, inject) => {
    inject('services', service(ctx.$axios));
};
