declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
declare module '*.twig' {
  const content: (context?: Object) => string;
  export default content;
}
