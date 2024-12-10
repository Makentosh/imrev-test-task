import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { BaseAutocompleteProps } from '../../types.ts';


const BaseAutocomplete: React.FC<BaseAutocompleteProps> = ({
                                                             name,
                                                             placeholder = 'Search...',
                                                             suggestions,
                                                             isLoading,
                                                             showSuggestions,
                                                             onInputChange,
                                                             onSuggestionClick,
                                                             onFocus
                                                           }) => {
  const { control } = useFormContext();

  return (
      <div className="relative w-full max-w-sm">
        <Controller
            name={ name }
            control={ control }
            defaultValue=""
            rules={ { required: 'This field is required' } }
            render={ ({ field, formState: { errors } }) => {
              const errorMessage = errors[name]?.message;

              return (
                  <>
                    <input
                        { ...field }
                        value={ field.value.label }
                        onChange={ onInputChange }
                        onFocus={ onFocus }
                        placeholder={ placeholder }
                        className="w-full border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />

                    { errorMessage && (
                        <div className="text-sm text-red-600 mt-1">{ errorMessage as string }</div>
                    ) }
                  </>

              );
            } }
        />
        { isLoading && (
            <div
                className="absolute right-3 top-3 w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        ) }
        { showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1">
              { suggestions.map((suggestion) => (
                  <li
                      key={ suggestion.value }
                      onClick={ () => onSuggestionClick(suggestion) }
                      className="cursor-pointer px-4 py-2 hover:bg-indigo-100 text-gray-900"
                  >
                    { suggestion.label }
                  </li>
              )) }
            </ul>
        ) }
      </div>
  );
};

export default BaseAutocomplete;
