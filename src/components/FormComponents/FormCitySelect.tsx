import { Controller, useFormContext } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import { getCities } from '../../api/shipmentRequests.ts';
import useDebounce from '../../hooks/useDebounce.ts';
import { useShipmentStore } from '../../store/shipmentStore.ts';

const FormCitySelect = () => {
  const { control } = useFormContext();
  const city = useShipmentStore(state => state.city);
  const setCity = useShipmentStore(state => state.setCity);

  const loadOptions = useDebounce(async (inputValue: string, callback: (opt: unknown[]) => void) => {
    if ( !inputValue ) {
      callback([]);
      return;
    }
    try {
      const { data } = await getCities(inputValue);
      callback(data);
      setCity(data);
    } catch ( error ) {
      console.error('Помилка завантаження:', error);
      callback([]);
    }
  }, 500);


  return (
      <div className={ 'w-1/2' }>
        <label className="block text-sm font-medium mb-2">Місто</label>
        <Controller
            name="city_guid"
            control={ control }
            render={ ({ field }) => (
                <AsyncSelect { ...field }
                             loadOptions={ (inputValue, callback) => loadOptions(inputValue, callback) }
                             cacheOptions
                             onChange={ (newValue) => {
                               field.onChange(newValue!.Ref);
                             } }
                             value={ city.find((x) => x.Ref === field.value) }
                             defaultOptions={ city }
                             getOptionLabel={ (option) => option.Description }
                             getOptionValue={ (option) => option.Ref }
                             noOptionsMessage={ () => 'Не знайдено міст' }
                             placeholder="Введіть місто..."/>
            ) }
        />
      </div>
  );
};

export default FormCitySelect;
