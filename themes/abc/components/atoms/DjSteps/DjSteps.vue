<template>
    <div class="dj-steps">
        <nav class="dj-steps-nav p-0" aria-label="Progress">
            <ol role="list" class="dj-steps-list">
                <li v-for="(step, stepIdx) in steps" :key="step.id" class="dj-list-item">
                    <div>
                        <nuxt-link v-if="step.status === 'complete'" :to="localePath(step.href)" class="group">
                            <span class="dj-step-complete" aria-hidden="true" />
                            <div :class="['p-2 ml-2 d-flex align-items-center uppercase text-left']">
                                <div class="stepIcon">
                                    <div class="iconComplete">
                                        <SvgIcon name="checkmark-circle-full" />
                                    </div>
                                </div>
                                <div class="ml-2 mt-1">
                                    <div class="font-700 size-16 text-blue underline lh-1">{{ step.name }}</div>
                                    <div class="text-grey-4">{{ step.description }}</div>
                                </div>
                            </div>
                        </nuxt-link>
                        <div v-else-if="step.status === 'current'" aria-current="step" class="d-flex">
                            <div class="dj-step-current" aria-hidden="true" />
                            <div :class="['p-2 ml-2 d-flex align-items-center uppercase text-left flex-grow-1']">
                                <div class="stepNumberCurrent">
                                    <div class="iconCurrent">
                                        <div class="stepNumber font-600">{{ step.id }}</div>
                                    </div>
                                </div>
                                <div class="ml-2 mt-1">
                                    <div class="text-black font-700 size-16 lh-1">{{ step.name }}</div>
                                    <div class="text-grey-4">{{ step.description }}</div>
                                </div>
                            </div>
                            <template>
                                <div class="separator"></div>
                            </template>
                        </div>
                        <div v-else class="group d-flex">
                            <span class="dj-step-upcoming" aria-hidden="true" />
                            <div :class="['p-2 ml-2 d-flex align-items-center uppercase text-left flex-grow-1']">
                                <div class="stepIcon">
                                    <div class="stepNumberUpcoming">
                                        <div class="stepNumber">{{ step.id }}</div>
                                    </div>
                                </div>
                                <div class="ml-2 mt-1">
                                    <div class="text-black font-700 size-16 lh-1">{{ step.name }}</div>
                                    <div class="text-grey-4">{{ step.description }}</div>
                                </div>
                            </div>
                            <template v-if="stepIdx !== 0">
                                <div class="separator"></div>
                            </template>
                        </div>
                    </div>
                </li>
            </ol>
        </nav>
    </div>
</template>

<script>
import SvgIcon from '@components/atoms/icons/SvgIcon.vue';

export default {
    name: 'DjSteps',
    components: {
        SvgIcon,
    },
    data() {
        return {
            steps: null,
            currentStepId: 0,
        };
    },
    mounted() {
        switch (window.location.pathname) {
            case '/checkout/shopping-cart':
                this.currentStepId = 1;
                break;
            case '/checkout/billing':
                this.currentStepId = 2;
                break;
            case '/checkout/shipping':
                this.currentStepId = 3;
                break;
            case '/checkout/payment':
                this.currentStepId = 4;
                break;
            case '/checkout/order-validation':
                this.currentStepId = 5;
                break;
        }

        this.steps = [
            {
                id: 1,
                name: 'Panier',
                description: 'Voir détails',
                href: '/checkout/shopping-cart',
                status: this.getStepStatus(1),
                icon: this.currentStepId > 1 ? 'icon-check' : 'icon-cart',
            },
            {
                id: 2,
                name: 'Détails de facturation',
                description: 'Adresse de facturation',
                href: '/checkout/billing',
                status: this.getStepStatus(2),
                icon: this.currentStepId > 2 ? 'icon-check' : 'icon-cart',
            },
            {
                id: 3,
                name: 'Détails de livraison',
                description: 'Adresse de livraison',
                href: '/checkout/shipping',
                status: this.getStepStatus(3),
                icon: this.currentStepId > 3 ? 'icon-check' : 'icon-cart',
            },
            {
                id: 4,
                name: 'Paiement',
                description: 'Choisir son mode de paiement',
                href: '/checkout/payment',
                status: this.getStepStatus(4),
                icon: this.currentStepId > 4 ? 'icon-check' : 'icon-cart',
            },
            {
                id: 5,
                name: 'Commande confirmée',
                description: 'Validation de la commande',
                href: '/checkout/order-validation',
                status: this.getStepStatus(5),
                icon: this.currentStepId > 5 ? 'icon-check' : 'icon-cart',
            },
        ];
    },
    methods: {
        getStepStatus(stepId) {
            if (this.currentStepId === stepId) {
                return 'current';
            }
            if (this.currentStepId > stepId) {
                return 'complete';
            }
            return 'upcoming';
        },
    },
};
</script>
<style lang="scss" scoped>
.separator {
    width: 1px;
    height: 55px;
    border-right: 1px solid var(--color-grey-nuance-9);
}

.dj-steps {
    margin-bottom: 10px;
    @media (min-width: 1024px) {
        border-top: 1px solid;
        border-bottom: 1px solid;
        border-color: var(--color-grey-nuance-9);
        margin-bottom: 2rem;
    }
    .dj-steps-nav {
        padding-left: 1rem;
        padding-right: 1rem;

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
            margin-bottom: 0 !important;
            @media (min-width: 1024px) {
                display: flex;
                border-radius: 0;
                border-right: 1px solid;
                border-left: 1px solid;
                border-color: var(--color-grey-nuance-9);
            }
            .dj-list-item {
                overflow: hidden;
                position: relative;
                @media (min-width: 1024px) {
                    flex: 1 1 0%;
                }

                .stepNumberCurrent {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 50%;
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
                        justify-content: center;
                        align-items: center;
                        width: 2.5rem;
                        height: 2.5rem;
                        border-radius: 50%;
                    }

                    .stepNumberUpcoming {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 2.5rem;
                        height: 2.5rem;
                        border-radius: 50%;
                        border: 2px solid var(--color-grey-nuance-9);
                        .stepNumber {
                            color: var(--color-grey-nuance-6);
                        }
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
                }
            }
        }
    }
}
</style>
