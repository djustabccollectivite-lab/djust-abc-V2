<template lang="html">
    <div class="dj-block-features">
        <div class="dj-container">
            <div class="dj-block--features">
                <div class="dj-block__item" v-for="(item, index) in block.items" :key="index">
                    <div class="dj-block__left">
                        <i :class="item.icon"></i>
                    </div>
                    <div class="dj-block__right">
                        <div class="title__h4">
                            {{ item.title }}
                        </div>
                        <p>
                            {{ item.text }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FeaturesBlock',
    props: {
        block: {
            type: Object,
            default: () => {},
        },
    },
};
</script>

<style lang="scss" scoped>
.dj-block--features {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 20px 40px;
    width: 100%;
    //border: 1px solid #d9d9d9;
    .dj-block__left {
        padding-left: 35px;

        i {
            font-size: 40px;
            color: var(--color-primary);
        }
    }
    .dj-block__right {
        padding-left: 25px;
        h4,
        .title__h4 {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 0;
            margin-top: 0;
            color: #000;
        }
        p {
            margin-bottom: 0;
            color: var(--color-body-2);
        }
    }
    .dj-block__item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background: #ffffff;
        box-shadow: 0px 2px 4px 1px rgba(105, 105, 105, 0.25);
        border-radius: 4px;
        padding: 40px;
        margin: 10px;
        width: 100%;
        &:hover {
            box-shadow: 0px 2px 4px 3px rgba(105, 105, 105, 0.25);
            border-radius: 4px;
        }
    }

    @media (max-width: 1680px) {
        padding: 30px;
        .dj-block__item {
            padding: 30px 15px;
        }
    }
    @media (max-width: 1440px) {
        .dj-block__item {
            padding: 25px;
        }
        .dj-block__left {
            padding-left: 25px;
            padding-right: 25px;
        }
        .dj-block__right {
            width: 100%;
            padding-left: 0;
        }
    }
    @media (max-width: 1024px) {
        flex-flow: row wrap;
        .dj-block__item {
            margin-bottom: 30px;
            padding: 40px;
        }
    }

    @media (max-width: 420px) {
        .dj-block__item {
            max-width: 100%;
            flex-flow: row nowrap;
            .dj-block__right {
                padding-left: 20px;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
.dj-block-features {
    //padding-bottom: 90px;
    @media screen and (max-width: 480px) {
    }
}
</style>
