import { LoginErrorResponse, NpCityType, NpRequestResult, NpWarehouseType } from '../types.ts';
import axios from 'axios';
import { API_URLS } from './index.ts';

export const getCities = (query: string): Promise<NpRequestResult<NpCityType>> => {
  return new Promise((resolve, reject) => {
    axios.post<NpRequestResult<NpCityType>>(`${ API_URLS.novaPost }`, {
      "apiKey": import.meta.env.VITE_APP_NOVA_POST_KEY,
      "modelName": "AddressGeneral",
      "calledMethod": "getCities",
      "methodProperties": {
        "FindByString": query
      }
    })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response?.data as LoginErrorResponse);
        });
  });
};

export const getWarehouses = (cityRef: string): Promise<NpRequestResult<NpWarehouseType>> => {
  return new Promise((resolve, reject) => {
    axios.post<NpRequestResult<NpWarehouseType>>(`${ API_URLS.novaPost }`, {
      apiKey: import.meta.env.VITE_APP_NOVA_POST_KEY,
      modelName: 'Address',
      calledMethod: 'getWarehouses',
      methodProperties: { CityRef: cityRef },
    })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response?.data as LoginErrorResponse);
        });
  });
};

export const getStreets = (cityRef: string): Promise<NpRequestResult<NpWarehouseType>> => {
  return new Promise((resolve, reject) => {
    axios.post<NpRequestResult<NpWarehouseType>>(`${ API_URLS.novaPost }`, {
      apiKey: import.meta.env.VITE_APP_NOVA_POST_KEY,
      modelName: 'AddressGeneral',
      calledMethod: 'getStreet',
      methodProperties: { CityRef: cityRef },
    })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response?.data as LoginErrorResponse);
        });
  });
};
