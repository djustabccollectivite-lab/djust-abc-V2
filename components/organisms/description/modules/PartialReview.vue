<template lang="html">
    <div class="row">
        <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
            <div v-if="totalRating" class="dj-block--average-rating">
                <div class="dj-block__header row d-flex ma-0 align-center">
                    <div class="title__h3 r-3">{{ totalRating }}</div>
                    <v-rating
                        :value="Number(totalRating)"
                        background-color="indigo lighten-3"
                        color="indigo"
                        readonly
                    ></v-rating>
                    <span class="ml-2">{{ rating.length }} {{ $t('product.tabs.reviews.review') }}</span>
                </div>
                <div class="dj-block__star" v-for="i in reverseKeys(5)">
                    <span>{{ i + 1 }} {{ $t('product.tabs.reviews.stars') }}</span>
                    <v-progress-linear
                        class="px-4 dj-progress"
                        height="10"
                        :value="(nbSpecificReviews(i + 1) / reviews.length) * 100"
                    >
                    </v-progress-linear>
                    <span>{{ nbSpecificReviews(i + 1) }}</span>
                </div>
            </div>
            <PostReview v-if="this.$auth.loggedIn" :productSku="productSku" />
            <div v-else class="mt-4 text-center mt-5">
                <div class="title__h5">{{ $t('product.tabs.reviews.authenticationRequired') }}</div>
            </div>
        </div>
        <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
            <v-row class="mt-2">
                <v-col>
                    <table class="table table-bordered dj-table dj-table--reviews">
                        <tbody>
                            <tr v-for="review_ in reviews" :key="review_.id">
                                <td>
                                    {{ $t('product.tabs.reviews.postedBy') }}:<i class="icon-user ml-2"></i>
                                    <span style="color: #000; font-weight: 500">{{
                                        review_.user ? review_.user.firstName : 'User Not Found'
                                    }}</span>
                                    <!-- {{
                                        orderDateFormated(
                                            review_.productReviews.createdAt
                                        )
                                    }} -->
                                </td>
                                <td>
                                    <DjRating :nb="Number(review_.productReview.rating)" />
                                    <p>{{ review_.productReview.message }}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
// A verifier
import DjRating from '@components/atoms/DjRating/DjRating.vue';

import PostReview from '@components/organisms/description/modules/PostReview.vue';
import moment from 'moment';
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
    name: 'PartialReview',
    components: { DjRating, PostReview },
    props: {
        productSku: {
            type: String,
            require: true,
            default: 0,
        },
        reviews: {
            type: Array,
            default: () => [],
        },
    },
    setup(props) {
        const ctx = useContext();
        const totalRating = computed(() => ctx.$core.getProduct.getRatingProduct(ctx.store.state.product));
        const rating = computed(() => props.reviews);
        const message = ref(null);
        const newRating = ref(3);
        const display = ref(false);
        const reviewIsPosted = ref(false);
        function nbSpecificReviews(star) {
            const X = props.reviews.filter((rating) => rating.productReviews.rating === star);
            return X.length;
        }
        function orderDateFormated(date) {
            return moment(String(date)).format('DD/MM/YYYY hh:mm');
        }
        function reverseKeys(n) {
            return [...Array(n).keys()].slice().reverse();
        }

        return {
            totalRating,
            rating,
            message,
            newRating,
            display,
            reviewIsPosted,
            nbSpecificReviews,
            orderDateFormated,
            reverseKeys,
        };
    },
});
</script>

<style lang="scss" scoped></style>
