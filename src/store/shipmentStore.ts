import { create } from 'zustand';
import { NpCityType, NpStreetsType, NpWarehouseType, Shipment } from '../types.ts';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = {
  shipmentTypes: Shipment[] | [],
  city: NpCityType[] | []
  warehouses: NpWarehouseType[] | [],
  streets: NpStreetsType[] | []
}

type Actions = {
  setShipmentTypes: (shipmentType: Shipment[]) => void,
  setCity: (city: NpCityType[]) => void,
  setWarehouses: (warehouses: NpWarehouseType[]) => void,
  setStreets: (streets: NpStreetsType[]) => void,
}

export const useShipmentStore = create<State & Actions>()(
    persist<State & Actions>(
        (set) => ({
          shipmentTypes: [],
          city: [],
          warehouses: [],
          streets: [],
          setShipmentTypes: (shipment: Shipment[]) => set((state) => ({ ...state, shipmentTypes: shipment })),
          setCity: (city: NpCityType[]) => set((state) => ({ ...state, city })),
          setWarehouses: (warehouses: NpWarehouseType[]) => set((state) => ({ ...state, warehouses })),
          setStreets: (streets: NpStreetsType[]) => set((state) => ({ ...state, streets })),
        }),
        {
          name: 'shipment-storage',
          storage: createJSONStorage(() => localStorage),
        },
    ));
