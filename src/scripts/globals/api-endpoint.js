/* eslint-disable prettier/prettier */
import CONFIG from './config.js';

const API_ENDPOINT = {
  LOGIN: `${CONFIG.BASE_URL}auth/login`,
  LIST: `${CONFIG.BASE_URL}main/list_karyawan`,
  DETAIL: `${CONFIG.BASE_URL}main/detail_karyawan`,
  ADD: `${CONFIG.BASE_URL}main/add_karyawan`,
  UPDATE: `${CONFIG.BASE_URL}main/update_karyawan`,
  DELETE: `${CONFIG.BASE_URL}main/delete_karyawan`,
};

export default API_ENDPOINT;
