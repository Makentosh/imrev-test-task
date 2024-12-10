import React from 'react';

export type TLoginForm = {
  email: string,
  password: string
}

export type TextFieldProps = {
  name: string,
  type: string,
  placeholder?: string,
  required?: boolean
  className?: string,
}


export type LoginResponseResult = {
  access_token: string;
  token_type: string;
}

export type LoginResponse = {
  success: boolean;
  result: LoginResponseResult;
}

export type ProfileResponseResult = {
  success: boolean;
  result: UserResult
}

export type LoginErrorResponse = {
  message: string;
  code: number;
}


export type ShipmentTypes = {
  id: number,
  key: string,
  title: string
};

export type Shipment = {
  id: number,
  key: string,
  is_api: boolean,
  title: string,
  types: ShipmentTypes[]
  payments: unknown[]
}

export type UserResult = {
  promo_code: number | null,
  id: number | null,
  first_name: string,
  last_name: string,
  middle_name: string,
  birthday: string | null,
  gender: string | null,
  email: string | null,
  phone: string,
  payment_id: number,
  shipment: {
    shipment_id: number | null,
    shipment_type: string | null,
    region: string | null,
    region_guid: string | null,
    city: string | null,
    city_guid: string | null,
    warehouse: string | null,
    warehouse_guid: string | null,
    street: string | null,
    street_guid: string | null,
    building: string | null,
    apartment: string | null,
    shipment_message: string | null
  },
  shipments: Shipment[]
}

export type ErrorResponseResult = {
  success: boolean
  message: string
}


export type ProfileUpdate = {
  first_name: string,
  last_name: string,
  middle_name?: string,
  phone?: string,
}

export type NpCityType = {
  Description: string,
  DescriptionRu: string,
  Ref: string,
  Delivery1: string,
  Delivery2: string,
  Delivery3: string,
  Delivery4: string,
  Delivery5: string,
  Delivery6: string,
  Delivery7: string,
  Area: string,
  SettlementType: string,
  IsBranch: string,
  PreventEntryNewStreetsUser: string,
  CityID: string,
  SettlementTypeDescription: string,
  SettlementTypeDescriptionRu: string,
  SpecialCashCheck: number,
  AreaDescription: string,
  AreaDescriptionRu: string
}

export type NpRequestResult<T> = {
  success: true,
  data: T[],
  errors: unknown[],
  warnings: unknown[],
  info: {
    totalCount: number
  },
  messageCodes: unknown[],
  errorCodes: unknown[],
  warningCodes: unknown[],
  infoCodes: unknown[]
}

export type SuggestionType = {
  value: string;
  label: string;
}

export type BaseAutocompleteProps = {
  name: string;
  placeholder?: string;
  suggestions: SuggestionType[];
  isLoading: boolean;
  showSuggestions: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSuggestionClick: (suggestion: SuggestionType) => void;
  onFocus: () => void;
}

export type NpWarehouseType = {
  SiteKey: number,
  Description: string,
  DescriptionRu:string,
  ShortAddress: string,
  ShortAddressRu: string,
  Phone: number,
  TypeOfWarehouse: string,
  Ref: string,
  Number: number,
  CityRef: string,
  CityDescription: string,
  CityDescriptionRu: string,
  SettlementRef:string,
  SettlementDescription: string,
  SettlementAreaDescription: string,
  SettlementRegionsDescription: string,
  SettlementTypeDescription: string,
  SettlementTypeDescriptionRu: string,
  Longitude: number,
  Latitude: number,
  PostFinance: number,
  BicycleParking: number,
  PaymentAccess: number,
  POSTerminal: number,
  InternationalShipping: number,
  SelfServiceWorkplacesCount: number
  TotalMaxWeightAllowed: number,
  PlaceMaxWeightAllowed: number,
  SendingLimitationsOnDimensions: {
    Width: number,
    Height: number,
    Length: number
  },
  ReceivingLimitationsOnDimensions: {
    Width: number,
    Height: number,
    Length: number
  },
  Reception: {
    Monday: string
    Tuesday: string
    Wednesday: string
    Thursday: string
    Friday: string
    Saturday: string
    Sunday:string
  },
  Delivery: {
    Monday: string
    Tuesday: string
    Wednesday: string
    Thursday: string
    Friday: string
    Saturday: string
    Sunday:string
  },
  Schedule: {
    Monday: string
    Tuesday: string
    Wednesday: string
    Thursday: string
    Friday: string
    Saturday: string
    Sunday:string
  },
  DistrictCode: string,
  WarehouseStatus: string,
  WarehouseStatusDate: string,
  WarehouseIllusha: number,
  CategoryOfWarehouse: string,
  Direct: string,
  RegionCity: string,
  WarehouseForAgent: number,
  GeneratorEnabled: number,
  MaxDeclaredCost: number,
  WorkInMobileAwis: number
  DenyToSelect: number,
  CanGetMoneyTransfer: number,
  HasMirror: number,
  HasFittingRoom: number,
  OnlyReceivingParcel: number,
  PostMachineType: string,
  PostalCodeUA: number,
  WarehouseIndex: string,
  BeaconCode: string,
  Location: string
}


export interface ICity {
  Description: string;
  Ref: string;
}

export interface IWarehouse {
  Description: string;
  Ref: string;
}

export interface IShipment {
  shipment_id: number;
  shipment_type: 'warehouse' | 'courier';
  region: string;
  region_guid: string;
  city: string;
  city_guid: string;
  warehouse: string;
  warehouse_guid: string;
  street: string;
  street_guid: string;
  building: string;
  apartment: string;
  shipment_message: string;
}

export interface IDeliveryForm {
  first_name: string;
  last_name: string;
  middle_name?: string;
  phone: string;
  birthday?: string;
  gender?: string;
  payment_id: number;
  shipment: IShipment;
}

export interface IStreet {
  Description: string;
  Ref: string;
}
