<template>
    <DjTimeline :steps="steps" />
</template>

<script>
import DjTimeline from '@components/atoms/DjTimeline/DjTimeline.vue';

export default {
    name: 'TimelineQuote',
    components: { DjTimeline },
    props: {
        status: {
            type: String,
            default: '',
        },
    },
    computed: {
        steps() {
            const steps = this.$core.getQuote.getStepsQuote(this.status);
            steps.forEach((step) => {
                step.name = this.$t(`quote.timeline.${step.name}`)
            })
            return steps
        },
    },
};
</script>
