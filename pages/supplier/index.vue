<template lang="">
    <div>
        <h1>Supplier Page in Default Th</h1>
    </div>
</template>
<script>
export default {
    name: 'SupplierDefault',
    auth: process.env.store_type === 'private' ? null : false,
    layout(context) {
        return context.store.state.app.layoutType;
    },
    transition() {
        return 'fadeIn';
    },
};
</script>
<style lang=""></style>
