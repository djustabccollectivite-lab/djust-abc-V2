import firebase from "firebase/app";
import "firebase/firestore";
import { Plugin } from "@nuxt/types";

const firebasePlugin: Plugin = (context, inject) => {
    const firebaseConfig = {
        apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
        authDomain: process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NUXT_ENV_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_ENV_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NUXT_ENV_FIREBASE_APP_ID
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore();

    // Inject $db in Nuxt context and components
    inject("db", db);
};

export default firebasePlugin;
