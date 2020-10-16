module.exports = (file: string) => () => import(`@/views/${file}.vue`);
