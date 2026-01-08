<template>
  <DjAccountLayout :idAccountLink="accountLayoutProfile">
    <DjCard headerColor="var(--color-secondary)" :title="'Vos Informations'">
      <section class="dj-section-user-form">
        <div class="ps-section__content">
          <span class="subtitle">{{ $t('accountLayout.userInformations.text') }}</span>

          <ValidationObserver ref="userupdate">
            <v-form v-model="valid" lazy-validation>
              <div class="civility">
                <div class="label-c">
                  {{ $t('register.labels.civility') }}
                </div>

                <div class="civilityGroup">
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.civility')"
                    rules="required">
                    <v-radio-group v-model="civility" :error-messages="errors[0]" row>
                      <v-radio class="mr-7" value="MR" :disabled="submitUpdate">
                        <template v-slot:label>
                          <span class="civilityLabel">{{ $t('accountLayout.userInformations.civility.mister') }}</span>
                        </template>
                      </v-radio>

                      <v-radio value="MRS" :disabled="submitUpdate">
                        <template v-slot:label>
                          <span class="civilityLabel">{{ $t('accountLayout.userInformations.civility.miss') }}</span>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </ValidationProvider>
                </div>
              </div>

              <div class="formGroup">
                <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.lastName')"
                  rules="required">
                  <label :for="$t('register.labels.lastName')" class="label-c">
                    {{ $t('register.labels.lastName') }}
                    <span class="required">*</span>
                  </label>

                  <DjInput v-model="nom" :error-messages="errors[0]" outlined :disabled="submitUpdate"
                    append-icon="icon-pencil" />
                </ValidationProvider>

                <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.firstName')"
                  rules="required">
                  <label :for="$t('register.labels.firstName')" class="label-c">
                    {{ $t('register.labels.firstName') }}
                    <span class="required">*</span>
                  </label>

                  <DjInput v-model="prenom" :error-messages="errors[0]" outlined :disabled="submitUpdate"
                    append-icon="icon-pencil" />
                </ValidationProvider>
              </div>

              <div class="formGroup">
                <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.email')" rules="">
                  <label :for="$t('register.labels.email')" class="label-c">
                    {{ $t('register.labels.email') }}
                    <span class="required">*</span>
                  </label>

                  <DjInput :value="email" :error-messages="errors[0]" outlined disabled append-icon="icon-pencil" />
                </ValidationProvider>

                <ValidationProvider mode="eager" name="group" rules="">
                  <label for="Groupe" class="label-c">
                    Groupe
                    <span class="required">*</span>
                  </label>

                  <DjInput outlined disabled value="User" append-icon="icon-pencil" />
                </ValidationProvider>
              </div>
            </v-form>
          </ValidationObserver>

          <DjLink class="dj-btn dj-btn--primary taille" @click.prevent="updateUserInformation()" :disabled="this.prenom == this.$auth.user.firstName &&
            this.nom == this.$auth.user.lastName &&
            this.civility == this.$auth.user.civility
            ">
            {{ $t('register.registerButton') }}
          </DjLink>
        </div>
      </section>
    </DjCard>
  </DjAccountLayout>
</template>

<script>
import DjAccountLayout from '@components/templates/DjAccountLayout/DjAccountLayout.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjLink from '@components/atoms/DjLink/DjLink';
import DjCard from '@components/molecules/DjCard/DjCard.vue';

export default {
  name: 'UserInformation',
  components: {
    DjAccountLayout,
    ValidationObserver,
    ValidationProvider,
    DjButton,
    DjInput,
    DjLink,
    DjCard,
  },
  async created() {
    this.prenom = this.$auth.user.firstName;
    this.nom = this.$auth.user.lastName;
    this.civility = this.$auth.user.civility;
    this.email = this.$auth.user.email;
  },
  data() {
    return {
      valid: true,
      user: '',
      civility: '',
      nom: '',
      prenom: '',
      email: '',
      submitUpdate: false,
      accountLayoutProfile: 'Profil',
    };
  },
  methods: {
    updateUserInformation() {
      this.submitUpdate = true;
      this.$refs.userupdate.validate().then(async (success) => {
        if (!success) {
          this.$toast.error(this.$t('notification.user.vide'));
          return;
        }
        if (
          this.prenom == this.$auth.user.firstName &&
          this.nom == this.$auth.user.lastName &&
          this.civility == this.$auth.user.civility
        ) {
          this.$toast.error(this.$t('notification.user.noupdate'));
        } else {
          const request = {
            civility: this.civility,
            firstName: this.prenom,
            lastName: this.nom,
            email: this.user.email,
          };
          this.$toast.success(this.$t('notification.user.update'));
          this.$core.useUser.modifyUserInformation(request);
          setTimeout(() => {
            this.submitUpdate = false;
          }, 1000);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dj-section-user-form {
  margin-top: 5rem;
}

.colorinput {
  color: grey;
}

.titre {
  font-size: 30px;
  color: black;
}

.taille {
  padding: 1.2rem 2rem;
}

.civilityGroup {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.civility {
  display: flex;
  align-items: center;
}

.label-c {
  font-family: var(--font-1st);
  font-style: normal;
  font-weight: 100;
  font-size: 15px;
  line-height: 18px;

  color: #000000;
  padding-right: 20px;

  .required {
    color: red;
  }
}

.civilityLabel {
  font-family: var(--font-1st);
  font-style: normal;
  font-weight: 100;
  font-size: 16px;
  line-height: 19px;

  color: #000000;
}

.subtitle {
  font-family: var(--font-1st);
  font-style: normal;
  font-weight: 100;
  font-size: 14px;
  line-height: 16px;

  color: #000000;
}

.formGroup {
  display: flex;
  flex-direction: column;

  @media (min-width: 640px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    grid-gap: 20px;
  }
}
</style>
