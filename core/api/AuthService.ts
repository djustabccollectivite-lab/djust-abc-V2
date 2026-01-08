export default (axios: any) => ({
    login(userData: any) {
        return axios.post('/v1/auth/signin', userData, { headers: { roleType: 'CUSTOMER_USER' } });
    },

    APIGetUserAuthenticated(jwt: any) {
        return axios.get('/v1/authenticated-user', null, { headers: { Authorization: `Bearer ${jwt}` } });
    },

    APIGetUserAuthenticatedWithStore(jwt: any, storeId?: string, storeViewId?: string) {
        const headers: any = { Authorization: `Bearer ${jwt}` };
        if (storeId) {
            headers['dj-store'] = storeId;
            headers['dj-store-view'] = storeViewId;
        }
        return axios.get('/v1/authenticated-user', { headers });
    },

    /**
     * Api Forgot Password
     * @param  {any} request
     */
    APIForgotPassword(request: any, storeId?: string, storeViewId?: string) {
        return axios.post(
            '/auth/send-reset-password-email',
            request,
            storeId ? { headers: { 'dj-store': storeId, 'dj-store-view': storeViewId } } : null,
        );
    },

    /**
     * Api Reset Password
     * @param  {any} request
     */
    APIResetPassword(request: any, storeId?: string, storeViewId?: string) {
        return axios.post(
            '/auth/reset-password',
            {
                newPassword: request.newPassword,
                resetPasswordToken: request.token,
            },
            storeId ? { headers: { 'dj-store': storeId, 'dj-store-view': storeViewId } } : null,
        );
    },

    APIcreateAccount(data: any) {
        return axios.post('/public/v1/customer-accounts', data, { headers: { Accept: '*/*' } });
    },

    /**
     * Api Verify token
     * @param  {string} token
     */
    APIverifyToken(token: String) {
        return axios.get('/auth/is-token-valid?token=' + token, { headers: { Accept: '*/*' } });
    },
});
