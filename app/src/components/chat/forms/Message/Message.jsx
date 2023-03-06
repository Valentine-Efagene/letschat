import styles from './Message.module.css';
import TextArea from '../../../inputs/TextArea/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PENDING } from '../../../../Helpers/loadingStates';
import AttachmentPicker from '../../../inputs/AttachmentPicker/AttachmentPicker';
import { func, object } from 'prop-types';

Message.propTypes = {
  handleSubmit: func,
  data: object,
  handleImagesPicked: func,
  handleChange: func,
  handleTyping: func,
  handleDoneTyping: func,
};

export default function Message({
  handleSubmit,
  data,
  handleImagesPicked,
  handleChange,
  handleDoneTyping,
  handleTyping,
}) {
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextArea
        name="text"
        onChange={handleChange}
        placeholder="Talk"
        onKeyDown={handleTyping}
        onKeyUp={handleDoneTyping}
        className={styles.textArea}
        value={data?.text}
        rows="5"
      />
      <div className={styles.controls}>
        <button className={styles.send} disabled={status === PENDING}>
          <FontAwesomeIcon
            icon={status === PENDING ? faSpinner : faPaperPlane}
          />
        </button>
        <AttachmentPicker multiple={true} onChange={handleImagesPicked} />
      </div>
    </form>
  );
}
