export default () => ({
    isFeatureVisible(targetDate: string): boolean {
        return new Date(targetDate) <= new Date();
    },
});
