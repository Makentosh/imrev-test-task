import { UseFormSetError, Path } from "react-hook-form";

export const setFormErrorByApi = <T extends Record<string, unknown>>(
    setError: UseFormSetError<T>,
    errors: Partial<Record<keyof T, string>>
) => {
  Object.entries(errors).forEach(([key, message]) => {
    setError(key as Path<T>, {
      type: "server",
      message: message!,
    });
  });
};

export const formErrorsChecker = <T extends Record<string, unknown>>(
    error: unknown,
    setError: UseFormSetError<T>
) => {
  if (error && typeof error === "object" && "errors" in error) {
    const apiErrors = (error as { errors: Partial<Record<keyof T, string>> }).errors;
    setFormErrorByApi(setError, apiErrors);
  } else if (error instanceof Error && error.message) {
    alert(error.message);
  } else {
    alert("Неочікувана помилка!");
  }
};
