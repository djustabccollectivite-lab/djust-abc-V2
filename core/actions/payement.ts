export default (context: any) => ({
    IsActive(): boolean {
        return context.$config.payementIsActive ? true : false;
    },
});
