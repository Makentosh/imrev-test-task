import { FormTextField } from './index.ts';
import { FC } from 'react';
import FormStreetsSelect from './FormStreetsSelect.tsx';

type FormShipmentCourierFieldsProps = {
  cityRef: string | null;
}

const FormShipmentCourierFields: FC<FormShipmentCourierFieldsProps> = ({ cityRef }) => {

  return (
      <div>
        <FormStreetsSelect cityRef={ cityRef }/>
        <div className={ 'w-1/2' }>
          <FormTextField name={ 'building' }
                         required
                         label={ 'Будинок' }
                         className={ 'w-full' }
                         placeholder={ 'Введіть номер будинку' }/>
        </div>
        <div className={ 'w-1/2' }>
          <FormTextField name={ 'apartment' }
                         required
                         label={ 'Квартира' }
                         className={ 'w-full' }
                         placeholder={ 'Введіть номер квартири' }/>
        </div>


      </div>
  );
};

export default FormShipmentCourierFields;
