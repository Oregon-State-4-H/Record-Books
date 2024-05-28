"use client";

import Navbar from "./../components/Navbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./styles.module.css";
import React, { useRef, useState } from 'react';

const NavMenu = ({ currentSection, scrollToRef }) => {
    const menuItems = [
      { name: 'Generating PDFs', ref: 'generatingPDFsRef', subItems:[
        { name: 'Previewing PDFs', ref: 'previewingPDFsRef' },
        { name: 'Downloading PDFs', ref: 'downloadingPDFsRef' }
    ]},
      { name: 'Resume', ref: 'resumeRef', subItems: [
        { name: 'Adding Records', ref: 'addingRecordsRef' },
        { name: 'Exporting PDFs', ref: 'exportingPDFsRef' }
      ]},
      { name: 'My Projects', ref: 'myProjectsRef', subItems: [
        { name: 'Viewing Projects', ref: 'viewingProjectsRef' },
        { name: 'Add Projects and Edit Project Information', ref: 'addProjectsRef' },
        { name: 'Add Expenses', ref: 'addExpensesRef' },
        { name: 'Add Feed Information and Feed Type', ref: 'addFeedRef' }
      ]}
    ];

    return (
      <nav className={styles.navMenu}>
        <ul>
          {menuItems.map(item => (
            <React.Fragment key={item.ref}>
              <li
                className={currentSection === item.ref ? styles.active : ''}
                onClick={() => scrollToRef(item.ref)}
              >
                {item.name}
              </li>
              {item.subItems && (
                <ul className={styles.subList}>
                  {item.subItems.map(subItem => (
                    <li
                      key={subItem.ref}
                      className={currentSection === subItem.ref ? styles.active : ''}
                      onClick={() => scrollToRef(subItem.ref)}

                    >
                      {subItem.name}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    );
};

export default function Docs() {
  const { user, error, isLoading } = useUser();
  let isAuth = false;
  const [currentSection, setCurrentSection] = useState('generatingPDFsRef');

  const generatingPDFsRef = useRef(null);
  const previewingPDFsRef = useRef(null);
  const downloadingPDFsRef = useRef(null);
  const resumeRef = useRef(null);
  const addingRecordsRef = useRef(null);
  const exportingPDFsRef = useRef(null);
  const myProjectsRef = useRef(null);
  const viewingProjectsRef = useRef(null);
  const addProjectsRef = useRef(null);
  const addExpensesRef = useRef(null);
  const addFeedRef = useRef(null);

  const scrollToRef = (refName) => {
    const ref = {
      generatingPDFsRef,
      previewingPDFsRef,
      downloadingPDFsRef,
      resumeRef,
      addingRecordsRef,
      exportingPDFsRef,
      myProjectsRef,
      viewingProjectsRef,
      addProjectsRef,
      addExpensesRef,
      addFeedRef
    }[refName];
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setCurrentSection(refName);
  };

  if (user) {
    isAuth = true;
  }

  return (
    <>
      <Navbar isBasic={true} isAuth={isAuth} pageName={"docs"}/>
      <main style={{display: 'flex', flexDirection: 'row'}}>
        <div className={styles.navContainer}>
            <NavMenu currentSection={currentSection} scrollToRef={scrollToRef} />
        </div>
        <div className={styles.section}>
            <h1 className={styles.title}>User Docs</h1>

            <h2 ref={generatingPDFsRef} className={styles.sectionHeader}>Generating PDFs</h2>
            <p>
                Record Books can create formatted reports for supported PDF templates. PDFs are dynamic and will update automatically after adding a new entry into a log. 
                <br /> <br />
                Currently supported templates:
            </p>
            <ul>
                <li>My 4-H Resume</li>
            </ul>

            <h2 ref={previewingPDFsRef} className={styles.sectionSubHeader}>Previewing PDFs</h2>
            <p>
                Pages with PDF preview support will have a button for “Preview PDF”. To preview a PDF, click “Preview PDF” and a model will appear.
                <br />
                <strong>*This feature is not available for mobile devices. Please follow step 1 of <span onClick={() => scrollToRef(downloadingPDFsRef)} style={{ color: 'blue', cursor: 'pointer' }}>Downloading PDF</span> from mobile device.</strong>
            </p>

            <h2 ref={downloadingPDFsRef} className={styles.sectionSubHeader}>Downloading PDFs</h2>
            <p>Pages with PDF Exporting support will have a button for “Download PDF”. To download a PDF, follow the instructions below based on your device.</p>
            <h3 className={styles.sectionMinorHeader}>From computer</h3>
            <ol>
                <li>Click “Download PDF”</li>
                <li>Name document and select save location</li>
                <li>Click save</li>
            </ol>
            <h3 className={styles.sectionMinorHeader}>From mobile device (iOS)</h3>
            <ol>
                <li>Click “Download PDF”</li>
                <li>Click “Share”</li>
                <li>Select “Open in Files”</li>
                <li>Name document and save.</li>
            </ol>
            <h3 className={styles.sectionMinorHeader}>From mobile device (Android)</h3>
            <ol>
                <li>Click “Download PDF”</li>
                <li>Select the appropriate option</li>
                <li>Follow the prompts to save the document</li>
            </ol>

            <h2 ref={resumeRef} className={styles.sectionHeader}>Resume</h2>
            <h3 ref={addingRecordsRef} className={styles.sectionSubHeader}>Adding Records</h3>
            <p>
                Record Books allows you to create entries to log your journey through 4-H. These sections are organized by the category of achievements in the 4-H organization and the work and achievements outside of the 4-H organization.
            </p>
            <ul>
                <li>Section 1: 4-H Involvement Summary</li>
                <li>Section 2: 4-H Project/Program Summary</li>
                <li>Section 3: Participation in 4-H Activities/Events</li>
                <li>Section 4: Participation in Other Community Activities/Events</li>
                <li>Section 5: Leadership in 4-H</li>
                <li>Section 6: Leadership in Other Organizations</li>
                <li>Section 7: Citizenship/Community Service in 4-H</li>
                <li>Section 8: Other Citizenship/Community Service Participation</li>
                <li>Section 9: Communications in 4-H</li>
                <li>Section 10: Communications in Other Organizations</li>
                <li>Section 11: Participation in 4-H Contests/Competitions</li>
                <li>Section 12: Participation in Other Contests/Competitions</li>
                <li>Section 13: 4-H Recognition</li>
                <li>Section 14: Other Recognition</li>
            </ul>

            <h2 ref={exportingPDFsRef} className={styles.sectionHeader}>Exporting PDFs</h2>
            <p>
                PDFs can be exported as the individual sections or as the full 4-H Resume. Full resume exports can be done from the main resume page. Section exports can be done when viewing an individual section. See section 
                <span onClick={() => scrollToRef('downloadingPDFsRef')} style={{ color: 'blue', cursor: 'pointer' }}>“Downloading PDFs”</span> 
                for more information on how to export to your device.
            </p>

            <h2 ref={myProjectsRef} className={styles.sectionHeader}>My Projects</h2>
            <h3 ref={viewingProjectsRef} className={styles.sectionSubHeader}>Viewing Projects</h3>
            <p>
                By default, Record Books will only show you active projects in the current project year. To view previous projects, click “View all projects”.
            </p>

            <h3 ref={addProjectsRef} className={styles.sectionSubHeader}>Add Projects and Edit Project Information</h3>
            <p>
                Record Books allows you to add more projects that you are working on and edit the information of any existing projects.
            </p>

            <h3 ref={addExpensesRef} className={styles.sectionSubHeader}>Add Expenses</h3>
            <p>For every project that is currently active, you can add an expense. Expenses should include:</p>
            <ul>
                <li>Equipment and supplies purchased</li>
                <li>Veterinary</li>
                <li>Insurance</li>
                <li>Transportation</li>
                <li>Boarding</li>
                <li>Breeding</li>
                <li>Marketing</li>
                <li>Registration fees</li>
                <li>Value of items used from home supply</li>
                <li>Costs of showing your animals</li>
            </ul>

            <h3 ref={addFeedRef} className={styles.sectionSubHeader}>Add Feed Information and Feed Type</h3>
            <p>
                For every project that is currently active, you can select or add a feed type and the expenses regarding that feed. The expenses for this feed type include the amount of feed that was purchased, the cost of that amount, and the amount of this feed type you had at the beginning of the record.
            </p>
        </div>
      </main>
    </>
  );
}
