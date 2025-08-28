import { useState, useEffect } from 'react';
import { useController, Control, FieldErrors, FieldValues, FieldPath } from 'react-hook-form';
import styles from './styles.module.css';
import { getValidClassNames } from '~/helpers/helpers';

interface Properties<T extends FieldValues> {
  control: Control<T, null>;
  name: FieldPath<T>;
  errors?: FieldErrors<T>;
  label: string;
  placeholder: string;
}

const ImageInput = <T extends FieldValues>({ control, name, errors, label, placeholder }: Properties<T>) => {
  const { field } = useController({ name, control });
  const [previews, setPreviews] = useState<(File | string)[]>([]);

  useEffect(() => {
    if (Array.isArray(field.value)) {
      setPreviews(field.value);
    }
  }, [field.value]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files);
    setPreviews((prev) => [...prev, ...newFiles]);
    field.onChange([...previews, ...newFiles]);
  };

  const removePreview = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    field.onChange(updatedPreviews);
  };

  const error = errors ? errors[name]?.message : undefined;
  const hasError = Boolean(error);

  return (
    <div className={styles['image-input']}>
      <span className={getValidClassNames(styles['image-input__label-text'])}>{label}</span>

      <label className={styles['image-input__label']}>
        {placeholder || 'Choose images'}
        <input
          type="file"
          accept="image/*"
          multiple
          className={styles['image-input__field']}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      <div className={styles['image-input__previews']}>
        {previews
          .filter((item) => item !== null)
          .map((item, index) => (
            <div key={index} className={styles['image-input__preview']}>
              {typeof item === 'string' ? (
                <img src={item} alt={`preview-${index}`} className={styles['image-input__preview-image']} />
              ) : (
                <img
                  src={URL.createObjectURL(item)}
                  alt={`preview-${index}`}
                  className={styles['image-input__preview-image']}
                />
              )}
              <button type="button" onClick={() => removePreview(index)} className={styles['image-input__remove-btn']}>
                x
              </button>
            </div>
          ))}
      </div>

      {hasError && <span className={styles['image-input__error']}>{error as string}</span>}
    </div>
  );
};

export { ImageInput };
