import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { updateProfile } from '../../api/userRequests.ts';
import { getCities, getStreets, getWarehouses } from '../../api/shipmentRequests.ts';
import useDebounce from '../../hooks/useDebounce.ts';
import { Button } from '@headlessui/react';
import { useProfileStore } from '../../store/profileStore.ts';
import { ICity, IDeliveryForm, IStreet, IWarehouse } from '../../types.ts';


const DeliveryForm: React.FC = () => {
  const profile = useProfileStore(state => state.user);
  const {
    reset,
    resetField,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting }
  } = useForm<IDeliveryForm>({
    defaultValues: {
      first_name: '',
      last_name: '',
      middle_name: '',
      phone: '',
      payment_id: 1,
      shipment: {
        shipment_id: 18,
        shipment_type: 'warehouse',
        region: '',
        region_guid: '',
        city: '',
        city_guid: '',
        warehouse: '',
        warehouse_guid: '',
        street: '',
        street_guid: '',
        building: '',
        apartment: '',
        shipment_message: '',
      },
    },
  });

  const [cities, setCities] = useState<ICity[]>([]);
  const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [streets, setStreets] = useState<IStreet[]>([]);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const citySuggestionsRef = useRef<HTMLUListElement>(null);

  const shipmentType = watch('shipment.shipment_type');


  useEffect(() => {
    if ( profile ) {
      reset({
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        middle_name: profile?.middle_name,
        phone: profile?.phone,
      });
    }

  }, [reset, profile]);

  useEffect(() => {
    resetField('shipment.warehouse', undefined);
    resetField('shipment.street', undefined);
    resetField('shipment.building', undefined);
    resetField('shipment.apartment', undefined);
  }, [shipmentType, resetField]);


  const debouncedQuery = useDebounce(query, 500);

  // Виконання запиту до API, коли debouncedQuery змінюється
  useEffect(() => {
    if ( !debouncedQuery ) return;

    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const response = await getCities(debouncedQuery);

        setCities(response.data || []);
      } catch ( error ) {
        console.error('Помилка отримання міст:', error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [debouncedQuery]);

  // Завантаження відділень для вибраного міста
  const loadWarehouses = async (cityRef: string) => {
    if ( !cityRef ) return;
    setShowSuggestions(true); // Показуємо список при введенні
    try {
      const response = await getWarehouses(cityRef);
      setWarehouses(response.data || []);
    } catch ( error ) {
      console.error('Помилка отримання відділень:', error);
    }
  };

  // Завантаження вулиць для вибраного міста
  const loadStreets = async (cityRef: string) => {
    if ( !cityRef ) return;
    try {
      const response = await getStreets(cityRef);
      setStreets(response.data || []);
    } catch ( error ) {
      console.error('Помилка отримання вулиць:', error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
        cityInputRef.current && !cityInputRef.current.contains(event.target as Node) &&
        citySuggestionsRef.current && !citySuggestionsRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onSubmit = (data: IDeliveryForm) => {
    const payload = {
      ...data,
      shipment: {
        ...data.shipment,
        city_guid: cities.find((c) => c.Description === data.shipment.city)?.Ref || '',
        warehouse_guid: warehouses.find((w) => w.Description === data.shipment.warehouse)?.Ref || '',
        street_guid: streets.find((s) => s.Description === data.shipment.street)?.Ref || '',
      },
    };

    console.log('Дані для сервера:', payload);

    updateProfile(payload)
        .then(() => {
          alert('Дані збережено успішно!');
        })
        .catch((error) => {
          console.error('Помилка збереження даних:', error);
          alert('Не вдалося зберегти дані.');
        });
  };



  return (
      <form onSubmit={ handleSubmit(onSubmit) } className="space-y-4">
        <div className={ 'mt-5 mb-2 text-2xl/9 font-bold tracking-tight text-gray-900' }>
          Shipment Info
        </div>
        <div>
          <label className="block text-sm font-medium">Тип доставки</label>
          <Controller
              name="shipment.shipment_type"
              control={ control }
              render={ ({ field }) => (
                  <select { ...field } className="block w-full border rounded-md p-2">
                    <option value="warehouse">На відділення</option>
                    <option value="courier">Кур'єрська доставка</option>
                  </select>
              ) }
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Населений пункт</label>
          <Controller
              name="shipment.city"
              control={ control }
              render={ ({ field }) => (
                  <input
                      { ...field }
                      ref={cityInputRef}
                      className="block w-full border rounded-md p-2"
                      onChange={ (e) => {
                        field.onChange(e);
                        setQuery(e.target.value);
                      } }
                      onFocus={ () => setShowSuggestions(true) }
                      placeholder="Введіть місто..."
                  />
              ) }
          />
          { loadingCities && <p>Завантаження...</p> }
          { showSuggestions && (
              <ul ref={citySuggestionsRef}  className="max-h-60 overflow-y-auto border mt-1 rounded-md shadow-lg">
                { cities.map((city) => (
                    <li
                        key={ city.Ref }
                        onClick={ () => {
                          setValue('shipment.city', city.Description);
                          loadWarehouses(city.Ref);

                          if ( shipmentType === 'courier' ) {
                            loadStreets(city.Ref);
                          }
                          setQuery(city.Description);
                          setShowSuggestions(false);
                        } }
                        className="cursor-pointer hover:bg-gray-100 p-2"
                    >
                      { city.Description }
                    </li>
                )) }
              </ul>
          ) }
        </div>
        { shipmentType === 'warehouse' ? (
            <div>
              <label className="block text-sm font-medium">Відділення</label>
              <Controller
                  name="shipment.warehouse"
                  control={ control }
                  render={ ({ field }) => (
                      <select { ...field } className="block w-full border rounded-md p-2">
                        { warehouses.map((warehouse) => (
                            <option key={ warehouse.Ref } value={ warehouse.Description }>
                              { warehouse.Description }
                            </option>
                        )) }
                      </select>
                  ) }
              />
            </div>
        ) : (
            <>
              <div>
                <label className="block text-sm font-medium">Вулиця</label>
                <Controller
                    name="shipment.street"
                    control={ control }
                    render={ ({ field }) => (
                        <select { ...field } className="block w-full border rounded-md p-2">
                          { streets.map((street) => (
                              <option key={ street.Ref }
                                      onClick={ () => {
                                        setValue('shipment.street', street.Description);
                                      } }
                                      value={ street.Description }>
                                { street.Description }
                              </option>
                          )) }
                        </select>
                    ) }
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Будинок</label>
                <Controller
                    name="shipment.building"
                    control={ control }
                    render={ ({ field }) => <input { ...field } className="block w-full border rounded-md p-2"/> }
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Квартира</label>
                <Controller
                    name="shipment.apartment"
                    control={ control }
                    render={ ({ field }) => <input { ...field } className="block w-full border rounded-md p-2"/> }
                />
              </div>
            </>

        ) }

        <Button disabled={ isSubmitting }
                type="submit"
                className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[disabled]:bg-gray-500">
          Save
        </Button>
      </form>
  );
};

export default DeliveryForm;
