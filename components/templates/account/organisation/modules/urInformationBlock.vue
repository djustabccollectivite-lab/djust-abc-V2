<template lang="html">
    <DjCard :title="$t('account.organisation.titleOrga')" headerColor="var(--color-secondary)">
        <div class="cadreUrInformation">
            <div class="arbredorga">
                <TreeOrganisation :treeOrga="treeOrga" :accountName="customerAccount.name"> </TreeOrganisation>
                <div @click.prevent="createOrganisation">
                    <DjButton
                        :text="$t('account.organisation.addOrga')"
                        :iconDisplayed="true"
                        styleButton="light"
                        :shape="'button'"
                        icon="icon-plus-circle"
                        :size="'standard'"
                        :textDisplayed="true"
                    />
                </div>
            </div>
            <div class="figure rightfigure">
                <p class="titre">Informations {{ organisationName }}</p>
                <ValidationObserver v-slot="{ invalid }" ref="accountupdate">
                    <v-form v-model="valid" lazy-validation>
                        <div v-if="isAccountSelected" class="dj-info--orga-content">
                            <div class="dj-orga-items">
                                <dl class="items-list">
                                    <div class="item">
                                        <div class="item-props">{{ $t('account.organisation.name') + ' :' }}</div>
                                        <div class="item-value">
                                            <ValidationProvider
                                                mode="eager"
                                                v-slot="{ errors }"
                                                :name="$t('account.organisation.name')"
                                                rules="required"
                                            >
                                                <DjInput
                                                    outlined
                                                    v-model="customerAccount.name"
                                                    :error-messages="errors[0]"
                                                    disabled
                                                />
                                            </ValidationProvider>
                                        </div>
                                        <div class="item-props">
                                            {{ $t('account.organisation.accountManager') + ' :' }}
                                        </div>
                                        <div class="item-value">
                                            <ValidationProvider
                                                mode="eager"
                                                v-slot="{ errors }"
                                                :name="$t('account.organisation.accountManager')"
                                                rules="required"
                                            >
                                                <DjInput
                                                    outlined
                                                    v-model="customerAccount.accountManager"
                                                    :error-messages="errors[0]"
                                                />
                                            </ValidationProvider>
                                        </div>
                                        <div class="item-props">{{ $t('account.organisation.vat') + ' :' }}</div>
                                        <div class="item-value">
                                            <DjInput outlined v-model="customerAccount.vatNumber" />
                                        </div>
                                        <div class="item-props">{{ $t('account.organisation.website') + ' :' }}</div>
                                        <div class="item-value">
                                            <DjInput outlined v-model="customerAccount.website" />
                                        </div>
                                        <div class="item-props">{{ $t('account.organisation.business') + ' :' }}</div>
                                        <div class="item-value">
                                            <ValidationProvider
                                                mode="eager"
                                                v-slot="{ errors }"
                                                :name="$t('account.organisation.business')"
                                                rules="required"
                                            >
                                                <DjInput
                                                    outlined
                                                    v-model="customerAccount.businessRegistrationNumber"
                                                    :error-messages="errors[0]"
                                                />
                                            </ValidationProvider>
                                        </div>
                                        <div class="item-props">{{ $t('account.organisation.compagny') + ' :' }}</div>
                                        <div class="item-value">
                                            <ValidationProvider
                                                mode="eager"
                                                v-slot="{ errors }"
                                                :name="$t('account.organisation.compagny')"
                                                rules="required"
                                            >
                                                <DjInput
                                                    outlined
                                                    :error-messages="errors[0]"
                                                    v-model="customerAccount.companyRegistrationName"
                                                />
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div v-else class="dj-info--orga-content">
                            <div class="dj-orga-items">
                                <dl class="items-list">
                                    <div class="item">
                                        <div class="item-props">{{ $t('account.organisation.name') + ' :' }}</div>
                                        <div class="item-value">
                                            <ValidationProvider
                                                mode="eager"
                                                v-slot="{ errors }"
                                                :name="$t('account.organisation.name')"
                                                rules="required"
                                            >
                                                <DjInput outlined v-model="modelNameOrga" :error-messages="errors[0]" />
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </v-form>
                </ValidationObserver>
                <div class="buttonInformation">
                    <div class="divButton">
                        <DjLink class="dj-btn dj-btn--primary buttonIn djLinkWidth" @click.prevent="cancel()">
                            {{ $t('account.organisation.cancel') }}
                        </DjLink>
                    </div>
                    <div class="divButton">
                        <DjLink
                            class="dj-btn dj-btn--primary buttonIn djLinkWidth"
                            @click.prevent="updateOrganisationInformation()"
                        >
                            {{ $t('account.organisation.edit') }}
                        </DjLink>
                    </div>
                </div>
            </div>
            <DjModal v-model="createOrganisationPage" width="700" class="modale__buying">
                <DjCard
                    headerColor="var(--color-secondary)"
                    :title="$t('account.organisation.addOrga')"
                    class="djCardTitle"
                >
                    <ValidationObserver v-slot="{ invalid }" ref="organisationValid">
                        <v-form v-model="valid" lazy-validation>
                            <ValidationProvider
                                mode="eager"
                                v-slot="{ errors }"
                                :name="$t('account.organisation.name')"
                                rules="required"
                            >
                                <DjInput
                                    v-model="nameOrga"
                                    type="text"
                                    :error-messages="errors[0]"
                                    :label="$t('account.organisation.name') + '*'"
                                    required
                                    outlined
                                />
                            </ValidationProvider>
                            <DjInput
                                v-model="organisationName"
                                type="text"
                                :label="$t('account.organisation.parentOrga')"
                                outlined
                                disabled
                            />
                            <div class="justify-center">
                                <DjLink
                                    class="dj-btn dj-btn--primary djLinkCreateOrga"
                                    @click.prevent="apiCreateOrganisation()"
                                >
                                    {{ $t('product.buttonAddToQuote.createButton') }}
                                </DjLink>
                            </div>
                        </v-form>
                    </ValidationObserver>
                </DjCard>
            </DjModal>
        </div>
    </DjCard>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjLink from '@components/atoms/DjLink/DjLink';
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api';
import DjModal from '@components/molecules/DjModal/DjModal.vue';
import DjCard from '@components/molecules/DjCard/DjCard.vue';
import DjSpacer from '@components/atoms/DjSpacer/DjSpacer.vue';
import TreeOrganisation from '@components/templates/account/organisation/modules/treeOrga.vue';

export default {
    components: {
        ValidationObserver,
        ValidationProvider,
        DjButton,
        DjInput,
        DjLink,
        DjModal,
        DjCard,
        DjSpacer,
        ref,
        TreeOrganisation,
    },
    props: {
        customerAccount: {
            default: {},
        },
        treeOrga: {
            type: Array,
            default: {},
        },
        organisationName: {
            type: String,
            default: '',
        },
        organisationId: {
            type: String,
            default: '',
        },
    },
    created() {
        this.$nuxt.$on('whenClickOnTree', (isAccount) => {
            this.isAccountSelected = isAccount.id === '0';
        });
    },
    computed: {
        modelNameOrga: {
            get() {
                return this.organisationName;
            },
            set(newvalue) {
                this.organisationName = newvalue;
            },
        },
    },
    data() {
        return {
            valid: true,
            createOrganisationPage: false,
            nameOrga: '',
            showNameOrga: false,
            isAccountSelected: true,
        };
    },
    methods: {
        async updateOrganisationInformation() {
            if (this.isAccountSelected) {
                this.$refs.accountupdate.validate().then(async (success) => {
                    if (!success) {
                        this.$toast.error(this.$t('notification.user.vide'));
                        return;
                    } else {
                        if (this.name == '' || (this.business == '' && this.businessRegistrationNumber == '')) {
                            this.$toast.error(this.$t('notification.user.noupdate'));
                        } else {
                            const request = {
                                name: this.customerAccount.name,
                                vatNumber: this.customerAccount.vatNumber,
                                businessRegistrationNumber: this.customerAccount.businessRegistrationNumber,
                                website: this.customerAccount.website,
                                companyRegistrationName: this.customerAccount.companyRegistrationName,
                                accountManager: this.customerAccount.accountManager,
                            };
                            this.$toast.success(this.$t('notification.user.update'));
                            await this.$core.useUser.putCustomerInformation(request);
                            $nuxt.$emit('updateAddressOrga', true);
                        }
                    }
                });
            } else {
                this.$refs.accountupdate.validate().then(async (success) => {
                    if (!success) {
                        this.$toast.error(this.$t('notification.user.vide'));
                        return;
                    } else {
                        const request = {
                            name: this.modelNameOrga,
                            status: 'ACTIVE',
                        };
                        this.$toast.success(this.$t('notification.user.update'));
                        await this.$core.useUser.putOrganisationName(this.organisationId, request);
                        $nuxt.$emit('whenCreateOrganisation', true);
                    }
                });
            }
        },
        async cancel() {
            $nuxt.$emit('clickOnCancel', true);
        },
        async createOrganisation() {
            this.createOrganisationPage = true;
        },
        async apiCreateOrganisation() {
            this.$refs.organisationValid.validate().then(async (success) => {
                if (!success) {
                    this.$toast.error(this.$t('notification.user.vide'));
                    return;
                } else {
                    if (!this.isAccountSelected) {
                        const request = {
                            name: this.nameOrga,
                            parentId: this.organisationId,
                        };
                        await this.$core.useUser.postOrganisation(request);
                    } else {
                        const request = {
                            name: this.nameOrga,
                        };
                        await this.$core.useUser.postOrganisation(request);
                    }
                    this.createOrganisationPage = false;
                    this.$toast.success(this.$t('notification.user.update'));
                    $nuxt.$emit('whenCreateOrganisation', true);
                }
            });
        },
    },
};
</script>

<style lang="scss">
#sidebar {
    float: left;
    font-family: var(--font-1st);
    font-style: normal;
    font-weight: 100;
    font-size: 16px;
    line-height: 19px;
    color: #1c1c1c;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
}

#page-wrap {
    width: 500px;
    height: 80px;
    margin-left: 100px;
    font-size: 15px;
}

.titre {
    color: black;
    text-transform: uppercase;
    font-size: 25px;
    padding-top: 7px;
}

.djLinkWidth {
    width: 150px;
}
.justify-center {
    display: flex;
    justify-content: center;
}

.buttoncreate {
    margin-top: 20px;
    display: flex;
    align-items: center;
}

.buttonInformation {
    display: flex;
    justify-content: center;
    align-content: center;
}
.buttonIn {
    float: right;
    width: 200px;
    margin-left: 10px;
    margin-right: 10px;
}

.rightfigure {
    float: right;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.cadreUrInformation {
    margin-top: 5rem;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    @media (max-width: 820px) {
        flex-direction: column;
    }
}

.arbredorga {
    display: flex;
    flex-direction: column;
    width: 100%;
}

i.icon-plus-circle {
    margin-right: 10px;
}

.djLinkCreateOrga {
    width: 630px;
}

.dj-info--orga-content {
    overflow: hidden;
    .dj-orga-items {
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
        @media (min-width: 640px) {
            padding: 0;
        }
        .items-list {
            .item {
                padding-bottom: 1rem;
                @media (min-width: 640px) {
                    display: grid;
                    padding-top: 1rem;
                    padding-bottom: 1rem;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 1rem;
                }
                .item-props {
                    font-family: var(--font-1st);
                    font-style: normal;
                    font-weight: 100;
                    font-size: 16px;
                    line-height: 19px;
                    color: #1c1c1c;
                    margin-top: 15px;
                }
                .item-value {
                    margin-top: 0.25rem;
                    font-family: var(--font-1st);
                    font-style: normal;
                    font-weight: 500;
                    font-size: 16px;
                    line-height: 19px;
                    color: #000000;

                    @media (min-width: 640px) {
                        margin-top: 0;
                        grid-column: span 2 / span 2;
                    }
                }
            }
        }
    }
}

.divButton {
    display: flex;
    width: 45%;
}
</style>
