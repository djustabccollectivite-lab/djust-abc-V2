<template>
    <div class="order-bloc_stepper">
        <ul class="steps steps-sm">
            <li v-for="step in steps" :key="step.number" class="step-item" :class="step.class">
                <div class="step-link">
                    <span class="step-number">{{ step.number }}</span>
                    <span class="step-title">{{ step.name }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'DjTimelineHorizontal',
    props: {
        steps: {
            type: Array,
            default: () => []
        },
    },
};
</script>

<style lang="scss" scoped>
.steps {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: flex-start;
}
.step-link {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 12px;
    color: var(--color-primary);
}
.step-number {
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-family: var(--font-1st);
    color: #8392a5;
    border: 2px solid #8392a5;
    border-radius: 100%;
    &.decline, &.expired {
        background-color: #dc3545 !important;
        background: #dc3545 !important;
        border-color: #dc3545 !important;
    }
}
.step-item {
    display: inline-block;
    position: relative;
    &.complete {
        .step-number {
            background-color: var(--color-primary);
            border-color: var(--color-primary);
            color: #fff;
        }
        .step-title {
            color: var(--color-primary);
        }
    }
    &.active {
        .step-number {
            background-color: var(--color-secondary);
            border-color: var(--color-secondary);
            color: #fff;
        }
        .step-title {
            color: var(--color-secondary);
        }
    }
    &.decline, &.expired {
        .step-number {
            background-color: #dc3545;
            border-color: #dc3545;
            color: #fff;
        }
        .step-title {
            color: #dc3545 !important ;
        }
    }
}

.step-item.complete .step-link {
    color: #10b759;
}
.steps-sm .step-link {
    font-size: 11px;
    font-weight: 600;
    font-family: var(--font-1st);
    text-transform: uppercase;
    letter-spacing: 0.2px;
}

.steps-sm .step-number {
    width: 25px;
    height: 25px;
}

*,
:after,
:before {
    box-sizing: border-box;
}

.steps-vertical .step-title {
    width: auto;
    white-space: normal;
}
@media (min-width: 768px) {
    .step-title {
        width: auto;
        overflow: visible;
        text-overflow: inherit;
    }
}

@media (min-width: 576px) {
    .step-title {
        margin-left: 10px;
        width: auto;
        white-space: normal;
    }
}
.steps-vertical .step-item + .step-item:before {
    left: 16px;
}

.steps-vertical .step-item + .step-item:before {
    content: '';
    position: absolute;
    top: -20px;
    left: 12px;
    height: 15px;
    width: 1px;
    background-color: #cdd4e0;
    display: block;
}

.steps-sm .step-item + .step-item:before {
    font-size: 12px;
}

.spacing {
    padding-top: 13px !important;
    padding-bottom: 13px !important;
    padding-left: 13px !important ;
    padding-right: 13px !important;
}
</style>
