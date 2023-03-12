import styles from './FilesSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { array, func } from 'prop-types';

FilesSection.propTypes = {
  handleSubmit: func,
  files: array,
  handleImagesPicked: func,
  handleChange: func,
  handleTyping: func,
  handleDoneTyping: func,
};

export default function FilesSection({ files }) {
  return (
    <div className={styles.container}>
      {files?.map(file => {
        console.log(file);
        const { name, type } = file;

        return (
          <div key={name} className={styles.imageContainer}>
            {type.split('/')?.[0] === 'image' && (
              <img src={URL.createObjectURL(file)} alt="" />
            )}
            {type.split('/')?.[0] !== 'image' && (
              <FontAwesomeIcon icon={faFile} />
            )}
          </div>
        );
      })}
    </div>
  );
}
