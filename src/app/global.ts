export const GLOBAL_DEV_MODE_LOCAL = true;
export const GLBOAL = Object.freeze({
  BASE_URL: GLOBAL_DEV_MODE_LOCAL
    ? 'https://localhost:7134'
    : 'https://localhost:7134',
  BASE_API_V1_URL: GLOBAL_DEV_MODE_LOCAL
    ? 'https://localhost:7134/api'
    : 'https://hr.esoftmm.com/core/api',
  IS_DEBUG: true,
});
