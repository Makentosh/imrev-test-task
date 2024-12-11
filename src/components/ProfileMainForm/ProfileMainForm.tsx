import { useEffect } from 'react';
import { Button } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { FormTextField } from '../FormComponents';
import { useProfileStore } from '../../store/profileStore.ts';
import { ProfileFormData, ShipmentType, UserResult } from '../../types.ts';
import { updateProfile } from '../../api/userRequests.ts';
import { formErrorsChecker } from '../../utils/formErrors.ts';
import FormContextProvider from '../FormComponents/FormContextProvider.tsx';
import FormShipmentTypeRadio from '../FormComponents/FormShipmentTypeRadio.tsx';
import FormCitySelect from '../FormComponents/FormCitySelect.tsx';
import FormShipmentCourierFields from '../FormComponents/FormShipmentCourierFields.tsx';
import FormWarehouseSelect from '../FormComponents/FormWarehouseSelect.tsx';
import { useShipmentStore } from '../../store/shipmentStore.ts';

const ProfileMainForm = () => {
  const profile = useProfileStore(state => state.user);
  const shipmentTypes = useShipmentStore(state => state.shipmentTypes);
  const cities = useShipmentStore(state => state.city);
  const warehouses = useShipmentStore(state => state.warehouses);
  const streets = useShipmentStore(state => state.streets);

  const { ...methods } = useForm<ProfileFormData>({
    defaultValues: {
      shipment_type: ShipmentType.warehouse
    }
  });

  const { watch, setError, reset, formState: { isSubmitting } } = methods;

  const shipmentType = watch('shipment_type');
  const cityRef = watch('city_guid');

  useEffect(() => {
    reset({
      first_name: profile?.first_name,
      last_name: profile?.last_name,
      middle_name: profile?.middle_name,
      phone: profile?.phone,
      shipment_type: profile?.shipment?.shipment_type,
      city_guid: profile?.shipment?.city_guid,
      warehouse_guid: profile?.shipment?.warehouse_guid,
      street_guid: profile?.shipment?.street_guid,
      building: profile?.shipment?.building,
      apartment: profile?.shipment?.apartment,
      ...profile
    });

  }, [profile, reset]);


  const onSubmit = async (data: ProfileFormData) => {

    const formData: UserResult = {
      ...profile,
      first_name: data?.first_name,
      last_name: data?.last_name,
      middle_name: data?.middle_name,
      phone: data?.phone,
      shipment: {
        shipment_type: data.shipment_type,
        shipment_id: shipmentTypes[0].id,
        city: cities.find((c) => c.Ref === data?.city_guid)?.Description,
        city_guid: cities.find((c) => c.Ref === data?.city_guid)?.Ref,
        warehouse: warehouses.find((c) => c.Ref === data?.warehouse_guid)?.Description,
        warehouse_guid: warehouses.find((c) => c.Ref === data?.warehouse_guid)?.Ref,
        street: streets.find((c) => c.Ref === data?.street_guid)?.Description,
        street_guid: streets.find((c) => c.Ref === data?.street_guid)?.Ref,
        building: data?.building,
        apartment: data?.apartment
      }
    };

    try {

      await updateProfile(formData);

      alert('Збережено успішно');

    } catch ( error: unknown ) {
      formErrorsChecker<ProfileFormData>(error, setError);
    }
  };


  return (
      <div className="mt-5 sm:w-full sm:max-w-2xl">
        <div className={ 'text-2xl/9 font-bold tracking-tight text-gray-900' }>
          Main Info
        </div>
        <FormContextProvider methods={ methods }
                             onSubmit={ onSubmit }>
          <div className={ 'flex gap-2.5' }>
            <FormTextField type={ 'text' }
                           name={ 'first_name' }
                           required
                           className={ 'w-full' }
                           placeholder={ 'Enter your first_name' }/>

            <FormTextField type={ 'text' }
                           className={ 'w-full' }
                           name={ 'last_name' }
                           placeholder={ 'Enter your last_name' }/>
          </div>


          <div className={ 'flex gap-2.5' }>
            <FormTextField type={ 'text' }
                           className={ 'w-full' }
                           name={ 'middle_name' }
                           placeholder={ 'Enter your middle_name' }/>

            <FormTextField type={ 'tel' }
                           className={ 'w-full' }
                           name={ 'phone' }
                           placeholder={ 'Enter your phone' }/>
          </div>


          <div className={ 'flex' }>
            <FormShipmentTypeRadio/>
          </div>

          <div>
            <FormCitySelect/>
          </div>

          { shipmentType === ShipmentType.warehouse
              ? <FormWarehouseSelect cityRef={ cityRef }/>
              : <FormShipmentCourierFields cityRef={ cityRef }/> }


          <div>
            <Button disabled={ isSubmitting }
                    type="submit"
                    className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[disabled]:bg-gray-500">
              Save
            </Button>
          </div>
        </FormContextProvider>
      </div>
  );
};

export default ProfileMainForm;
