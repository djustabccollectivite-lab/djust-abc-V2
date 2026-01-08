<template>
    <DjTimeline :steps="steps" />
</template>

<script>
import DjTimeline from '@components/atoms/DjTimeline/DjTimeline.vue';

export default {
    name: 'OrderTimeline',
    components: { DjTimeline },
    props: {
        status: {
            type: String,
            default: '',
        },
    },
    computed: {
        steps() {
            const steps = this.$core.getOrder.getStepsOrder(this.status);
            steps.forEach((step) => {
                step.name = this.$t(`account.orders.timeline.${step.name}`)
            })
            return steps
        },
    },
};
</script>
