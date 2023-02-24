import { object, oneOfType } from 'prop-types';
import { func, string } from 'prop-types';
import React, { useEffect, useRef } from 'react';
import styles from './DragAndDropFileInput.module.css';

/**
 * Since the react documentation says file input must be uncontrolled,
 * you should simpy pass in a state update function, expecting an array.
 * Then you may handle any update in the useEffect of that state, or some
 * other way.
 *
 * @param {string} icon Link to icon
 * @param {string} id HTML id
 * @param {string} className CSS class
 * @param {object} style CSS style
 * @param {string} prompt Bold prompt text
 * @param {string} info Additional information to display
 * @param {comma separated string} accept File types to accept
 * @param {state update function} setState
 * @param {object} state
 */
function DragAndDropFileInput({
  accept = '.ppt,.pptx,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, audio/*, video/*, image/*, .pdf, .csv',
  setState,
  icon,
  prompt,
  thumbnail,
  link,
  info,
  className,
  style,
  id,
  name,
  state,
}) {
  const fileInputRef = useRef();

  useEffect(() => {
    if (fileInputRef == null) return;

    if (state == null || state == '') {
      fileInputRef.current.value = '';
      fileInputRef.current.files = null;
    }
  }, [state]);

  /**
   *
   * @param {DragEvent} event
   */
  const handleDragOver = event => {
    event.preventDefault();
  };

  /**
   *
   * @param {DropEvent} event
   */
  const handleDrop = event => {
    event.preventDefault();
    const files = [];

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...event.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === 'file') {
          const file = item.getAsFile();
          //console.log(`... file[${i}].name = ${file.name}`);
          files.push(file);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...event.dataTransfer.files].forEach((file, i) => {
        //console.log(`... file[${i}].name = ${file.name}`);
        files.push(file);
      });
    }

    setState(files);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // [...fileInputRef.current.files].forEach(file => {
    //   console.log(file.name);
    // });

    setState(fileInputRef.current?.files);
  };

  return (
    <label
      htmlFor={id}
      style={style}
      className={`${className} ${styles.fileChooserLabel}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}>
      <img id={styles.thumbnail} src={thumbnail ?? icon} />
      <strong id={styles.prompt}>{prompt}</strong>
      <p id={styles.info}>{info}</p>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleSubmit}
        accept={accept}
        hidden
        multiple
        name={name}
        id={id}
      />
      {link && (
        <div className={styles.bottom}>
          <span className={styles.link}>{link}</span>
          <img
            className={styles.check}
            src="/assets/check-fill.svg"
            alt=""
          />{' '}
        </div>
      )}
    </label>
  );
}

DragAndDropFileInput.propTypes = {
  accept: string,
  setState: func.isRequired, // A react state update function
  icon: string,
  prompt: string,
  info: string,
  className: string,
  style: object,
  id: string,
  state: oneOfType([string, object]),
  name: string,
  thumbnail: string,
  link: string,
};

export default DragAndDropFileInput;
