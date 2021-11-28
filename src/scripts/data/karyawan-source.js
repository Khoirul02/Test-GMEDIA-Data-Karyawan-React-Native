/* eslint-disable prettier/prettier */
import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class KaryawanSource {
  static async loginKaryawan(data) {
    const loginKaryawanResponse = await fetch(API_ENDPOINT.LOGIN,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Client-Service': CONFIG.CLIENT_SERVICES,
            'Auth-Key': CONFIG.AUTH_KEY,
        },
        body: JSON.stringify(data),
    });
    const loginKaryawanResponseJson = await loginKaryawanResponse.json();
    return loginKaryawanResponseJson;
  }
  static async listKaryawan(data) {
    const listKaryawanResponse = await fetch(API_ENDPOINT.LIST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Client-Service': CONFIG.CLIENT_SERVICES,
            'Auth-Key': CONFIG.AUTH_KEY,
            'User-Id': CONFIG.UID,
            'Token': CONFIG.TOKEN,
        },
        body: JSON.stringify(data),
    });
    const listKaryawanResponseJson = await listKaryawanResponse.json();
    return listKaryawanResponseJson;
  }
  static async detailKaryawan(data) {
    const detailKaryawanResponse = await fetch(API_ENDPOINT.DETAIL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Client-Service': CONFIG.CLIENT_SERVICES,
            'Auth-Key': CONFIG.AUTH_KEY,
            'User-Id': CONFIG.UID,
            'Token': CONFIG.TOKEN,
        },
        body: JSON.stringify(data),
    });
    const detailKaryawanResponseJson = await detailKaryawanResponse.json();
    return detailKaryawanResponseJson;
  }
  static async addKaryawan(data) {
    const addKaryawanResponse = await fetch(API_ENDPOINT.ADD, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Client-Service': CONFIG.CLIENT_SERVICES,
            'Auth-Key': CONFIG.AUTH_KEY,
            'User-Id': CONFIG.UID,
            'Token': CONFIG.TOKEN,
        },
        body: JSON.stringify(data),
    });
    const addKaryawanResponseJson = await addKaryawanResponse.json();
    return addKaryawanResponseJson;
  }
  static async updateKaryawan(data) {
    const updateKaryawanResponse = await fetch(API_ENDPOINT.UPDATE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Client-Service': CONFIG.CLIENT_SERVICES,
            'Auth-Key': CONFIG.AUTH_KEY,
            'User-Id': CONFIG.UID,
            'Token': CONFIG.TOKEN,
        },
        body: JSON.stringify(data),
    });
    const updateKaryawanResponseJson = await updateKaryawanResponse.json();
    return updateKaryawanResponseJson;
  }
  static async deleteKaryawan(data) {
    const deleteKaryawanResponse = await fetch(API_ENDPOINT.DELETE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Client-Service': CONFIG.CLIENT_SERVICES,
            'Auth-Key': CONFIG.AUTH_KEY,
            'User-Id': CONFIG.UID,
            'Token': CONFIG.TOKEN,
        },
        body: JSON.stringify(data),
    });
    const deleteKaryawanResponseJson = await deleteKaryawanResponse.json();
    return deleteKaryawanResponseJson;
  }
}

export default KaryawanSource;
