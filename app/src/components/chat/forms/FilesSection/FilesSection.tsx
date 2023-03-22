import styles from './FilesSection.module.css';
import { FaFile } from 'react-icons/fa';
import { IFile } from '../../../../types/message';

interface IFilesSectionProps {
  files: IFile[];
}

export default function FilesSection({ files }: IFilesSectionProps) {
  return (
    <div className={styles.container}>
      {files?.map(file => {
        const { name, type } = file;

        return (
          <div key={name} className={styles.imageContainer}>
            {type.split('/')?.[0] === 'image' && (
              <img src={URL.createObjectURL(file as unknown as Blob)} alt="" />
            )}
            {type.split('/')?.[0] !== 'image' && <FaFile />}
          </div>
        );
      })}
    </div>
  );
}
