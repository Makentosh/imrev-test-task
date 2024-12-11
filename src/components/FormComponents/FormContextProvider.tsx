import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';

type FormContextProviderProps<T extends FieldValues> = {
  children: ReactNode;
  methods: UseFormReturn<T>;
  onSubmit: (data: T) => void
};

const FormContextProvider = <T extends FieldValues>({ children, methods, onSubmit }: FormContextProviderProps<T>) => {
  return (
      <FormProvider { ...methods }>
        <form onSubmit={ methods.handleSubmit(onSubmit) } className="space-y-4">
          { children }
        </form>
      </FormProvider>
);
};

export default FormContextProvider;

