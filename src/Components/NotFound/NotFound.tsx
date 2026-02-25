import React from 'react';
import classes from './NotFound.module.css';
import { TbError404 as TbError404Icon } from "react-icons/tb";

export default function NotFound() {
  const TbError404 = TbError404Icon as unknown as React.FC<{ className: string }>;
    
  return (
    <div className={classes.notFound}>
      <TbError404 className={classes.notFoundIcon}/>
      <p className={classes.notFoundText}>Page not found</p>
    </div>
  )
}
