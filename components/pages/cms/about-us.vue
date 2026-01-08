<template>
  <div>
    <div class="hero-section">
      <div class="description">
        <div class="topheader">
          <DjImage class="logo" :src="logo" :alt="$config.clientName" />
          <span class="textTitle">Une plateforme d’achats télécoms qui vous est 100% dédiée</span>
        </div>
        <div class="desc">
          <div class="block-text">
            <span class="desc-text">
              C’est en 2020 que naît le projet de création d’une plateforme d’achats e-commerce
              spécialisée dans les équipements télécoms. Celle-ci assure les transactions de produits et
              de services entre les fournisseurs et les sous-traitants d’Axione. Depuis septembre 2022, la
              plateforme est mise en service. En effet, notre ambition est de vous accompagner
              (fournisseurs & sous-traitants partenaires) pour vous fournir des solutions adaptées à vos
              besoins. Grâce à cette plateforme, vous pourrez accéder à un catalogue de produits
              diversifiés et de qualité.
            </span>
          </div>
        </div>
      </div>
      <div class="image"></div>
    </div>
    <div class="content-section">
      <div class="features-block">
        <span>Quels sont les bénéfices du store d’Axione ?</span>
        <div class="features">
          <div class="feature">
            <DjIcon class="icon"> icon-cart-add</DjIcon>
            <div class="text-block">
              <p class="feature-title">Disponibilité</p>
              <p class="feature-text">Une meilleure disponibilité des produits</p>
            </div>
          </div>
          <div class="feature">
            <DjIcon class="icon"> icon-cash-euro</DjIcon>
            <div class="text-block">
              <p class="feature-title">Tarification</p>
              <p class="feature-text">Des prix compétitifs</p>
            </div>
          </div>
          <div class="feature">
            <DjIcon class="icon"> icon-group-work</DjIcon>
            <div class="text-block">
              <p class="feature-title">Centralisation</p>
              <p class="feature-text">
                Un processus de commande centralisé sur une seule et même plateforme
              </p>
            </div>
          </div>
          <div class="feature">
            <DjIcon class="icon"> icon-papers</DjIcon>
            <div class="text-block">
              <p class="feature-title">Reporting</p>
              <p class="feature-text">
                Un reporting des achats effectués pour assurer une traçabilité de vos commandes
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="schema-block">
        <div class="schema-title">Comment fonctionne la plateforme ?</div>
        <div class="schema"></div>
      </div>
    </div>
  </div>
</template>
<script>
import DjImage from '@components/atoms/DjImage/DjImage.vue';

import DjIcon from '@components/atoms/DjIcon/DjIcon.vue';
export default {
  name: 'About-Us',
  components: {
    DjImage,
    DjIcon,
  },
  data: () => ({
    page: null,
  }),
  computed: {
    logo() {
      return this.$store.state.storyblok.logoWithColor;
    },
  },

};
</script>
<style lang="scss">
.hero-section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 60px 100px 0px;
  gap: 28px;

  .description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 60px 0px 0px;
    gap: 50px;
    flex: 1;

    width: 100%;
    height: auto;

    .topheader {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0px;
      gap: 50px;

      .logo {
        width: 167px;
        height: 167px;
      }

      .textTitle {
        font-family: var(--font-1st);
        font-style: normal;
        font-weight: 500;
        font-size: 26px;
        line-height: 30px;
        text-align: center;
        color: #1e3c7e;
      }
    }

    .desc {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0px;
      gap: 35px;

      width: 100%;
      height: auto;

      .block-text {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px;

        .desc-text {
          font-family: var(--font-1st);
          font-style: normal;
          font-weight: 100;
          font-size: 16px;
          line-height: 150.2%;
          color: #000000;
        }
      }
    }
  }

  .image {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 10px;
    gap: 10px;
    height: 569px;
    width: 100%;
    max-width: 606px;
    flex: 1;
    background: url('/img/Landingimage.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    box-shadow: inset 0px 0px 4px 6px #ffffff;
  }
}

.content-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  padding-top: 60px;
  isolation: isolate;

  .features-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 100px;
    gap: 40px;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: -60px 0px;
    z-index: 1;

    span {
      padding-top: 50px;
      font-family: var(--font-1st);
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 21px;

      text-transform: uppercase;

      color: #1e3c7e;
    }

    .features {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0px;
      gap: 85px;

      .feature {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        padding: 14px;
        gap: 20px;
        background: #ffffff;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        border-radius: 4px;

        .icon {
          width: 50px;
          height: 50px;
          font-size: 45px;
          color: #005bd8;
        }

        .text-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0px;
          gap: 14px;

          .feature-title {
            font-family: var(--font-1st);
            font-style: normal;
            font-weight: 700;
            font-size: 25px;
            line-height: 29px;
            text-align: center;
            color: #000000;
          }

          .feature-text {
            font-family: var(--font-1st);
            font-style: normal;
            font-weight: 100;
            font-size: 16px;
            line-height: 19px;
            text-align: center;
            color: #000000;
          }
        }
      }
    }
  }

  .schema-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 110px 100px;
    gap: 50px;
    background: #1e3c7e;
    width: 100%;

    .schema-title {
      display: flex;
      align-self: center;
      font-family: var(--font-1st);
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 21px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
    }

    .schema {
      max-width: 1240px;
      width: 100%;
      height: 600px;
      background: url('/img/SCHEMA.png');
      background-repeat: no-repeat;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
    }
  }
}

.contact-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 100px;
  gap: 14px;
  width: 1440px;
  height: 446px;
  background: url('/img/');
}
</style>
