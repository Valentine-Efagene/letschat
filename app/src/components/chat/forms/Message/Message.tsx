import styles from './Message.module.css';
import TextArea from '../../../inputs/TextArea/TextArea';
import {
  FaSpinner,
  FaPaperPlane,
  FaPlus,
  FaCamera,
  FaVideo,
} from 'react-icons/fa';
import { PENDING } from '../../../../helpers/loadingStates';
import AttachmentPicker from '../../../inputs/AttachmentPicker/AttachmentPicker';
import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  useState,
  RefObject,
} from 'react';
import { IMessage } from '../../../../types/message';

interface IMessageProps {
  handleSubmit: FormEventHandler;
  data: IMessage;
  handleFilesPicked: (ref: RefObject<HTMLInputElement>) => void;
  handleChange: ChangeEventHandler;
  handleTyping: KeyboardEventHandler;
  handleDoneTyping: KeyboardEventHandler;
  initStream: () => void;
}

export default function Message({
  handleSubmit,
  data,
  handleFilesPicked,
  handleChange,
  handleDoneTyping,
  handleTyping,
  initStream,
}: IMessageProps) {
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore(prevState => !prevState);

  /**
   * TODO: Implement algorithm/heuristic
   *
   * @returns
   */
  const computeRows = () => {
    return 5;
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextArea
        name="text"
        required={data.files == null || data.files?.length < 1}
        onChange={handleChange}
        placeholder="Talk"
        onKeyDown={handleTyping}
        onKeyUp={handleDoneTyping}
        className={styles.textArea}
        value={data.text}
        rows={computeRows()}
      />
      <div className={styles.controls}>
        <button className={styles.send} disabled={status === PENDING}>
          {status === PENDING ? <FaSpinner /> : <FaPaperPlane />}
        </button>
        <button
          type="button"
          className={styles.camera}
          onClick={toggleShowMore}>
          <FaPlus />
        </button>
      </div>

      {showMore && (
        <div
          className={styles.more}
          style={{ display: showMore ? 'grid' : 'none' }}>
          <AttachmentPicker multiple={true} onChange={handleFilesPicked} />
          <button type="button" className={styles.camera} onClick={initStream}>
            <FaCamera className={styles.icon} />
          </button>
          <button type="button" className={styles.camera} onClick={initStream}>
            <FaVideo className={styles.icon} />
          </button>
        </div>
      )}
    </form>
  );
}
