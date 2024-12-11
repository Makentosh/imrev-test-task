import { TextFieldProps } from '../../types.ts';
import { useFormContext } from 'react-hook-form';
import { FC, useState } from 'react';
import { EyeCloseIcon, EyeIcon } from '../../assets/icons';

const FormTextField: FC<TextFieldProps> = ({ required, name, type = 'text', placeholder, className, label }) => {
  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const errorMessage = errors[name]?.message;

  const handleInputType = () => {
    return setShowPassword((prev) => !prev);
  };


  return (
      <div className={ `mt-2 relative ${ className }` }>
        { type === 'password' && (
            <div onClick={ handleInputType }
                 className={ 'cursor-pointer' }>
              { showPassword
                  ? <EyeIcon className={ 'w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2' }/>
                  : <EyeCloseIcon className={ 'w-6 h-6 absolute right-2 top-1/2 -translate-y-1/2' }/>
              }
            </div>
        ) }

        { label && <label className="block mb-2 text-sm font-medium">{ label }</label> }


        <input type={ type === 'password' ? showPassword ? 'text' : 'password' : 'text' }
               { ...register(name, {
                 required: required
               }) }
               name={ name }
               placeholder={ placeholder }
               autoComplete={ 'new-password' }
               required
               className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>

        { errorMessage && (
            <span className="text-sm text-red-500">{ errorMessage as string }</span>
        ) }
      </div>
  );
};

export default FormTextField;
