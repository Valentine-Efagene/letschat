import Detail from '../../components/chat/Detail/Detail';
import Master from '../../components/chat/Master/Master';
import styles from './DesktopChat.module.css';

export default function DesktopChat() {
  return (
    <div className={styles.container}>
      <div className={styles.master}>
        <Master />
      </div>
      <div className={styles.detail}>
        <Detail />
      </div>
    </div>
  );
}
