<template lang="html">
    <div class="dj-stat--block">
        <div class="dj-stat--block-header">
            <div class="title__h3 dj-stat--block-title">Bonjour {{ username }},</div>
            <p class="dj-stat--block-subTitle">
                Voici le récapitulatif de votre activité sur les <b>30</b> derniers jours :
            </p>
        </div>
        <div class="stats">
            <DjBlockStat class="ml-0" title="Commandes en cours" value="13" icon="icon-cart" position="horizontal" />
            <DjBlockStat title="Commandes expédiées" value="11" icon="icon-timer" position="horizontal" />
            <DjBlockStat title="Commandes en incident" value="5" icon="icon-truck" position="horizontal" />
            <DjBlockStat title="Achats" value="4 800,00 €" icon="icon-bag-dollar" position="horizontal" />
        </div>
    </div>
</template>

<script>
import DjBlockStat from '@components/molecules/DjBlockStat/DjBlockStat.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';

export default {
    name: 'CardStatics',
    components: { DjBlockStat, DjCard, DjIcon },
    computed: {
        username() {
            return this.$auth.user ? this.$auth.user.firstName : '';
        },
    },
};
</script>

<style lang="scss" scoped>
.horizontal {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    //padding: 20px;
}

@media screen and (max-width: 480) {
    .horizontal {
        display: initial !important;
    }
    .topSpace {
        margin-top: 75px;
    }
}
@media screen and (max-width: 768px) {
    .horizontal {
        display: initial !important;
    }
    .topSpace {
        margin-top: 75px;
    }
}

.dj-stat--block {
    padding-top: 60px;
}
.dj-stat--block-header {
    padding-bottom: 20px;
    .dj-stat--block-title {
        font-weight: 700;
        font-size: 25px;
        line-height: 32px;
        text-align: left;
        color: #040404;
    }
    .dj-stat--block-subTitle {
        margin-top: 8px;
        width: 100%;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: left;
        color: #040404;
    }
}

.stats {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 24px;
    @media (min-width: 640px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}
</style>
