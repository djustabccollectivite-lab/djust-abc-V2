import firebase from "firebase/app";

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.twig' {
  const content: (context?: Object) => string;
  export default content;
}

declare module '@nuxt/types' {
  interface Context {
    $db: firebase.firestore.Firestore;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $db: firebase.firestore.Firestore;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $db: firebase.firestore.Firestore;
  }
}
