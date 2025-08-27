import { useController, type Control, type FieldErrors, type FieldPath, type FieldValues } from 'react-hook-form';
import styles from './styles.module.css';
import { getValidClassNames } from '~/helpers/helpers';
import { JSX } from 'react';

type Properties<T extends FieldValues> = {
  autoComplete?: string;
  control?: Control<T, null>;
  errors?: FieldErrors<T>;
  label: string;
  isLabelHidden?: boolean;
  leftIcon?: JSX.Element;
  name: FieldPath<T>;
  placeholder?: string;
  rightIcon?: JSX.Element;
  rowsCount?: number;
  type?: 'search' | 'text';
};

const Input = <T extends FieldValues>({
  autoComplete,
  control,
  errors,
  label,
  isLabelHidden = false,
  leftIcon,
  name,
  placeholder = '',
  rightIcon,
  rowsCount,
  type = 'text',
}: Properties<T>) => {
  const { field } = useController({ control, name });
  const error = errors ? errors[name]?.message : undefined;
  const hasError = Boolean(error);
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(rightIcon);
  const isTextArea = Boolean(rowsCount);

  const inputClassNames = getValidClassNames(
    styles['input-field'],
    isTextArea && styles['input-textarea'],
    hasLeftIcon && styles['with-left-icon'],
    hasRightIcon && styles['with-right-icon']
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    field.onChange(e.target.value);
  };

  return (
    <label className={styles['input-label']}>
      <span className={getValidClassNames(styles['input-label-text'], isLabelHidden && 'visually-hidden')}>
        {label}
      </span>
      <div className={styles['input-container']}>
        {hasLeftIcon && (
          <div className={getValidClassNames(styles['input-icon'], styles['input-icon-left'])}>{leftIcon}</div>
        )}

        {isTextArea ? (
          <textarea
            className={inputClassNames}
            name={field.name}
            onChange={field.onChange}
            placeholder={placeholder}
            rows={rowsCount}
            value={field.value}
          />
        ) : (
          <input
            autoComplete={autoComplete}
            className={inputClassNames}
            name={field.name}
            onChange={handleChange}
            placeholder={placeholder}
            type={type}
            value={field.value ?? ''}
          />
        )}

        {hasRightIcon && (
          <div className={getValidClassNames(styles['input-icon'], styles['input-icon-right'])}>{rightIcon}</div>
        )}
      </div>

      {hasError && <span className={styles['input-error']}>{error as string}</span>}
    </label>
  );
};

export { Input };
