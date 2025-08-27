import { Input, Button, ImageInput } from '~/components/components';
import { useAppForm } from '~/hooks/hooks';
import styles from './styles.module.css';
import { SuperheroCreateRequestDTO, SuperheroCreateRequestSchema } from '~/common/types/types';
import { DEFAULT_SUPERHERO_CREATE_PAYLOAD } from './libs/constants/default-superhero-create-payload.constant';

type Props = {
  onSubmit: (payload: SuperheroCreateRequestDTO) => void;
};

const SuperheroCreateForm = ({ onSubmit }: Props) => {
  const { control, errors, handleSubmit } = useAppForm<SuperheroCreateRequestDTO>({
    defaultValues: DEFAULT_SUPERHERO_CREATE_PAYLOAD,
    validationSchema: SuperheroCreateRequestSchema,
  });

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit((formData: SuperheroCreateRequestDTO) => {
      onSubmit(formData);
    })(event_);
  };

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <Input label="Nickname" name="nickname" control={control} errors={errors} />
      <Input label="Real name" name="realName" control={control} />
      <Input label="Origin description" name="originDescription" control={control} rowsCount={4} />
      <Input label="Superpowers" name="superpowers" control={control} rowsCount={4} />
      <Input label="Catch phrase" name="catchPhrase" control={control} rowsCount={2} />
      <ImageInput control={control} name="images" label="Images" placeholder="Add Superhero images" />

      <div className={styles['button-wrapper']}>
        <Button label="Create Superhero" />
      </div>
    </form>
  );
};

export { SuperheroCreateForm };
