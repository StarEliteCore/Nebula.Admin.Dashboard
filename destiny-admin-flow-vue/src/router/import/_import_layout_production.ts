module.exports = (file: string) => () => import(`@/layout/${file}.vue`);
