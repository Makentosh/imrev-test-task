import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';

type FormContextProviderProps<T extends FieldValues> = {
  children: ReactNode;
  methods: UseFormReturn<T>;
};

const FormContextProvider = <T extends FieldValues>({ children, methods }: FormContextProviderProps<T>) => {
  return (
      <FormProvider {...methods}>
          { children }
      </FormProvider>
  );
};

export default FormContextProvider;

