import React, { useRef, ChangeEvent } from 'react';
import axios from 'axios';
import Button, { ButtonType } from '../button/Button';

interface IUploadProps {
  action: string;
  multiple?: boolean;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (data: any, file: File) => void;
  onChange?: (file: File) => void;
}

const Uploda: React.FC<IUploadProps> = (props) => {
  const { action, onProgress, onSuccess, onError, beforeUpload, onChange, children } = props;

  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    uploadFiles(files);

    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };

  const onUploadProgress = (e: any, file: File) => {
    const percentage = Math.round((e.loaded * 100) / e.total) || 0;
    if (percentage < 100) {
      if (onProgress) {
        onProgress(percentage, file);
      }
    }
  };

  const uploadFiles = (fileList: FileList) => {
    const list = Array.from(fileList);
    list.forEach((file) => {
      if (!beforeUpload) {
        return post(file);
      }

      const before = beforeUpload(file);
      if (before && before instanceof Promise && before.then) {
        before.then((newFile) => {
          post(newFile);
        });
      } else if (before !== false) {
        post(file);
      }
    });
  };

  const post = (file: File) => {
    const formData = new FormData();
    formData.append(file.name, file);

    axios
      .post(action, formData, {
        headers: {
          'Content-Type': 'multiple/form-data',
        },
        onUploadProgress: (e) => {
          onUploadProgress(e, file);
        },
      })
      .then((res) => {
        onSuccess && onSuccess(res, file);
        onChange && onChange(file);
      })
      .catch((err) => {
        onError && onError(err, file);
        onChange && onChange(file);
      });
  };

  return (
    <div className="uploda-component" onClick={handleClick}>
      {children}
      <input
        className="file-input"
        style={{ display: 'none' }}
        type="file"
        ref={fileInput}
        onChange={handleChangeFile}
      />
    </div>
  );
};

export default Uploda;
