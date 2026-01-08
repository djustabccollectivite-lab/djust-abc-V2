<template>
    <div class="dj-block--vendor">
        <div class="dj-block__container">
            <div class="dj-block__header">
                <div class="d-flex justify-content-between">
                    <div>
                        <div class="title__h4">{{ supplier.name }}</div>
                        <DjRating v-if="supplier.supplierRating" :nb="parseInt(supplier.supplierRating)" />
                        <p v-if="supplier.supplierRating">
                            <strong>{{ supplier.supplierRating }}/5</strong> ({{ supplier.evaluationCount }} notes)
                        </p>
                        <p v-else><strong>Pas de note</strong></p>
                    </div>
                    <div class="dj-block__thumbnail">
                        <img v-if="supplier.logo !== ''" :src="supplier.logo" />
                    </div>
                </div>
            </div>
            <div v-if="supplier.description" class="dj-block__content">
                <div class="dj-block__divider"></div>
                <p>
                    {{ supplier.description }}
                </p>
                <span class="dj-block__divider"></span>
            </div>
        </div>
        <div v-if="commentSupplier.length" class="dj-avis-client">
            <v-carousel hide-delimiters height="350px">
                <v-carousel-item v-for="(item, index) in commentSupplier" height="350px" :key="index">
                    <div class="title-client">Avis client</div>
                    <div class="in-avis-client">
                        <div class="firstName">
                            <img src="~/static/img/anonymUser.png" alt="User" /> {{ item.firstname }}
                        </div>
                        <div class="date">Posté le {{ dateConvert(item.lastUpdatedDate) }}</div>
                        <div class="star-grade">
                            <DjRating v-if="supplier.supplierRating" :nb="parseInt(item.grade)" />
                            <strong class="rate">{{ item.grade }} / 5</strong>
                        </div>
                        <div class="customer-comment">
                            {{ item.comment }}
                        </div>
                    </div>
                </v-carousel-item>
            </v-carousel>
        </div>
        <div v-else class="dj-avis-client min">
            <div class="title-client">Avis client</div>
            <div class="in-avis-client minAvisClient">Il n'y a pour l'instant aucun commentaire client</div>
        </div>
    </div>
</template>

<script>
import DjButton from '@components/atoms/DjButton/DjButton.vue';
import DjRating from '@components/atoms/DjRating/DjRating.vue';
import moment from 'moment';

export default {
    name: 'VendorProfile',
    components: { DjRating, DjButton },
    props: {
        supplier: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            commentSupplier: [],
        };
    },
    async created() {
        this.commentSupplier = await this.$core.useSupplier.getSupplierEvaluationDetail(this.supplier.id);
    },
    computed: {
        dateConvert() {
            return (date) => {
                return moment(date).format('DD/MM/YYYY ');
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.min {
    height: 150px !important;
}
.dj-avis-client {
    background: #f1f1f1;
    border-radius: 1%;
    margin-top: 20px;
    height: 350px;
    .title-client {
        padding-bottom: 0px;
        padding-top: 10px;
        padding-left: 20px;
        font-size: 16px;
        font-weight: bold;
    }

    .minAvisClient {
        height: 58% !important;
        display: flex;
        align-items: center;
        flex-direction: row;
        text-align: -webkit-center;
    }
    .in-avis-client {
        background: white;
        height: 84%;
        border-radius: 1%;
        margin-left: 15px;
        margin-right: 15px;
        margin-top: 5px;
        border-radius: 2%;
        .firstName {
            font-weight: bold;
            display: flex;
            flex-direction: row;
            align-items: center;
            img {
                font-size: 20px;
                padding: 10px;
            }
        }
        .date {
            padding: 10px;
            padding-top: 2px;
            font-weight: 500;
        }
        .star-grade {
            padding: 10px;
            padding-top: 0px;
        }
        .rate {
            color: #669900;
            padding-left: 5px;
        }
        .customer-comment {
            padding: 10px;
            padding-top: 0px;
            text-overflow: ellipsis;
            height: 50%;
            overflow: hidden;
            word-wrap: break-word;
        }
    }
}
</style>
