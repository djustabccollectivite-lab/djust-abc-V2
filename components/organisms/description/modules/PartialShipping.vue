<template>
    <div class="table-responsive" v-if="description">
        <table class="table table-bordered dj-table dj-table--specification">
            <tbody>
                <tr v-for="typeShipping in arrayOfDeliveryDate">
                    <td>
                        {{ typeShipping.left }}
                    </td>
                    <td>
                        {{ typeShipping.right }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import moment from 'moment';
import { defineComponent } from '@nuxtjs/composition-api';
export default defineComponent({
    name: 'PartialDescription',
    props: {
        description: {
            type: [Array, Object],
            require: true,
        },
    },

    computed: {
        arrayOfDeliveryDate() {
            const result = [];
            if (this.description[0]?.deliveryTimeRange) {
                for (let i in this.description) {
                    let lastDate = moment(String(this.description[i].deliveryTimeRange.latestDeliveryDate)).format(
                        'DD/MM/YYYY '
                    );
                    let earliestDate = moment(
                        String(this.description[i].deliveryTimeRange.earliestDeliveryDate)
                    ).format('DD/MM/YYYY');
                    let label = this.description[i].label;
                    let price = this.description[i].shippingPriceUnit;
                    let localDelivery = this.description[i].shippingZone.label;

                    result.push({
                        left: `${price} € ${label} `,
                        right: `Entre le ${earliestDate} et ${lastDate} en ${localDelivery}`,
                    });
                }
            }
            return result;
        },
    },
});
</script>
