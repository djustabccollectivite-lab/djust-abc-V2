import { Context } from '@nuxt/types';

export default (context: Context) => ({
    /**
     * Récupère la structure de la Home Page depuis Firebase
     */
    async getHomePage() {
        try {
            const docSnap = await context.$db.collection("pages").doc("home").get();
            if (docSnap.exists) {
                return docSnap.data()?.components || [];
            }
            return [];
        } catch (error) {
            console.error("Erreur Firebase Home:", error);
            return [];
        }
    },

    /**
     * Récupère une page légale par son ID (mentions-legales, cgu, etc.)
     */
    async getPage(pageId: string) {
        try {
            const docSnap = await context.$db.collection("pages").doc(pageId).get();
            return docSnap.exists ? docSnap.data() : null;
        } catch (error) {
            console.error(`Erreur Firebase Page ${pageId}:`, error);
            return null;
        }
    },

    /**
     * Récupère les articles du blog
     */
    async getBlogPosts() {
        try {
            const querySnapshot = await context.$db.collection("blog").orderBy("date", "desc").get();
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Erreur Firebase Blog:", error);
            return [];
        }
    },

    /**
     * Récupère les questions de la FAQ
     */
    async getFaq() {
        try {
            const docSnap = await context.$db.collection("pages").doc("faq").get();
            return docSnap.exists ? (docSnap.data()?.questions || []) : [];
        } catch (error) {
            console.error("Erreur Firebase FAQ:", error);
            return [];
        }
    }
});
