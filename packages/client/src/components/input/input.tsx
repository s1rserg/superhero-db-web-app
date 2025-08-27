import { useController, type Control, type FieldErrors, type FieldPath, type FieldValues } from 'react-hook-form';
import styles from './styles.module.css';
import { getValidClassNames } from '~/helpers/helpers';
import { JSX } from 'react';

type Properties<T extends FieldValues> = {
  autoComplete?: string;
  control?: Control<T, null>;
  errors?: FieldErrors<T>;
  name: FieldPath<T>;
  label: string;
  leftIcon?: JSX.Element;
  placeholder?: string;
  rightIcon?: JSX.Element;
  type?: 'email' | 'password' | 'search' | 'text' | 'file' | 'number';
  onImageChange?: (file: File | null) => void;
};

const Input = <T extends FieldValues>({
  autoComplete,
  control,
  errors,
  label,
  leftIcon,
  name,
  placeholder = '',
  rightIcon,
  type = 'text',
  onImageChange,
}: Properties<T>) => {
  const { field } = useController({ control, name });
  const error = errors ? errors[name]?.message : undefined;
  const hasError = Boolean(error);
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(rightIcon);
  const isFileInput = type === 'file';

  const inputClassNames = getValidClassNames(
    styles['input-field'],
    hasLeftIcon && styles['with-left-icon'],
    hasRightIcon && styles['with-right-icon']
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onImageChange?.(file);
    field.onChange(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    field.onChange(e.target.value);
  };

  return (
    <label className={styles['input-label']}>
      <span className={styles['input-label-text']}>{label}</span>
      <div className={styles['input-container']}>
        {hasLeftIcon && (
          <div className={getValidClassNames(styles['input-icon'], styles['input-icon-left'])}>{leftIcon}</div>
        )}

        <input
          autoComplete={isFileInput ? undefined : autoComplete}
          className={inputClassNames}
          name={field.name}
          onChange={isFileInput ? handleFileChange : handleChange}
          placeholder={placeholder}
          type={type}
          value={isFileInput ? undefined : (field.value ?? '')}
        />

        {hasRightIcon && (
          <div className={getValidClassNames(styles['input-icon'], styles['input-icon-right'])}>{rightIcon}</div>
        )}
      </div>

      {hasError && <span className={styles['input-error']}>{error as string}</span>}
    </label>
  );
};

export { Input };
