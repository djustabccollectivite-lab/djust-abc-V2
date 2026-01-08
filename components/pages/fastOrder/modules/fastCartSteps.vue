<template>
    <div class="cadrePayment">
        <div class="trackCadre">
            <div class="step">
                <div class="titleStep">
                    <div class="DjTrack">1</div>
                    <div class="textStep">{{ $t('fastCart.steps.step1') }}</div>
                </div>
            </div>

            <div>
                <div class="titleStep">
                    <div class="DjTrack">2</div>
                    <div class="textStep">{{ $t('fastCart.steps.step2') }}</div>
                </div>
            </div>

            <div>
                <div class="titleStep">
                    <div class="DjTrack">3</div>
                    <div class="textStep">{{ $t('fastCart.steps.step3') }}</div>
                </div>
            </div>

            <div>
                <div class="titleStep">
                    <div class="DjTrack">4</div>
                    <div class="textStep">{{ $t('fastCart.steps.step4') }}</div>
                </div>
            </div>

            <div>
                <div class="titleStep">
                    <div class="DjTrack">5</div>
                    <div class="textStep">{{ $t('fastCart.steps.step5') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'fastCartSteps',
};
</script>

<style>
.DjTrack {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    gap: 10px;

    width: 24px;
    height: 25px;
    background: var(--color-secondary);
    border-radius: 2000px;
    color: white;
    flex: none;
    order: 0;
    flex-grow: 0;
}

.trackCadre {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    padding: 14px;
    background: #f9f9f9;
}

@media screen and (min-width: 900px) {
    .trackCadre {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
}
.imgCadre {
    display: flex;
}
.separateur {
    width: 55px;
    height: 1.5px;
    border: 1.5px solid #000000;
}
.textStep {
    padding-left: 8px;
    height: 40px;
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: var(--color-secondary);
    order: 1;
    flex-grow: 0;
}
.step {
    display: flex;
    flex-direction: column;
}
.titleStep {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}
</style>
