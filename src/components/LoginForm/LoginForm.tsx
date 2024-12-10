import { Button } from '@headlessui/react';
import { loginUser } from '../../api/userRequests.ts';
import { FormTextField } from '../FormComponents';
import { LoginResponseResult, TLoginForm } from '../../types.ts';
import { useForm } from 'react-hook-form';
import FormContextProvider from '../FormComponents/FormContextProvider.tsx';
import { formErrorsChecker } from '../../utils/formErrors.ts';
import { useAuthStore } from '../../store/authStore.ts';
import useAuth from '../../hooks/useAuth.ts';

const LoginForm = () => {
  const { ...methods } = useForm<TLoginForm>({});
  const login = useAuthStore(state => state.loginAction);
  const { setAuthToken } = useAuth();

  const { setError, formState: { isSubmitting } } = methods;

  const preSubmit = () => {
    methods.handleSubmit(submit)();
  };

  const submit = async (data: TLoginForm) => {

    try {
      const response: LoginResponseResult = await loginUser(data);
      login();
      setAuthToken(response);
    } catch ( error: unknown ) {
      formErrorsChecker<TLoginForm>(error, setError);
    }
  };


  return (
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 min-w-96">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <FormContextProvider methods={ methods }>
            <form className="space-y-6">
              <FormTextField type={ 'email' }
                             name={ 'email' }
                             required
                             placeholder={ 'Enter your email' }/>

              <FormTextField type={ 'password' }
                             name={ 'password' }
                             required
                             placeholder={ 'Enter your password' }/>

              <div>
                <Button onClick={ preSubmit }
                        disabled={ isSubmitting }
                        type="button"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[disabled]:bg-gray-500">
                  Sign in
                </Button>
              </div>
            </form>
          </FormContextProvider>
        </div>
      </div>
  );
};

export default LoginForm;
