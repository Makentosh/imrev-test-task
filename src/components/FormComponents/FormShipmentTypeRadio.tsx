import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { getShipmentsMethods } from '../../api/userRequests.ts';
import { useShipmentStore } from '../../store/shipmentStore.ts';


const FormShipmentTypeRadio = () => {
  const { control } = useFormContext();
  const shipmentTypes = useShipmentStore(state => state.shipmentTypes);
  const setShipmentTypes = useShipmentStore(state => state.setShipmentTypes);

  useEffect(() => {
    getShipmentsMethods()
        .then((response) => {
          setShipmentTypes(response);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  return (
      <div>
        <div className={ 'mb-4' }>
          { shipmentTypes && shipmentTypes[0]?.title }
        </div>
        <div>
          <Controller
              name="shipment_type"
              control={ control }
              render={ ({ field }) => (
                  <RadioGroup { ...field }
                              className={ 'flex gap-5' }>
                    { shipmentTypes?.length && shipmentTypes[0]?.types?.map((item) => (
                        <Field key={ item.key }
                               className="flex items-center gap-2 cursor-pointer">
                          <Radio
                              value={ item.key }
                              className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
                          >
                            <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible"/>
                          </Radio>
                          <Label className={ 'cursor-pointer' }>{ item.title }</Label>
                        </Field>
                    )) }
                  </RadioGroup>
              ) }
          />
        </div>
      </div>

  );
};

export default FormShipmentTypeRadio;
