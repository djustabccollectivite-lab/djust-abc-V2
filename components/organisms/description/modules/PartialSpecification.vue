<template lang="html">
    <div class="table-responsive">
        <table class="table table-bordered dj-table dj-table--specification">
            <tbody>
                <tr v-for="specification in specificationsList" :key="specification.id">
                    <td>{{ specification.attribute }}</td>
                    <td>{{ specification.value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { computed, defineComponent, ref } from '@nuxtjs/composition-api';
export default defineComponent({
    name: 'PartialSpecification',
    props: {
        specifications: {
            type: Array,
            require: true,
            default: () => [],
        },
    },
    setup(props) {
        const specificationsList = computed(() => {
            const output = [];
            if (props.specifications) {
                props.specifications.forEach((specification) =>
                    specification.attribute !== 'shortDescription' ? output.push(specification) : null
                );
            }
            return output;
        });

        return { specificationsList };
    },
});

// export default {
//     name: 'PartialSpecification',
//     props: {
//         specifications: {
//             type: Array,
//             require: true,
//             default: () => []
//         }
//     },
//     computed:  {
//         specificationsList() {
//             const output=[]
//             if (this.specifications) {
//             this.specifications.forEach(specification => specification.attribute!=="shortDescription" ? output.push(specification) : null)
//             }
//             return output
//         }
//     }
// };
</script>

<style lang="scss" scoped></style>
