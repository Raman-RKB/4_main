/* eslint-disable prettier/prettier */
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
    const content: string;
    export default content;
}