<template lang="html">
    <client-only>
        <div>
            <notifications
                group="success"
                :duration="2000"
                width="400"
                animation-name="fade-left"
                position="top right"
                class="row"
                type="success"
            >
                <template slot="body" slot-scope="props">
                    <div class="dj-notify successnotif" :class="props.item.className">
                        <DjLink class="dj-notify__close" @click="props.close">
                            <DjIcon class="icon icon-cross"></DjIcon>
                        </DjLink>
                        <div class="dj-notify__header">
                            <DjIcon large>mdi-check-circle-outline</DjIcon>
                            <span>{{ props.item.title }}</span>
                        </div>
                        <div class="dj-notify__content">
                            <p>{{ props.item.text }} {{ props.item.className }}</p>
                        </div>
                    </div>
                </template>
            </notifications>

            <notifications
                group="error"
                :duration="2000"
                width="400"
                animation-name="fade-left"
                position="top right"
                class="row"
                type="error"
            >
                <template slot="body" slot-scope="props">
                    <div class="dj-notify errornotif" :class="props.item.className">
                        <DjLink class="dj-notify__close" @click="props.close">
                            <DjIcon class="icon icon-cross"></DjIcon>
                        </DjLink>
                        <div class="dj-notify__header">
                            <DjIcon large class="test">mdi-close-circle-outline</DjIcon>
                            <span>{{ props.item.title }}</span>
                        </div>
                        <div class="dj-notify__content">
                            <p>{{ props.item.text }} {{ props.item.className }}</p>
                        </div>
                    </div>
                </template>
            </notifications>
        </div>
    </client-only>
</template>
<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
    name: 'Notify',
    components: {
        DjButton,
        DjIcon,
        DjLink,
    },
};
</script>

<style lang="scss">
.fade-left-enter-active,
.fade-left-leave-active,
.fade-left-move {
    transition: all 0.5s;
}

.fade-left-enter,
.fade-left-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>
