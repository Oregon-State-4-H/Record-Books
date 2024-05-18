"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./styles.module.css";
import { DynamicForm } from "./components/models/DynamicFormModel";
import { sendContactEmail } from "./srvActions";
import { useFormState } from "react-dom";
import Link from 'next/link'
import Image from 'next/image'



function BioCard({name, role, bio, linkedin, image}) {
  return (
    <div className={styles.memberCard}>
      <Image src={image} className={styles.profilePhoto} alt={ name + " Profile Picture"} width={200} height={200}/>
      <h3 className={styles.memberName}>{name}</h3>
      <p className={styles.cardSection} style={{fontWeight: 'bold'}}>Roles</p>
      <p className={styles.memberRole}>{role}</p>

      <p className={styles.cardSection} style={{fontWeight: 'bold'}}>Bio</p>
      <p className={styles.memberRole}>{bio}</p>
      <Link href={linkedin} className={styles.memberLink} rel="noopener noreferrer" target="_blank">{"View on LinkedIn ->"}</Link>
    </div>
  )
}


export default function Home() {
  const { user, error, isLoading } = useUser();
  const [showSection1, setShowSection1] = useState(false);
  const [showSection2, setShowSection2] = useState(false);
  const [showSection3, setShowSection3] = useState(false);
  const [showSection4, setShowSection4] = useState(false);
  const cardItemRef1 = useRef(null);
  const cardItemRef2 = useRef(null);
  const cardItemRef3 = useRef(null);
  const cardItemRef4 = useRef(null);

  var formBlueprint = {
    first_name: null,
    last_name: null,
    email: null,
    is_involved: false,
    receive_newsletter: null,
  }
  
  const [formInfo, setFormInfo] = useState(formBlueprint);

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }

  const handleFormState = () => {
    setFormInfo(formBlueprint);
  }

  const [formState, formAction] = useFormState(sendContactEmail, formBlueprint);


  let isAuth = false;

  if (user) {
    isAuth = true;
  }

  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === cardItemRef1.current && !showSection1) {
            setShowSection1(true);
            observer.unobserve(entry.target);
          } else if (entry.target === cardItemRef2.current && !showSection2) {
            setShowSection2(true);
            observer.unobserve(entry.target);
          } else if (entry.target === cardItemRef3.current && !showSection3) {
            setShowSection3(true);
            observer.unobserve(entry.target);
          } else if (entry.target === cardItemRef4.current && !showSection4) {
            setShowSection4(true);
            observer.unobserve(entry.target);
          }
        }
      });
    };

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const currentCardItemRef1 = cardItemRef1.current;
    const currentCardItemRef2 = cardItemRef2.current;
    const currentCardItemRef3 = cardItemRef3.current;
    const currentCardItemRef4 = cardItemRef4.current;

    if (currentCardItemRef1) observer.observe(currentCardItemRef1);
    if (currentCardItemRef2) observer.observe(currentCardItemRef2);
    if (currentCardItemRef3) observer.observe(currentCardItemRef3);
    if (currentCardItemRef4) observer.observe(currentCardItemRef4);

    return () => {
      if (currentCardItemRef1) observer.unobserve(currentCardItemRef1);
      if (currentCardItemRef2) observer.unobserve(currentCardItemRef2);
      if (currentCardItemRef3) observer.unobserve(currentCardItemRef3);
      if (currentCardItemRef4) observer.unobserve(currentCardItemRef4);
    };
  }, [showSection1, showSection2, showSection3, showSection4]);

  return (
    <>
      <Navbar isBasic={true} isAuth={isAuth} />
      <main style={{margin: "0"}}>
        <div className={styles.headerContainer}>
            <Image
              src="/assets/photos/Featured-Photo.jpeg"
              alt="" fill className={styles.headerImage}
            />

          <div className={styles.headerText}>
            <h1>4-H Record Books</h1>
            <p>
              4-H recordkeeping just got a new look! We are excited to announce
              the launch of our new 4-H Record Book platform. This new platform
              will allow 4-H members to complete their record books online.
            </p>
          </div>
        </div>

        <div className={styles.cardContainer}>
          {/* Section 1 */}
          <section id="what-is-record-books" className={styles.cardItem} ref={cardItemRef1} style={{ opacity: showSection1 ? 1 : 0 }}>
            <div className={styles.devicePreviewContainer} >
            { showSection1 && <video autoPlay muted playsInline className={styles.devicePreview} src="/assets/photos/phone_preview.webm" /> }
            </div>

            <div className={styles.cardInfo}>
              <h2>What is Record Books?</h2>
              <p>{"4-H Record Books is a logging and report software that tracks a youth's journey through the 4-H program. Record books digitizes current handwritten reports to give youth a new modern approach to record keeping. This software allows youth to log their progress and then automatically generate formatted PDF reports. Record Books allows users to track their 4-H resume and General Animal Science projects."}</p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="addressing-a-50-year-old-problem" className={styles.cardItem} ref={cardItemRef2} style={{ opacity: showSection2 ? 1 : 0 }}>
            <div className={styles.cardInfo}>
              <h2>Addressing a 50 year old problem</h2>
              <p>
                Youth in 4-H have an old and inefficient tracking system for 
                tracking the progress of their 4-H projects. The current 
                process involves youth printing and manually filling out 
                report books, some of which are almost 50 years old. While 
                some forms have been made into fillable PDFs, formatting 
                causes problems when trying to import them into editing software. 
                The current system is difficult to manage and can often 
                lead to losses of records and valuable project information. 
                </p>
            </div>

            <div className={styles.devicePreviewContainer}>
              { showSection2 && <video autoPlay muted playsInline className={styles.devicePreview} src="/assets/photos/record_entry.webm" /> }
            </div>
          </section>

          {/* Section 3 */}
          <section id="exporting-reports" className={styles.cardItem} ref={cardItemRef3} style={{ opacity: showSection3 ? 1 : 0 }}>
            <div className={styles.devicePreviewContainer}>
              { showSection3 && <video autoPlay loop muted playsInline className={styles.devicePreview} src="/assets/photos/download_pdf.webm" /> }
            </div>

            <div className={styles.cardInfo}>
              <h2>Exporting Reports</h2>
              <p>
                Export your records into preformated PDF reports at any time.
                The end goal would be to have a system that can can generate
                reports for all major 4-H projects categories. Currently, we
                working to support the 4-H Resume and General Animal Science projects.
              </p>
              <br />

              <div className={styles.carouselContainer}>
                <div className={styles.carousel}>
                  <div className={styles.carouselCardItem}>
                    <p className={styles.newCardTag}>New!</p>
                    <div className={styles.carouselCardInfo}>
                      <p>My 4-H Resume</p>
                    </div>
                  </div>
                  <div className={styles.carouselCardItem}>
                    <p className={styles.newCardTag}>Coming soon!</p>
                    <div className={styles.carouselCardInfo}>
                      <p>Animal Science Record</p>
                    </div>
                  </div>
                  <div className={styles.carouselCardItem}>
                    <p className={styles.newCardTag}>Comming soon!</p>
                    <div className={styles.carouselCardInfo}>
                      <p>Daily Feed and Growth</p>
                    </div>
                  </div>
                  <div className={styles.carouselCardItem}>
                    <p className={styles.newCardTag}>Coming soon!</p>
                    <div className={styles.carouselCardInfo}>
                      <p>Feed and Growth</p>
                    </div>
                  </div>
                </div>

                <div className={styles.carousel}>
                  <div className={styles.carouselCardItem}>
                    <p className={styles.newCardTag}>New!</p>
                    <div className={styles.carouselCardInfo}>
                      <p>My 4-H Resume</p>
                    </div>
                  </div>
                  <div className={styles.carouselCardItem}>
                    <p className={styles.newCardTag}>Coming soon!</p>
                    <div className={styles.carouselCardInfo}>
                      <p>Animal Science Record</p>
                    </div>
                  </div>
                  <div className={styles.carouselCardItem}>
                    <p className={styles.newCardTag}>Comming soon!</p>
                    <div className={styles.carouselCardInfo}>
                      <p>Daily Feed and Growth</p>
                    </div>
                  </div>
                  <div className={styles.carouselCardItem}>
                    <p className={styles.newCardTag}>Coming soon!</p>
                    <div className={styles.carouselCardInfo}>
                      <p>Feed and Growth</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="meet-the-team" className={styles.cardItem} ref={cardItemRef4} style={{ flexDirection: "column", opacity: showSection4 ? 1 : 0 , animationPlayState: showSection4 ? "running" : "paused" }}>
            <div className={styles.teamInfo} style={{textAlign: "center"}}>
              <h2>Meet the team</h2>
              <p style={{fontSize: "1.5rem"}}>
                {" Record Books was initially developed as a senior capstone project in 2024 by a group of students at Oregon State University. Met this year's team."}
              </p>
            </div>

            <div className={styles.memberCardContainer}>
              <BioCard name="Byron Ojua-Nice" role="Project Manager, Documentation, Swiss Army Knife" 
                linkedin="https://www.linkedin.com/in/byron-ojua-nice/" image="/assets/photos/byron_profile.jpeg"
                bio="Placeholder bio"
              />

              <BioCard name="Michelle Nguyen" role="UI Design, Frontend Developer" 
                linkedin="https://www.linkedin.com/in/michellehuyen/" image="/assets/photos/michelle_profile.jpeg"
                bio="Placeholder bio"
              />

              <BioCard name="Javier Garcia Ramirez" role="Backend Developer, Database Manager" 
                linkedin="https://www.linkedin.com/in/javi-g/" image="/assets/photos/javier_profile.jpeg"
                bio="Placeholder bio"
              />
            </div>
          </section>
        </div>

        <br />

        {/* Contact Us */}
        <section id="contact-us" className={styles.contactForm}>
          <h2>Sign up to receive updates</h2>

          <DynamicForm inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormState} submitButtonText="Submit" submitPendingText="Submitting..." 
            inputs={[
            { type: "text", name: "first_name", label: "First Name", placeholder: "John" },
            { type: "text", name: "last_name", label: "Last Name", placeholder: "Doe" },
            { type: "email", name: "email", label: "Email", placeholder: "name@example.com" },
            { type: "select", name: "is_involved", label: "Are you involved in 4-H?", options: [{value: "No", label: "No"}, {value: "Yes", label: "Yes"}]},
          ]}
          />
        </section>
      </main>
    </>
  );
}
