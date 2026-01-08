<template lang="html">
    <div class="dj-contact-info">
        <div>
            <div class="dj-section__content">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div class="dj-block--contact-info">
                            <div class="title__h4">Informations de contact</div>
                            <p>
                                <a :href="'mailto:' + this.$config.email">
                                    {{ this.$config.email }}
                                </a>
                                <span>00.00.00.00.00</span>
                            </p>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div class="dj-block--contact-info">
                            <div class="title__h4">Adresse</div>
                            <p>
                                <span> Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </span>
                            </p>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div class="dj-block--contact-info">
                            <div class="title__h4">Service Clients</div>
                            <p>
                                <a href="#">{{ this.$config.email }}</a>
                                <span>00.00.00.00.00</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContactInfo',
};
</script>

<style lang="scss" scoped></style>
