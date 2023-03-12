import styles from './Message.module.css';
import TextArea from '../../../inputs/TextArea/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCamera,
  faPaperPlane,
  faPlus,
  faSpinner,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { PENDING } from '../../../../Helpers/loadingStates';
import AttachmentPicker from '../../../inputs/AttachmentPicker/AttachmentPicker';
import { func, object, string } from 'prop-types';
import { useState } from 'react';

Message.propTypes = {
  handleSubmit: func,
  data: object,
  handleFilesPicked: func,
  handleChange: func,
  handleTyping: func,
  handleDoneTyping: func,
  text: string,
  takePhoto: func,
  startStreaming: func,
  stopStreaming: func,
};

export default function Message({
  handleSubmit,
  text,
  handleFilesPicked,
  handleChange,
  handleDoneTyping,
  handleTyping,
  takePhoto,
  startStreaming,
  stopStreaming,
}) {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore(prevState => !prevState);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextArea
        name="text"
        onChange={handleChange}
        placeholder="Talk"
        onKeyDown={handleTyping}
        onKeyUp={handleDoneTyping}
        className={styles.textArea}
        value={text}
        rows={5}
      />
      <div className={styles.controls}>
        <button className={styles.send} disabled={status === PENDING}>
          <FontAwesomeIcon
            icon={status === PENDING ? faSpinner : faPaperPlane}
          />
        </button>
        <button className={styles.camera} onClick={toggleShowMore}>
          <FontAwesomeIcon className={styles.icon} icon={faPlus} />
        </button>
      </div>

      {showMore && (
        <div
          className={styles.more}
          style={{ display: showMore ? 'grid' : 'none' }}>
          <AttachmentPicker multiple={true} onChange={handleFilesPicked} />
          <button className={styles.camera} onClick={takePhoto}>
            <FontAwesomeIcon className={styles.icon} icon={faCamera} />
          </button>
          <button className={styles.camera} onClick={startStreaming}>
            <FontAwesomeIcon className={styles.icon} icon={faVideo} />
          </button>
        </div>
      )}
    </form>
  );
}
