import classes from "./styles.module.css";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { IoMdAdd } from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import * as rdd from 'react-device-detect';


export function AddButton({ handleClick, text }) {
  return (
    <button className={classes.actionButton} onClick={handleClick}>
      <IoMdAdd />
      <span id={classes.actionButtonText}>{text}</span>
    </button>
  );
}

export function PDFDownloadButton({ document, fileName, text }) {
  return (
    <PDFDownloadLink className={classes.actionButton} document={document} fileName={fileName} >
      {({loading}) => (loading ? 
        (<>
          <FaDownload className={classes.actionButtonIcon} />
          <span id={classes.actionButtonText}>Loading...</span>
        </>) : (
        <>
          <FaDownload className={classes.actionButtonIcon} />
          <span id={classes.actionButtonText}>{text}</span>
        </> )
      )}
    </PDFDownloadLink>
  );
}

export function PDFPreviewButton({ handleClick, text }) {
  if (rdd.isMobile)
    return <></>

  return (
    <button className={classes.actionButton} onClick={handleClick}>
      <MdOutlinePreview className={classes.actionButtonIcon} />
      <span id={classes.actionButtonText}>{text}</span>
    </button>
  );
}