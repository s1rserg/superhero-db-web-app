import { Input, Button, ImageInput } from '~/components/components';
import { useAppForm } from '~/hooks/hooks';
import styles from './styles.module.css';
import { SuperheroDTO, SuperheroUpdateRequestDTO, SuperheroUpdateRequestSchema } from '~/common/types/types';

type Props = {
  superhero: SuperheroDTO;
  onSubmit: (payload: SuperheroUpdateRequestDTO) => void;
};

const SuperheroUpdateForm = ({ superhero, onSubmit }: Props) => {
  const { control, errors, handleSubmit } = useAppForm<SuperheroUpdateRequestDTO>({
    defaultValues: superhero,
    validationSchema: SuperheroUpdateRequestSchema,
  });

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit((formData: SuperheroUpdateRequestDTO) => {
      onSubmit(formData);
    })(event_);
  };

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <Input label="Nickname" name="nickname" control={control} errors={errors} />
      <Input label="Real name" name="realName" control={control} errors={errors} />
      <Input label="Origin description" name="originDescription" control={control} rowsCount={4} errors={errors} />
      <Input label="Superpowers" name="superpowers" control={control} rowsCount={4} errors={errors} />
      <Input label="Catch phrase" name="catchPhrase" control={control} rowsCount={2} errors={errors} />
      <ImageInput control={control} name="images" label="Images" placeholder="Add Superhero images" errors={errors} />

      <div className={styles['button-wrapper']}>
        <Button label="Update Superhero" />
      </div>
    </form>
  );
};

export { SuperheroUpdateForm };
