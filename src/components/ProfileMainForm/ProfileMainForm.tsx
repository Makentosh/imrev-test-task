import { useEffect } from 'react';
import { Button } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import FormContextProvider from '../FormComponents/FormContextProvider.tsx';
import { FormTextField } from '../FormComponents';
import { useProfileStore } from '../../store/profileStore.ts';
import { ProfileUpdate } from '../../types.ts';
import { updateProfile } from '../../api/userRequests.ts';
import { formErrorsChecker } from '../../utils/formErrors.ts';

const ProfileMainForm = () => {
  const profile = useProfileStore(state => state.user);
  const { ...methods } = useForm<ProfileUpdate>();

  const { setError, handleSubmit, reset, formState: { isSubmitting } } = methods;

  useEffect(() => {
    reset({
      first_name: profile?.first_name,
      last_name: profile?.last_name,
      middle_name: profile?.middle_name,
      phone: profile?.phone,
    });
  }, [profile, reset]);

  const preSubmit = () => {
    handleSubmit(submit)();
  };

  const submit = async (data: ProfileUpdate) => {

    try {
      await updateProfile(data);

    } catch ( error: unknown ) {
      formErrorsChecker<ProfileUpdate>(error, setError);
    }
  };


  return (
      <div className="mt-5 sm:w-full sm:max-w-2xl">
        <div className={ 'text-2xl/9 font-bold tracking-tight text-gray-900' }>
          Main Info
        </div>
        <FormContextProvider methods={ methods }>
          <form className="space-y-6">
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


            <div>
              <Button onClick={ preSubmit }
                      disabled={ isSubmitting }
                      type="button"
                      className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[disabled]:bg-gray-500">
                Save
              </Button>
            </div>
          </form>
        </FormContextProvider>
      </div>
  );
};

export default ProfileMainForm;
