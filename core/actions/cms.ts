import { Context } from '@nuxt/types';
import { doc, getDoc, collection, getDocs, query, orderBy, where } from "firebase/firestore";

export default (context: Context) => ({
    /**
     * Récupère la structure de la Home Page depuis Firebase
     */
    async getHomePage() {
        try {
            const docRef = doc(context.$db, "pages", "home");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data().components;
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
            const docRef = doc(context.$db, "pages", pageId);
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? docSnap.data() : null;
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
            const blogRef = collection(context.$db, "blog");
            const q = query(blogRef, orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
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
            const docRef = doc(context.$db, "pages", "faq");
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? docSnap.data().questions : [];
        } catch (error) {
            console.error("Erreur Firebase FAQ:", error);
            return [];
        }
    }
});
