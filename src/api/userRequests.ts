import { API_URLS } from './index.ts';
import axios from 'axios';
import {
  ErrorResponseResult,
  LoginErrorResponse,
  LoginResponse,
  LoginResponseResult,
  ProfileResponseResult,
  Shipment,
  ShipmentResponseResult,
  TLoginForm,
  UserResult
} from '../types.ts';


export const loginUser = (data: TLoginForm): Promise<LoginResponseResult> => {
  return new Promise((resolve, reject) => {
    axios.post<LoginResponse>(`${ API_URLS.imrev }/login`, data)
        .then((response) => {
          resolve(response.data.result);
        })
        .catch((error) => {
          reject(error.response?.data as LoginErrorResponse);
        });
  });
};


export const getProfile = (): Promise<UserResult> => {
  return new Promise((resolve, reject) => {
    axios.get<ProfileResponseResult>(`${ API_URLS.imrev }/profile`)
        .then((response) => {
          resolve(response.data.result);
        })
        .catch((error) => {
          reject(error.response?.data as LoginErrorResponse);
        });
  });
};

export const logoutUser = (): Promise<ErrorResponseResult> => {
  return new Promise((resolve, reject) => {
    axios.post<ErrorResponseResult>(`${ API_URLS.imrev }/logout`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response?.data as ErrorResponseResult);
        });
  });
};

export const updateProfile = (data: UserResult): Promise<UserResult> => {
  return new Promise((resolve, reject) => {
    axios.put<ProfileResponseResult>(`${ API_URLS.imrev }/profile/update`, data)
        .then((response) => {
          resolve(response.data.result);
        })
        .catch((error) => {
          reject(error.response?.data as ErrorResponseResult);
        });
  });
};

export const getShipmentsMethods = (): Promise<Shipment[]> => {
  return new Promise((resolve, reject) => {
    axios.get<ShipmentResponseResult>(`${ API_URLS.imrev }/shipments`)
        .then((response) => {
          resolve(response.data.result);
        })
        .catch((error) => {
          reject(error.response?.data as LoginErrorResponse);
        });
  });
};
