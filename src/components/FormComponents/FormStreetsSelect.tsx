import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { getStreets } from '../../api/shipmentRequests.ts';
import { FC, useEffect } from 'react';
import { useShipmentStore } from '../../store/shipmentStore.ts';


type FormStreetsSelectProps = {
  cityRef: string | null
}

const FormStreetsSelect: FC<FormStreetsSelectProps> = ({ cityRef }) => {
  const { control } = useFormContext();
  const streets = useShipmentStore(state => state.streets);
  const setStreets = useShipmentStore(state => state.setStreets);

  useEffect(() => {

    if ( cityRef ) {
      getStreets(cityRef)
          .then(({ data }) => {
            setStreets(data);
          })
          .catch((error) => {
            console.error(error);
          });
    } else {
      setStreets([]);
    }

  }, [cityRef, setStreets]);

  return (
      <div className={ 'w-1/2' }>
        <label className="block mb-2 text-sm font-medium">Вулиця</label>
        <Controller
            name="street_guid"
            control={ control }
            render={ ({ field }) => (
                <Select { ...field }
                        options={ streets }
                        onChange={ (newValue) => {
                          field.onChange(newValue?.Ref);
                        } }
                        value={ streets.find((x) => x.Ref === field.value) }
                        getOptionLabel={ (option) => option.Description }
                        getOptionValue={ (option) => option.Ref }
                        noOptionsMessage={ () => 'Не знайдено вулицю' }
                        placeholder="Виберіть вулицю..."/>
            ) }
        />
      </div>
  );
};

export default FormStreetsSelect;
