import { Controller, useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { getWarehouses } from '../../api/shipmentRequests.ts';
import { FC, useEffect } from 'react';
import { useShipmentStore } from '../../store/shipmentStore.ts';


type FormWarehouseSelectProps = {
  cityRef: string | null
}

const FormWarehouseSelect: FC<FormWarehouseSelectProps> = ({ cityRef }) => {
  const { control } = useFormContext();
  const warehouses = useShipmentStore(state => state.warehouses);
  const setWarehouses = useShipmentStore(state => state.setWarehouses);

  useEffect(() => {

    if ( cityRef ) {
      getWarehouses(cityRef)
          .then(({ data }) => {
            setWarehouses(data);
          })
          .catch((error) => {
            console.error(error);
          });
    } else {
      setWarehouses([]);
    }

  }, [cityRef, setWarehouses]);

  return (
      <div className={ 'w-1/2' }>
        <label className="block text-sm font-medium">Відділення</label>
        <Controller
            name="warehouse_guid"
            control={ control }
            render={ ({ field }) => (
                <Select { ...field }
                        options={ warehouses }
                        onChange={ (newValue) => {
                          field.onChange(newValue?.Ref);
                        } }
                        value={ warehouses.find((x) => x.Ref === field.value) }
                        getOptionLabel={ (option) => option.Description }
                        getOptionValue={ (option) => option.Ref }
                        noOptionsMessage={ () => 'Не знайдено відділень' }
                        placeholder="Виберіть відділення..."/>
            ) }
        />
      </div>
  );
};

export default FormWarehouseSelect;
