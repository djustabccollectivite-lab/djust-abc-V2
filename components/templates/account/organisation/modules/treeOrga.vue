<template lang="html">
    <div @click.prevent="treeTitle()">
        <v-treeview
            class="tree_class"
            hoverable
            :items="accountorga"
            transition
            return-object
            activatable
            :open="[accountorga[0]]"
            :active.sync="idTree"
        >
            <!-- <template v-slot:append="{ items }" @click.prevent="createOrganisation()">
          <DjIcon>icon-plus-circle</DjIcon>
      </template>  -->
            <template v-slot:prepend="{ item, open }">
                <DjIcon v-if="!open">icon-apartment</DjIcon>
                <DjIcon v-else>icon-city</DjIcon>
            </template>
        </v-treeview>
    </div>
</template>

<script>
import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
export default {
    name: 'TreeOrga',
    components: {
        DjIcon,
    },
    data() {
        return {
            idTree: [],
        };
    },
    props: {
        treeOrga: {
            type: Array,
            default: {},
        },
        accountName: {
            type: String,
            default: '',
        },
    },
    computed: {
        accountorga() {
            return [
                {
                    id: '0',
                    addresses: [],
                    children: this.treeOrga,
                    name: this.accountName,
                },
            ];
        },
    },
    methods: {
        treeTitle() {
            if (this.idTree.length !== 0) {
                $nuxt.$emit('whenClickOnTree', this.idTree[0]);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.titre {
    color: black;
    text-transform: uppercase;
    font-size: 25px;
    padding-top: 7px;
}

.tree_class {
    font-size: 18px;
    float: left;
}

// .buttoncreate {
//     display: none;
//     &:hover{
//       margin-top: 20px;
//       display: flex !important;
//       align-items: center;
//     }
// }
</style>
