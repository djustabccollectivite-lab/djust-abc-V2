<template>
  <section class="dj-store-list">
    <div class="dj-suppliers-page">
      <div class="dj-section__wrapper">
        <div class="dj-section__right">
          <section class="dj-store-box">
            <div class="dj-section__header">
              <div class="title__h3">{{ $t('supplier.suppliers') }} ({{ filteredList.length }})</div>
              <DjInput
                v-model="searchName"
                :placeholder="$t('supplier.searchPlaceholder')"
                outlined
                style="max-width: 200px;"
              />
            </div>

            <div class="dj-section__content">
              <ul role="list" class="dj-supplier-list">
                <li v-for="(item, index) in filteredList" :key="index" class="dj-supplier-list-item">
                  <div class="dj-supplier-item-top">
                    <img class="supplier-image" :src="item.logo ? item.logo : '/img/Icone.png'" alt="" />

                    <div class="title__h3 supplier-name">{{ item.name }}</div>

                    <dl class="supplier-subtitle">
                      <dd class="mt-3">
                        <span class="dj-supplier-nb-offers">{{ $t('supplier.totalOffers') }} {{ item.totalOffers }}</span>
                      </dd>
                    </dl>
                  </div>

                  <div>
                    <div class="dj-supplier-item-actions">
                      <div class="btn-left">
                        <DjLink :to="`/vendor/${item.id}`">
                          <span class="ml-3">{{ $t('supplier.seeOffers') }}</span>
                        </DjLink>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DjInput from '@components/atoms/DjInput/DjInput.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';

export default {
  name: 'VendorListPage',
  components: { DjInput, DjLink },
  data: () => ({
      suppliers: [],
      searchName: '',
      supplierActiv: [],
      y: 0,
  }),
  async created() {
    this.suppliers = await this.$core.useSupplier.getSupplierDetail(null);
  },
  computed: {
    filteredList() {
      const suppliersActives = this.suppliers.filter((e) => e.supplierStatus === 'ACTIVE');
      if (this.searchName === '') return suppliersActives;
      return suppliersActives.filter((entry) => {
        return entry.name.toLowerCase().includes(this.searchName.toLowerCase());
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dj-supplier-item-actions {
  display: flex;
  margin-top: -1px;

  .btn-left {
    display: flex;
    flex: 1 1 0%;
    width: 0;

    a {
      display: inline-flex;
      position: relative;
      padding-top: 1rem;
      padding-bottom: 1rem;
      margin-right: -1px;
      color: #374151;
      flex: 1 1 0%;
      justify-content: center;
      align-items: center;
      width: 0;
      border-bottom-left-radius: 0.5rem;
      border: 1px solid #e5e7eb;

      :hover {
        color: #6b7280;
      }
    }
  }

  .btn-right {
    display: flex;
    flex: 1 1 0%;
    width: 0;
    margin-left: -1px;

    a {
      display: inline-flex;
      position: relative;
      padding-top: 1rem;
      padding-bottom: 1rem;
      color: #374151;
      flex: 1 1 0%;
      justify-content: center;
      align-items: center;
      width: 0;
      border-bottom-right-radius: 0.5rem;
      border: 1px solid #e5e7eb;

      :hover {
        color: #6b7280;
      }
    }
  }
}

.dj-supplier-list {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.dj-supplier-list-item {
  display: flex;
  background-color: #ffffff;
  text-align: center;
  flex-direction: column;
  border-radius: 0.5rem;
  border-top-width: 1px;
  border-color: #e5e7eb;
  grid-column: span 1 / span 1;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.dj-supplier-item-top {
  padding: 2rem;
  flex-direction: column;
  flex: 1 1 0%;

  .supplier-image {
    flex-shrink: 0;
    width: 8rem;
    height: 8rem;
    object-fit: contain;
    border-radius: 9999px;
  }

  .supplier-name {
    margin-top: 1.5rem;
    color: #111827;
  }

  .supplier-subtitle {
    display: flex;
    margin-top: 0.25rem;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;

    .title-supplier {
      color: #6b7280;
    }
  }
}

.dj-supplier-nb-offers {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: #d1fae5;
  color: #065f46;
  font-weight: 500;
  border-radius: 9999px;
}

.dj-suppliers-page {
  width: 100%;
  background: #ffffff;
  margin-left: auto;
  margin-right: auto;
  padding-top: 24px;
  padding-bottom: 24px;

  @media (min-width: 640px) {
    padding-left: 24px;
    padding-right: 24px;
  }

  @media (min-width: 1024px) {
    padding-left: 48px;
    padding-right: 48px;
  }
}
</style>
