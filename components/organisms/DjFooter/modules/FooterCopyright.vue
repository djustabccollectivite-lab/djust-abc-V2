<template lang="html">
    <div class="dj-footer__copyright">
        <p v-html="$t('footer.copyright')"></p>
        &nbsp
        <p>  v{{$config.version}} </p>
    </div>
</template>
<script>
export default {
    name: 'FooterCopyright',
};
</script>
