"use client";

import Link from 'next/link';
import styles from './styles.module.css';
import ActionBar from '@/app/components/ActionBar';
import PDFFile from '@/app/components/reports/resume/Resume.jsx';
import { useState, useEffect } from 'react';
import { getResumeDocs } from '@/app/_db/srvactions/resume';
import { useUser } from '@auth0/nextjs-auth0/client';
import { PDFDownloadButton, PDFPreviewButton } from '@/app/components/logging/ActionButton';
import PDFPreviewModel from '@/app/components/models/PDFPreviewModel';


function Card(props) {
  var title = props.title;
  var section = props.section;

  return (
    <Link href={{pathname: "resume/section", query: {section: section}}} className={styles.cardItem}>
      <div className={styles.cardText}>{title}</div>
    </Link>
  )
}

export default function Resume() {
  const [isComplete, setIsComplete] = useState(false); // State to manage completeness
  const [resumeData, setResumeData] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const { user, error, isLoading } = useUser();


  useEffect(() => {
    getResumeDocs().then((data) => {
      setResumeData(data);
      setIsComplete(true);
    });
  }, []);

  useEffect(() => {
    if (!user && !isLoading) {
      redirect("../api/auth/login");
    }
  }, [isLoading, user]);

  if (!user && !isLoading) {
    redirect("../api/auth/login");
  }

  return (
    <main>
      <ActionBar title="My 4-H Resume" disableBack={true} />
      <div className="pageHeader">
        <h1 className="pageTitle">My 4-H Resume</h1>
      </div>

      <div className="btnContainer">
        <div className="btnGroup">
          { isComplete &&
            <>
              <PDFPreviewButton text="Preview Resume" handleClick={() => setShowPreview(true)} />
              <PDFDownloadButton text="Download Resume" document={<PDFFile resumeData={resumeData} />} fileName={"My 4-H Resume.pdf"} />
            </>
          }
        </div>
      </div>

      { showPreview &&
        <PDFPreviewModel title="My 4-H Resume Preview" handleClose={() => setShowPreview(false)} >
          <PDFFile resumeData={resumeData} />
        </PDFPreviewModel>
      }

      <div className={styles.sectionsContainer}>
        <div className={styles.sectionGroup}>
          <div className={styles.sectionTitle}>Involvement</div>
          <Card title="Section 1: 4-H Involvement" section="1" />
          <Card title="Section 2: 4-H Project/Program" section="2" />
        </div>

        <div className={styles.sectionGroup}>
          <div className={styles.sectionTitle}>Participation</div>
          <Card title="Section 3: 4-H Activities/Events" section="3" />
          <Card title="Section 4: Other Community Activities/Events" section="4" />
        </div>

        <div className={styles.sectionGroup}>
          <div className={styles.sectionTitle}>Leadership</div>
          <Card title="Section 5: 4-H" section="5" />
          <Card title="Section 6: Other Organizations" section="6" />
        </div>

        <div className={styles.sectionGroup}>
          <div className={styles.sectionTitle}>Citizenship/Community Service</div>
          <Card title="Section 7: 4-H" section="7" />
          <Card title="Section 8: Other Participation" section="8" />
        </div>

        <div className={styles.sectionGroup}>
          <div className={styles.sectionTitle}>Communications</div>
          <Card title="Section 9: 4-H" section="9" />
          <Card title="Section 10: Other Organizations" section="10" />
        </div>

        <div className={styles.sectionGroup}>
          <div className={styles.sectionTitle}>Contests/Competitions</div>
          <Card title="Section 11: Participation in 4-H " section="11" />
          <Card title="Section 12: Participation in Other" section="12" />
        </div>

        <div className={styles.sectionGroup}>
          <div className={styles.sectionTitle}>Recognitions</div>
          <Card title="Section 13: 4-H" section="13" />
          <Card title="Section 14: Other" section="14" />
        </div>
      </div>
    </main>
  )
}