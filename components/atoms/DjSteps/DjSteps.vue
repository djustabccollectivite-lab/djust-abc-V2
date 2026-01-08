<template>
    <div class="dj-steps">
        <nav class="dj-steps-nav" aria-label="Progress">
            <ol role="list" class="dj-steps-list">
                <li v-for="(step, stepIdx) in steps" :key="step.id" class="dj-list-item">
                    <div
                        :class="[
                            stepIdx === 0 ? 'dj-step-initial' : '',
                            stepIdx === steps.length - 1 ? 'dj-step-last' : '',
                            'dj-step-random',
                        ]"
                    >
                        <nuxt-link v-if="step.status === 'complete'" :to="localePath(step.href)" class="group">
                            <span class="dj-step-complete" aria-hidden="true" />
                            <span :class="[stepIdx !== 0 ? 'StepPl' : '', 'stepBlock']">
                                <span class="stepIcon">
                                    <span class="iconComplete">
                                        <DjIcon class="dj-icon" aria-hidden="true">icon-checkmark-circle</DjIcon>
                                    </span>
                                </span>
                                <span class="stepText">
                                    <span class="stepName">{{ step.name }}</span>
                                    <span class="stepDescription">{{ step.description }}</span>
                                </span>
                            </span>
                        </nuxt-link>
                        <div v-else-if="step.status === 'current'" aria-current="step">
                            <span class="dj-step-current" aria-hidden="true" />
                            <span :class="[stepIdx !== 0 ? 'StepPl' : '', 'stepBlock']">
                                <span class="stepNumberCurrent">
                                    <span class="iconCurrent">
                                        <span class="stepNumber">{{ step.id }}</span>
                                    </span>
                                </span>
                                <span class="stepText">
                                    <span class="stepName">{{ step.name }}</span>
                                    <span class="stepDescription">{{ step.description }}</span>
                                </span>
                            </span>
                        </div>
                        <div v-else class="group">
                            <span class="dj-step-upcoming" aria-hidden="true" />
                            <span :class="[stepIdx !== 0 ? 'StepPl' : '', 'stepBlock']">
                                <span class="stepIcon">
                                    <span class="stepNumberUpcoming">
                                        <span class="stepNumber">{{ step.id }}</span>
                                    </span>
                                </span>
                                <span class="stepText">
                                    <span class="stepName">{{ step.name }}</span>
                                    <span class="stepDescription">{{ step.description }}</span>
                                </span>
                            </span>
                        </div>
                        <template v-if="stepIdx !== 0">
                            <!-- Sparator -->
                            <div class="dj-step-sparator" aria-hidden="true">
                                <svg class="sparator" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
                                    <path
                                        d="M0.5 0V31L10.5 41L0.5 51V82"
                                        stroke="currentcolor"
                                        vector-effect="non-scaling-stroke"
                                    />
                                </svg>
                            </div>
                        </template>
                    </div>
                </li>
            </ol>
        </nav>
    </div>
</template>

<script>
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';

export default {
    name: 'DjSteps',
    components: {
        DjIcon,
    },
    props: {
        //StepItem { id, name, description,href, status(complete/current/upcoming)}
        //on peut ajouter disabled step
        steps: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
<style lang="scss">
.dj-steps {
    margin-bottom: 10px;
    @media (min-width: 1024px) {
        border-top: 1px solid;
        border-bottom: 1px solid;
        border-color: #e5e7eb;
        margin-bottom: 5rem;
    }
    .dj-steps-nav {
        padding-left: 1rem;
        padding-right: 1rem;
        //max-width: 80rem;

        @media (min-width: 640px) {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }

        @media (min-width: 1024px) {
            padding-left: 2rem;
            padding-right: 2rem;
        }
        .dj-steps-list {
            overflow: hidden;
            border-radius: 0.375rem;
            margin-bottom: 0px !important;
            @media (min-width: 1024px) {
                display: flex;
                border-radius: 0;
                border-right: 1px solid;
                border-left: 1px solid;
                border-color: #e5e7eb;
            }
            .dj-list-item {
                overflow: hidden;
                position: relative;
                @media (min-width: 1024px) {
                    flex: 1 1 0%;
                }
                .dj-step-initial {
                    border-top-left-radius: 0.375rem;
                    border-top-right-radius: 0.375rem;
                    border-bottom-width: 0;
                }
                .dj-step-last {
                    border-bottom-right-radius: 0.375rem;
                    border-bottom-left-radius: 0.375rem;
                    border-top-width: 0;
                }
                .dj-step-random {
                    overflow: hidden;
                    border: 1px solid;
                    border-color: #e5e7eb;
                    @media (min-width: 1024px) {
                        border-width: 0;
                    }
                }
                .StepPl {
                    @media (min-width: 1024px) {
                        padding-left: 2.25rem;
                    }
                }
                .stepBlock {
                    padding-top: 1.25rem;
                    padding-bottom: 1.25rem;
                    padding-left: 1.5rem;
                    padding-right: 1.5rem;
                    font-family: var(--font-1st);
                    font-style: normal;
                    font-weight: 600;
                    font-size: 10px;
                    line-height: 14px;
                    text-align: left;
                    text-transform: uppercase;
                    display: flex;
                    align-items: flex-start;
                }
                .stepNumberCurrent {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 9999px;
                    border: 2px solid;
                    border-color: var(--color-primary);
                    .stepNumber {
                        color: var(--color-primary);
                    }
                }
                .stepIcon {
                    flex-shrink: 0;
                    .iconComplete {
                        display: flex;
                        background-color: var(--color-primary);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 2.5rem;
                        height: 2.5rem;
                        border-radius: 9999px;
                        .dj-icon {
                            color: #ffffff;
                            width: 2.5rem;
                            height: 2.5rem;
                            font-size: 30px !important;
                        }
                    }

                    .stepNumberUpcoming {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 2.5rem;
                        height: 2.5rem;
                        border-radius: 9999px;
                        border: 2px solid;
                        border-color: #d1d5db;
                        .stepNumber {
                            color: #6b7280;
                        }
                    }
                }
                .stepText {
                    margin-top: 0.125rem;
                    margin-left: 1rem;
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                    .stepDescription {
                        color: #6b7280;
                        font-family: var(--font-1st);
                        font-style: normal;
                        font-weight: 600;
                        font-size: 10px;
                        line-height: 14px;
                        text-align: left;
                        text-transform: uppercase;
                    }
                }

                .dj-step-complete {
                    //to add hover
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: transparent;
                    width: 0.25rem;
                    height: 100%;
                    @media (min-width: 1024px) {
                        bottom: 0;
                        top: auto;
                        width: 100%;
                        height: 0.25rem;
                    }

                    .stepName {
                        font-family: var(--font-1st);
                        font-style: normal;
                        font-weight: 600;
                        font-size: 10px;
                        line-height: 14px;
                        text-align: left;
                        text-transform: uppercase;
                        letter-spacing: 0.025em !important;
                    }
                }
                .dj-step-current {
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: var(--color-primary);
                    width: 0.25rem;
                    height: 100%;
                    @media (min-width: 1024px) {
                        bottom: 0;
                        top: auto;
                        width: 100%;
                        height: 0.25rem;
                    }

                    .stepName {
                        color: var(--color-primary);
                        font-family: var(--font-1st);
                        font-style: normal;
                        font-weight: 600;
                        font-size: 10px;
                        line-height: 14px;
                        text-align: left;
                        text-transform: uppercase;
                        letter-spacing: 0.025em !important;
                    }
                }
                .dj-step-upcoming {
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: transparent;
                    width: 0.25rem;
                    height: 100%;
                    @media (min-width: 1024px) {
                        bottom: 0;
                        top: auto;
                        width: 100%;
                        height: 0.25rem;
                    }

                    .stepName {
                        color: #6b7280;
                        font-family: var(--font-1st);
                        font-style: normal;
                        font-weight: 600;
                        font-size: 10px;
                        line-height: 14px;
                        text-align: left;
                        text-transform: uppercase;
                        letter-spacing: 0.025em !important;
                    }
                }
            }
        }
    }
}
.dj-step-sparator {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    top: 0;
    left: 0;
    width: 0.75rem;
    @media (min-width: 1024px) {
        display: block;
    }
    .sparator {
        color: #d1d5db;
        width: 100%;
        height: 100%;
    }
}
</style>
