import React, { useEffect, useRef, useState } from 'react'
import classes from './CreatePosts.module.css'
import { LiaPhotoVideoSolid as LiaPhotoVideoSolidIcon } from "react-icons/lia";
import { 
  GoChevronRight as GoChevronRightIcon,
  GoChevronLeft as GoChevronLeftIcon,
  GoDotFill as GoDotFillIcon
} from "react-icons/go"
import { useNavigate } from 'react-router-dom';
import $api from '../../../../http';
import axios from 'axios';

export default function CreatePosts() {
  const LiaPhotoVideoSolid = LiaPhotoVideoSolidIcon as unknown as React.FC<{className: string}>;
  const GoChevronRight = GoChevronRightIcon as unknown as React.FC<{ className: string }>;
  const GoChevronLeft = GoChevronLeftIcon as unknown as React.FC<{ className: string}>;
  const GoDotFill = GoDotFillIcon as unknown as React.FC<{ className: string }>;

  const navigate = useNavigate();

  const[desc, setDesc] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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

      navigate('/travel-share', { state: { refresh: true } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      }
    };

  };

  const nextSlide = () => {
    setCurrentIndex(prev =>
      previews.length ? (prev + 1) % previews.length : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev =>
      previews.length
        ? (prev - 1 + previews.length) % previews.length
        : 0
    );
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
            previews.length > 0
              ? 
                (                
                  previews.length > 1
                    ? (
                      <div className={classes.fewPicturesDiv}>
                        <div 
                          className={classes.slideButtonBack}
                          onClick={(e) => {
                            e.stopPropagation();
                            prevSlide()
                          }}
                        >
                          <GoChevronLeft className={classes.slideButton} />
                        </div>

                        <img 
                          className={`${classes.fewPostPictures} ${classes.picture}`}
                          src={previews[currentIndex]}
                          alt='Post Preview'
                        />

                        <div 
                          className={classes.slideButtonBack}
                          onClick={(e) => {
                            e.stopPropagation();
                            nextSlide()
                          }}  
                        >
                          <GoChevronRight className={classes.slideButton} />
                        </div>
                      </div>
                    ) : (
                      <img 
                        className={`${classes.postPicture} ${classes.picture}`}
                        src={previews[0]}
                        alt='Post Preview'
                      />
                    )
                
              )
              : (
                <LiaPhotoVideoSolid className={classes.picIcon}/>
            )
          }
          <span className={classes.tooltip}>Upload Photo or Video</span>

          <input 
            ref={fileInputRef}
            type='file'
            accept='image/*,video/*'
            hidden
            multiple
            onChange={handleFileChange}
          />
        </div>

        {previews.length > 1 && (
          <div className={classes.dots}>
            {previews.map((_, i) => (
              <GoDotFill
                key={i}
                className={i === currentIndex ? classes.activeDot : classes.dot}
              />
            ))}
          </div>
        )}

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
