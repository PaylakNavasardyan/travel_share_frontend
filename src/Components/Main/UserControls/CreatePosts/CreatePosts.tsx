import React, { useRef, useState } from 'react'
import classes from './CreatePosts.module.css'
import { LiaPhotoVideoSolid as LiaPhotoVideoSolidIcon } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import $api from '../../../../http';
import axios from 'axios';

export default function CreatePosts() {
  const LiaPhotoVideoSolid = LiaPhotoVideoSolidIcon as unknown as React.FC<{className: string}>;

  const navigate = useNavigate();

  const[desc, setDesc] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);


  const handlePoolClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = e.target.files;
  if (!selectedFiles) return;

  const filesArray = Array.from(selectedFiles);

  setFiles(filesArray);

  const previewUrls = filesArray.map(file =>
    URL.createObjectURL(file)
  );

  setPreviews(previewUrls);
};

  const handleClick = async () => {
  if (!files.length) return;

  const formData = new FormData();

  files.forEach(file => {
    formData.append('files', file);
  });

  formData.append('description', desc);

  try {
    const response = await $api.post('/api/posts/create', formData);
    console.log(response.data);

    setDesc('');
    setFiles([]);
    setPreviews([]);

    navigate(-1);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};

  return (
    <div className={classes.postsModal}>
      <div className={classes.postsBody}> 
        <textarea 
          className={classes.postDescription} 
          placeholder='Description'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          >
        </textarea>
    
        <div className={classes.postPicture} onClick={handlePoolClick}>
          {
            (previews) 
              ? (
                <img 
                  className={`${classes.postPicture} ${classes.picture}`}
                  src={previews[0]}
                  alt='Post Preview'
                />
              )
              : (
                <LiaPhotoVideoSolid className={classes.picIcon}/>
              )
          }
          <span className={classes.tooltip}>Upload Photo or Video</span>

          <input 
            ref={fileInputRef}
            type='file'
            accept='image/*,vidoe/*'
            hidden
            multiple
            onChange={handleFileChange}
          />

        </div>

        <div className={classes.postButtons}>
          <button 
            className={`${classes.refuse}
            ${classes.button}`}
            onClick={() => navigate(-1)}>
              Cancel
          </button>

          <button
            onClick={handleClick}
            className={`${classes.confirm}
            ${classes.button}`}>
              Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
