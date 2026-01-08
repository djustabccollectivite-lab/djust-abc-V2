<template>
  <form>
    <div v-if="!toggleshow" class="dj-form-login">
      <div class="dj-form__content">
        <div>
          <div v-show="e1 == 1">
            <transition name="home" mode="out-in">
              <ValidationObserver ref="formStep1">
                <v-form v-model="valid" lazy-validation>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.accountName')"
                    rules="required">
                    <label :for="$t('register.labels.accountName')" class="form-label">
                      {{ $t('register.labels.accountName') }}
                      <span class="required">*</span>
                    </label>
                    <DjInput v-model="accountName" :error-messages="errors[0]" outlined />
                  </ValidationProvider>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.accountManager')">
                    <label :for="$t('register.labels.accountManager')" class="form-label">
                      {{ $t('register.labels.accountManager') }}
                    </label>
                    <DjInput v-model="accountManager" :error-messages="errors[0]" outlined />
                  </ValidationProvider>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.website')">
                    <label :for="$t('register.labels.website')" class="form-label">
                      {{ $t('register.labels.website') }}
                    </label>
                    <DjInput v-model="website" :error-messages="errors[0]" prefix="http://" outlined />
                  </ValidationProvider>

                  <label :for="$t('register.labels.currency')" class="form-label">
                    {{ $t('register.labels.currency') }}
                  </label>
                  <v-select v-model="currency" :items="currencies" outlined />
                  <ValidationProvider mode="eager" v-slot="{ errors }"
                    :name="$t('register.labels.companyRegistrationName')" rules="required">
                    <label :for="$t('register.labels.companyRegistrationName')" class="form-label">
                      {{ $t('register.labels.companyRegistrationName') }}
                      <span class="required">*</span></label>
                    <DjInput v-model="companyRegistrationName" :error-messages="errors[0]" placeholder="ex. : 890"
                      outlined />
                  </ValidationProvider>
                  <ValidationProvider mode="eager" v-slot="{ errors }"
                    :name="$t('register.labels.businessRegistrationNumber')" rules="required">
                    <label :for="$t('register.labels.businessRegistrationNumber')" class="form-label">
                      {{ $t('register.labels.businessRegistrationNumber') }}
                      <span class="required">*</span></label>
                    <DjInput v-model="businessRegistrationNumber" :error-messages="errors[0]" placeholder="ex. : 890"
                      outlined />
                  </ValidationProvider>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.VATNumber')">
                    <label :for="$t('register.labels.VATNumber')" class="form-label">
                      {{ $t('register.labels.VATNumber') }}
                    </label>
                    <DjInput v-model="VATNumber" :error-messages="errors[0]" outlined />
                  </ValidationProvider>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.fullName')"
                    rules="required">
                    <label :for="$t('register.labels.fullName')" class="form-label">
                      {{ $t('register.labels.fullName') }}
                      <span class="required">*</span></label>
                    <DjInput v-model="fullName" :error-messages="errors[0]" outlined />
                  </ValidationProvider>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.address')"
                    rules="required">
                    <label :for="$t('register.labels.address')" class="form-label">
                      {{ $t('register.labels.address') }}
                      <span class="required">*</span></label>
                    <DjInput v-model="address" :error-messages="errors[0]" outlined />
                  </ValidationProvider>

                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.label')" rules="">
                    <label :for="$t('register.labels.label')" class="form-label">
                      {{ $t('register.labels.label') }}
                    </label>
                    <DjInput v-model="label" :error-messages="errors[0]" outlined />
                  </ValidationProvider>

                  <ValidationProvider mode="eager" :name="$t('register.labels.address2')">
                    <label :for="$t('register.labels.address2')" class="form-label">
                      {{ $t('register.labels.address2') }}
                    </label>
                    <DjInput v-model="addressCompl" outlined />
                  </ValidationProvider>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.zipCode')"
                    rules="required">
                    <label :for="$t('register.labels.zipCode')" class="form-label">
                      {{ $t('register.labels.zipCode') }}
                      <span class="required">*</span></label>
                    <DjInput v-model="zipcode" :error-messages="errors[0]" outlined />
                  </ValidationProvider>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.city')"
                    rules="required">
                    <label :for="$t('register.labels.city')" class="form-label">
                      {{ $t('register.labels.city') }}
                      <span class="required">*</span></label>
                    <DjInput v-model="city" :error-messages="errors[0]" outlined />
                  </ValidationProvider>
                  <div class="formGroup">
                    <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.state')"
                      rules="required">
                      <label :for="$t('register.labels.state')" class="form-label">
                        {{ $t('register.labels.state') }}
                        <span class="required">*</span></label>
                      <DjInput v-model="state" :error-messages="errors[0]" class="pr-2" outlined />
                    </ValidationProvider>
                    <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.country')"
                      rules="required">
                      <label :for="$t('register.labels.country')" class="form-label">
                        {{ $t('register.labels.country') }}
                        <span class="required">*</span></label>
                      <DjInput v-model="country" :error-messages="errors[0]" outlined disabled />
                    </ValidationProvider>
                  </div>
                  <v-checkbox v-model="IsShipping">
                    <template v-slot:label>
                      <span class="checkboxLabel">{{ $t("register.differentShippingAddress") }}</span>
                    </template>
                  </v-checkbox>
                  <div v-if="IsShipping">
                    <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.fullName')"
                      rules="required">
                      <label :for="$t('register.labels.fullName')" class="form-label">
                        {{ $t('register.labels.fullName') }}
                        <span class="required">*</span></label>
                      <DjInput v-model="fullName2" :error-messages="errors[0]" outlined />
                    </ValidationProvider>
                    <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.addressShipping')"
                      rules="required">
                      <label :for="$t('register.labels.addressShipping')" class="form-label">
                        {{ $t('register.labels.addressShipping') }}
                        <span class="required">*</span></label>
                      <DjInput v-model="address2" :error-messages="errors[0]" outlined />
                    </ValidationProvider>

                    <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.label')" rules="">
                      <label :for="$t('register.labels.label')" class="form-label">
                        {{ $t('register.labels.label') }}
                      </label>
                      <DjInput v-model="label2" :error-messages="errors[0]" outlined />
                    </ValidationProvider>

                    <ValidationProvider mode="eager" :name="$t('register.labels.address2')">
                      <label :for="$t('register.labels.address2')" class="form-label">
                        {{ $t('register.labels.address2') }}
                      </label>
                      <DjInput v-model="addressCompl2" outlined />
                    </ValidationProvider>
                    <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.zipCode')"
                      rules="required">
                      <label :for="$t('register.labels.zipCode')" class="form-label">
                        {{ $t('register.labels.zipCode') }}
                        <span class="required">*</span></label>
                      <DjInput v-model="zipcode2" :error-messages="errors[0]" outlined />
                    </ValidationProvider>
                    <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.city')"
                      rules="required">
                      <label :for="$t('register.labels.city')" class="form-label">
                        {{ $t('register.labels.city') }}
                        <span class="required">*</span></label>
                      <DjInput v-model="city2" :error-messages="errors[0]" outlined />
                    </ValidationProvider>
                    <div class="formGroup">
                      <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.state')"
                        rules="required">
                        <label :for="$t('register.labels.state')" class="form-label">
                          {{ $t('register.labels.state') }}
                          <span class="required">*</span></label>
                        <DjInput v-model="state2" :error-messages="errors[0]" class="pr-2" outlined />
                      </ValidationProvider>
                      <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.country')"
                        rules="required">
                        <label :for="$t('register.labels.country')" class="form-label">
                          {{ $t('register.labels.country') }}
                          <span class="required">*</span></label>
                        <DjInput v-model="country2" :error-messages="errors[0]" outlined disabled />
                      </ValidationProvider>
                    </div>
                  </div>
                </v-form>
                <div class="form-group submit mt-2 btnGroup">
                  <div class="btn1 pr-4" @click.prevent="cancel()">
                    <DjButton :text="$t('register.cancel')" styleButton="secondary" :fullWidth="true" />
                  </div>
                  <div class="btn2" @click.prevent="validateStep1()">
                    <DjButton :text="$t('register.continueButton')" :iconDisplayed="false" styleButton="primary"
                      shape="button" icon="" :fullWidth="true" />
                  </div>
                </div>
              </ValidationObserver>
            </transition>
          </div>
          <div v-show="e1 == 2">
            <transition name="home" mode="out-in">
              <ValidationObserver ref="formStep2">
                <v-form v-model="valid" lazy-validation>
                  <div class="civilityGroup mb-5">
                    <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.civility')"
                      rules="required">
                      <v-radio-group v-model="civility" :error-messages="errors[0]" row>
                        <v-radio class="mr-7" value="MR">
                          <template v-slot:label>
                            <span class="civilityLabel">M.</span>
                          </template>
                        </v-radio>
                        <v-radio value="MRS">
                          <template v-slot:label>
                            <span class="civilityLabel">Mme</span>
                          </template>
                        </v-radio>
                      </v-radio-group>
                    </ValidationProvider>
                  </div>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.firstName')"
                    rules="required">
                    <label :for="$t('register.labels.firstName')" class="form-label">
                      {{ $t('register.labels.firstName') }}
                      <span class="required">*</span></label>
                    <DjInput v-model="firstName" :error-messages="errors[0]" outlined />
                  </ValidationProvider>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.lastName')"
                    rules="required">
                    <label :for="$t('register.labels.lastName')" class="form-label">
                      {{ $t('register.labels.lastName') }}
                      <span class="required">*</span></label>
                    <DjInput v-model="lastName" :error-messages="errors[0]" outlined />
                  </ValidationProvider>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.email')"
                    rules="required|email">
                    <label :for="$t('register.labels.email')" class="form-label">
                      {{ $t('register.labels.email') }}
                      <span class="required">*</span></label>
                    <DjInput v-model="email" :error-messages="errors[0]" outlined />
                  </ValidationProvider>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.phone')" :rules="{
                    max: 15,
                    regex: '^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$',
                  }">
                    <label :for="$t('register.labels.phone')" class="form-label">
                      {{ $t('register.labels.phone') }}
                    </label>
                    <DjInput v-model="phone" :error-messages="errors[0]" outlined />
                  </ValidationProvider>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.password')"
                    vid="Password" rules="required|verify_password">
                    <label :for="$t('register.labels.password')" class="form-label">
                      {{ $t('register.labels.password') }}
                      <span class="required">*</span>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon class="icon-info" dark small v-bind="attrs" v-on="on">
                            mdi-alert-circle
                          </v-icon>
                        </template>
                        <span>
                          {{ $t('register.passwordRules') }}
                        </span>
                      </v-tooltip>
                    </label>
                    <DjInput v-model="password" :error-messages="errors[0]" @click:append="show1 = !show1"
                      :append-icon="show1 ? 'icon-eye' : 'icon-eye-crossed'" :type="show1 ? 'text' : 'password'"
                      outlined />
                  </ValidationProvider>
                  <ValidationProvider mode="eager" v-slot="{ errors }" :name="$t('register.labels.confirmpassword')"
                    rules="required|confirmed:Password">
                    <label :for="$t('register.labels.confirmpassword')" class="form-label">
                      {{ $t('register.labels.confirmpassword') }}
                      <span class="required">*</span></label>
                    <DjInput v-model="confirmpassword" @click:append="show2 = !show2"
                      :append-icon="show2 ? 'icon-eye' : 'icon-eye-crossed'" :type="show2 ? 'text' : 'password'"
                      :error-messages="errors[0]" outlined />
                  </ValidationProvider>
                </v-form>
                <div class="form-group submit mt-30 btnGroup">
                  <div class="btn1 pr-4" @click.prevent="BackStep1()">
                    <DjButton :text="$t('register.back')" styleButton="secondary" :fullWidth="true" />
                  </div>
                  <div class="btn2" @click.prevent="validateStep2()">
                    <DjButton :text="$t('register.continueButton')" :iconDisplayed="false" styleButton="primary"
                      shape="button" icon="" :fullWidth="true" />
                  </div>
                </div>
              </ValidationObserver>
            </transition>
          </div>
          <div class="dj-form__footer">
            <p><span class="require" style="color: red">*</span> : champs obligatoire</p>
            <p>
              {{ $t('register.footerText') }}
              {{ ' ' }}
              <nuxt-link :to="localePath('/auth/login')" class="linktoRegister">
                {{ $t('register.footerBtn') }}
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>

    <transition name="home" mode="out-in">
      <div v-if="toggleshow">
        <div class="dj-form__content" v-if="toggleshow">
          <div class="notif">
            <h2 style="text-align: center" class="iconValidate">
              <DjIcon color="green">icon-checkmark-circle</DjIcon>
              <br />
              {{ $t('register.confirmEmail') }}
            </h2>
            <p>
              {{
                manualAccountCheck
                ? $t('register.confirmEmailManualDescription')
                : $t('register.confirmEmailDescription')
              }}
            </p>
          </div>
        </div>
      </div>
    </transition>
  </form>
</template>

<script>
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import AuthLayout from '@components/templates/auth/AuthLayout.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'PublicRegisterTemplate',
  components: {
    AuthLayout,
    DjInput,
    DjButton,
    DjLink,
    DjIcon,
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    ValidationURL() {
      return '/auth/validation';
    },
  },
  data() {
    return {
      error: null,
      valid: true,
      username: null,
      password: null,
      e1: 1,
      civilities: ['MR', 'MRS'],
      currencies: ['EUR', 'USD'],
      accountName: '',
      accountManager: '',
      website: '',
      currency: 'EUR',
      companyRegistrationName: '',
      businessRegistrationNumber: '',
      VATNumber: '',
      civility: '',
      firstName: '',
      lastName: '',
      email: '',
      confirmpassword: '',
      country: 'France',
      country2: 'France',
      label: '',
      label2: '',
      fullName: '',
      fullName2: '',
      address: '',
      address2: '',
      addressCompl: '',
      addressCompl2: '',
      city: '',
      city2: '',
      state: '',
      state2: '',
      zipcode: '',
      zipcode2: '',
      phone: '',
      phone2: '',
      billing: true,
      billing2: false,
      show1: false,
      show2: false,
      shipping: true,
      shipping2: true,
      toggleshow: false,
      altLogo: '',
      headerLogo: '',
      IsShipping: false,
      apiRes: '',
      manualAccountCheck: false,
    };
  },
  async created() {
    const settings = await this.$core.useUser.getSettings();
    this.manualAccountCheck = settings ? settings.manualAccountCheck : false;
  },
  methods: {
    cancel() {
      this.$router.push(this.localePath('/auth/login'));
    },
    BackStep1() {
      this.$refs.formStep2.reset();
      this.e1 = 1;
      $nuxt.$emit('changeTitle', 'Créez votre compte');
    },
    validateStep1() {
      this.$refs.formStep2.reset();
      this.$refs.formStep1.validate().then(async (success) => {
        if (!success) {
          return;
        } else {
          $nuxt.$emit('changeTitle', 'Informations Utilisateur');
          this.e1 = 2;
        }
      });
    },
    async validateStep2() {
      this.$refs.formStep2.validate().then(async (success) => {
        if (!success) return;
        this.createAddressRequests = [
          {
            label: this.label,
            fullName: this.fullName,
            address: this.address,
            city: this.city,
            zipcode: this.zipcode,
            country: this.country,
            billing: this.billing,
            shipping: !this.IsShipping,
            additionalAddress: this.address2,
            state: this.state,
            phone: this.phone,
          },
        ];
        if (this.IsShipping) {
          this.createAddressRequests.push({
            label: this.label2,
            fullName: this.fullName2,
            address: this.address2,
            city: this.city2,
            zipcode: this.zipcode2,
            country: this.country2,
            billing: this.billing2,
            shipping: this.shipping2,
            additionalAddress: this.addressCompl2,
            state: this.state2,
            phone: this.phone2,
          });
        }

        const request = {
          createAddressRequests: this.createAddressRequests,
          createCustomerUserRequest: {
            civility: this.civility,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
            phone: this.phone,
          },
          createObjectCustomerAccountRequest: {
            accountManager: this.accountManager,
            businessRegistrationNumber: this.businessRegistrationNumber,
            companyRegistrationName: this.companyRegistrationName,
            vatNumber: this.VATNumber,
            name: this.accountName,
            website: this.website,
          },
          fromFO: true,
        };
        this.apiRes = await this.$core.useUser.createCustomerAccount(request);
        if (this.apiRes.status == 'success') {
          this.$toast.success(this.apiRes.message);
          $nuxt.$emit('removeTitle', true);
          this.toggleshow = true;
          setTimeout(() => this.$router.push({ path: '/auth/login' }), 15000);
        } else {
          this.$toast.error(this.apiRes.message);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-info {
  color: var(--color-primary);
}

.checkboxLabel {
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.87);
}

.civilityGroup {
  display: flex;
  justify-content: center;
}

.civilityLabel {
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  color: #000000;
}

.form-label {
  display: block;
  font-size: 15px;
  line-height: 18px;
  font-weight: 400;

  .required {
    color: red;
  }
}

.dj-form__footer {
  p {
    text-align: center;
    font-size: 16px;
    line-height: 19.2px;
    font-weight: 400;

    .linktoRegister {
      text-decoration: underline;

      &:hover {
        color: rgba(var(--color-primary), 0.8);
      }
    }
  }
}

.btnGroup {
  display: flex;
  justify-content: center;

  .btn1,
  .btn2 {
    width: 100%;
  }
}

.formGroup {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  grid-gap: 5px;
}

.notif {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 384px;
  padding: 20px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  .iconValidate {
    font-size: 25px;
    line-height: 31.8px;
    font-weight: 400;

    i {
      padding-bottom: 5px;
      color: green;
      font-size: 40px;
      text-align: center;
    }
  }

  p,
  span {
    text-align: center;
  }
}

.home-enter-active,
.home-leave-active {
  transition: all 0.5s ease;
  animation: flipInX 0.5s;
}

.home-enter,
.home-leave-active {
  opacity: 0;
}

@keyframes flipInX {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.retour {
  line-height: 18px;
  margin-right: 9px;
  font-weight: 700;
}
</style>
