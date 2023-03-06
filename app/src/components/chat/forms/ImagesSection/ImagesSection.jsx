import styles from './ImagesSection.module.css';
import TextArea from '../../../inputs/TextArea/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PENDING } from '../../../../Helpers/loadingStates';
import { array, func } from 'prop-types';

ImagesSection.propTypes = {
  handleSubmit: func,
  images: array,
  handleImagesPicked: func,
  handleChange: func,
  handleTyping: func,
  handleDoneTyping: func,
};

export default function ImagesSection({ images }) {
  return (
    <div className={styles.container}>
      {images?.map(image => {
        const { name, type } = image;

        return (
          <div key={name} className={styles.imageContainer}>
            {type.split('/')?.[0] === 'image' && (
              <img src={URL.createObjectURL(image)} alt="" />
            )}
          </div>
        );
      })}
    </div>
  );
}
