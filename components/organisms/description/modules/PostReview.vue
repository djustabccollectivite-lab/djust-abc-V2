<template>
    <form class="dj-form--review mt-8 pl-1" v-if="!reviewIsPosted && this.$auth.loggedIn">
        <div class="title__h4">{{ $t('product.tabs.reviews.submitYourReview') }}</div>
        <div class="form-group form-group__rating">
            <label>{{ $t('product.tabs.reviews.yourRating') }}</label>
            <v-rating v-model="newRating" background-color="indigo lighten-3" color="indigo" large></v-rating>
        </div>
        <div class="">
            <v-textarea
                class=""
                rows="5"
                solo
                auto-grow
                single-line
                v-model="message"
                :placeholder="$t('product.tabs.reviews.field')"
            ></v-textarea>
            <span v-if="display" style="color: red"> {{ $t('product.tabs.reviews.submitionError') }}</span>
        </div>
        <div @click.prevent="postReview()">
            <DjButton
                :text="$t('product.tabs.reviews.button')"
                :iconDisplayed="true"
                styleButton="primary"
                icon="icon-papers"
            />
        </div>
    </form>
    <div v-else class="mt-4 text-center">
        <div class="title__h4">{{ $t('product.tabs.reviews.submitionValidation') }}</div>
    </div>
</template>

<script>
import { defineComponent, useContext, ref } from '@nuxtjs/composition-api';
import DjButton from '@components/atoms/DjButton/DjButton.vue';

export default defineComponent({
    name: 'PostReview',
    components: { DjButton },
    props: {
        productSku: {
            type: String,
            require: true,
            default: 0,
        },
    },
    setup(props) {
        const ctx = useContext();
        const message = ref(null);
        const newRating = ref(3);
        const display = ref(false);
        const reviewIsPosted = ref(false);
        async function postReview() {
            if (message !== '') {
                const request = {
                    message: message.value,
                    productSku: props.productSku,
                    rating: newRating.value,
                };
                const post = await ctx.$core.useProduct.postProductReview(request);
                post ? (reviewIsPosted.value = true) : null;
            } else {
                display = true;
            }
        }

        return { message, newRating, display, reviewIsPosted, postReview };
    },
});

// export default {
//     name: 'PostReview',
//     props: {
//         productId: {
//             type: Number,
//             require: true,
//             default: 0
//         }
//     },
//     data() {
//         return {
//             message: null,
//             newRating: 3,
//             display: false,
//             reviewIsPosted: false
//         };
//     },
//     methods: {
//         async postReview() {
//             if (this.message !== '') {
//                 const request = {
//                     message: this.message,
//                     productId: this.productId,
//                     rating: this.newRating
//                 };
//                 const post = await this.$core.useProduct.postProductReview(request);
//                 post ? (this.reviewIsPosted = true) : null;
//             } else {
//                 this.display = true;
//             }
//         }
//     }
// };
</script>
