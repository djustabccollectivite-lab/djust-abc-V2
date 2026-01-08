<template lang="html">
    <div class="dj-block--stat" :class="position === 'horizontal' ? 'dj-block--stat--horizontal' : ''">
        <div class="dj-block__left">
            <span>
                <i :class="icon"></i>
            </span>
        </div>
        <div class="dj-block__content">
            <div class="title__h4">
                {{ value }}
            </div>
            <p>{{ title }}</p>
        </div>
    </div>
</template>

<script>
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';

export default {
    name: 'DjBlockStat',
    components: {
        DjIcon,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        value: {
            type: Number | String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        position: {
            type: String,
            required: false,
            validator: function (value) {
                return ['vertical', 'horizontal'].indexOf(value) !== -1;
            },
            default: 'vertical',
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-block--stat--horizontal {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding-left: 25px;
    padding-top: 18px;
    padding-bottom: 18px;
    //padding: 25px;
    border-radius: 15px;
    //margin: 10px;
    //max-width: 290px;
    width: 100%;
}
</style>
