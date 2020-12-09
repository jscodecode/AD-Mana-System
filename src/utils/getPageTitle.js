const title = process.env.VUE_APP_BASE_NAME || 'ADMS';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}-${title}`;
  }
  return title;
}
