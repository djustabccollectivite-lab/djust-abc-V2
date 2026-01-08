export default function ({ store, redirect }) {
    if (!store.state.suppliers.currentSupplier) {
        return redirect('/auth/login');
    }
}
