import { useWatch, type Control, type FieldErrors, type FieldPath, type FieldValues } from 'react-hook-form';
import { useEffect } from 'react';
import { Icon, Input } from '../components.js';
import debounce from 'debounce';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  isLabelHidden: boolean;
  label: string;
  name: FieldPath<T>;
  onChange: (search: string) => void;
  placeholder: string;
};

const Search = <T extends FieldValues>({ control, errors, label, name, onChange, placeholder }: Properties<T>) => {
  const value = useWatch({
    control,
    name,
  });

  useEffect(() => {
    const debouncedOnChange = debounce((val: string) => {
      onChange(val);
    }, 300);

    debouncedOnChange(value ?? '');

    return () => {
      debouncedOnChange.clear();
    };
  }, [onChange, value]);

  return (
    <Input
      control={control}
      errors={errors}
      label={label}
      isLabelHidden
      leftIcon={<Icon height={20} name="search" width={20} />}
      name={name}
      placeholder={placeholder}
      type="search"
    />
  );
};

export { Search };
