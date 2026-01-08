<template>
  <section aria-labelledby="categories-box">
    <div v-if="categories" class="dj-categories--section">
      <DjLink v-for="category in categoriesToShow" :key="category.id" :to="`list/${category.id}`"
        class="dj-categories--item">
        <div class="dj-categories--detail">
          <div v-if="category.Icones" class="dj-categories--image">
            <DjImage :src="category.Icones" />
          </div>
          <DjIcon v-else class="icon icon-box" />

          <p>{{ category.name }}</p>
        </div>
      </DjLink>
    </div>
  </section>
</template>

<script>
import DjImage from '@components/atoms/DjImage/DjImage.vue';
import DjLink from '@components/atoms/DjLink/DjLink.vue';
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';

export default {
  name: 'DjCategoriesBox',
  components: {
    DjImage,
    DjLink,
    DjIcon,
  },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    categoriesToShow() {
      return this.$core.getCategories.getNewCategoriesList(this.categories, this.$config.cfcategory);
    },
  },
};
</script>

<style lang="scss" scoped>
.dj-categories--section {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  column-gap: 24px;
  row-gap: 24px;
  padding: 40px;

  align-items: center;
  justify-items: center;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 40px;
    height: 445px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 63px;
  }

  @media (min-width: 1280px) {
    column-gap: 63px;
  }

  .dj-categories--image {
    background-color: var(--color-secondary);
    border-radius: 50%;
    padding: 15px;

    img {
      width: 30px;
      height: 30px;
    }
  }

  .dj-categories--item {
    overflow: hidden;
    width: 100%;
    height: 135px;
    background: #ffffff;
    box-shadow: 0px 2px 4px 1px rgba(105, 105, 105, 0.25);
    border-radius: 10px;
    border-bottom: 8px solid var(--color-secondary);

    &:hover {
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    }
  }

  .dj-categories--detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    p {
      margin-top: 13px;
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 19px;
      text-align: center;

      color: #1c1c1c;
    }

    i {
      width: 52px;
      height: 52px;
      font-size: 30px;
      font-weight: 600;
      background-color: var(--color-secondary);
      color: #ffffff;
      border-radius: 100%;
    }
  }
}
</style>
