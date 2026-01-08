<template lang="html">
    <section class="dj-newsletter">
        <div :class="layout === 'fullwidth' ? 'dj-container' : 'container'">
            <form class="dj-form--newsletter" action="do_action" method="post">
                <div class="row ma-0">
                    <div class="col-lg-5">
                        <div class="ps-form__left">
                            <div class="title__h3">
                                {{ $t('common.newsLetter.heading') }}
                            </div>
                            <p>
                                {{ $t('common.newsLetter.content') }}
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <div class="ps-form__right">
                            <div class="form-group--nest">
                                <input
                                    class="form-control"
                                    type="email"
                                    :placeholder="$t('common.newsLetter.placeholder')"
                                />
                                <DjButton :text="$t('common.subscribe')" styleButton="primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Newsletters',
    props: {
        layout: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped></style>
