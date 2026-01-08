<template>
  <section class="ps-page--simple">
    <BreadCrumb :breadcrumb="breadCrumb" />

    <div class="dj-order-tracking">
      <div class="container">
        <div class="dj-section__header">
          <div class="title__h3">{{ $t("account.orders.tracking.title") }}</div>

          <p>{{ $t("account.orders.tracking.instruction") }}</p>
        </div>

        <div class="dj-section__content">
          <form class="dj-form--order-tracking" action="/" method="get">
            <div class="form-group">
              <label>{{ $t("account.orders.tracking.label") }}</label>

              <input class="form-control" type="text" :placeholder="$t('account.orders.tracking.placeholder')" />
            </div>

            <div class="form-group">
              <label>{{ $t("account.orders.tracking.emailLabel") }}</label>

              <input class="form-control" type="text" placeholder="" />
            </div>

            <div class="form-group">
              <DjButton :text="'Contact'" :iconDisplayed="true" styleButton="secondary" :fullWidth="true" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BreadCrumb from '@components/atoms/DjBreadCrumb/DjBreadCrumb.vue';
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default {
  transition: 'zoom',
  layout(context) {
    return context.store.state.app.layoutType;
  },
  components: {
    BreadCrumb,
    DjButton,
  },
  data: () => {
    return {
      breadCrumb: [
        {
          text: 'Home',
          url: '/',
        },
        {
          text: 'Order Tracking',
        },
      ],
    };
  },
};
</script>
