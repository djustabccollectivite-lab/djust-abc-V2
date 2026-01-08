<template>
    <footer class="dj-footer bg-black">
        <div class="abc-container py-6">
            <FooterWidgets/>
            <FooterCopyright/>
        </div>
    </footer>
</template>

<script>
import FooterWidgets from '@components/organisms/DjFooter/modules/FooterWidgets.vue';
import FooterCopyright from '@components/organisms/DjFooter/modules/FooterCopyright.vue';

export default {
    name: 'DjFooter',
    components: { FooterWidgets, FooterCopyright },
};
</script>
