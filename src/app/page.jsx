"use client";

import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./styles.module.css";
// import { DynamicForm } from "./components/models/DynamicFormModel";
// import { sendContactEmail } from "./srvActions";
// import { useFormState } from "react-dom";
import Link from 'next/link'
import Image from 'next/image'
import { FaGithub } from "react-icons/fa";



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

  // const handleChange = (e) => {
  //   setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  // }

  // const handleFormState = () => {
  //   setFormInfo(formBlueprint);
  // }

  // const [formState, formAction] = useFormState(sendContactEmail, formBlueprint);


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
              alt="" fill className={styles.headerImage} priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAGKAzcDASIAAhEBAxEB/8QAGwABAQEBAAMBAAAAAAAAAAAAAAIBAwQGBwX/xAAcEAEBAQEBAQEBAQAAAAAAAAAAARECEgMxIVH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EABsRAQEBAQEBAQEAAAAAAAAAAAABEQISMSFR/9oADAMBAAIRAxEAPwD3MAAAAAAAAAAAAAAAABBhQFYytZUGVLawVlZW1NBlZW1lBNZW1lBNTVVNBlTVVNRU1NVU0GVNVU0E1NVU0E1NVU0E1NVU0EVNVU1BNTVVNBNTVVFQTU1VTQTUVVTUE1FXUVBNRVVNZoioq6iuapqaqprURNTVVNaiJqaqprcRNZW1NaGVjazVQGaaqqbE62Iq42Jioyqo2Jiog2KiYqMq2KiY2MqqNZGxBTUtRVNSpBrUtRVRqYpYNawaGtY1RoxoNGNUAAAAfQwHpcAAAAAAAAAAAAAABjWIDGsRWMaygysKwVlZW1NAqa2soMqa2soMqa2poMrK2pqDKmtqaKypraygmpqqmgmpqqmgmpqqmgmpramoMqKqpoJqaqoqDKiqqaCaiqqagmpramoJqKqorFE1NbU1mDKmtqa1BNTW1NrURlTW2otbiFqbS1FrUiNtZqbWNYK01IYLlVK562UxXWVsrnKqVmxXSVUc5VSsquKiJVSsqqKiJVRlVRsTFIKjUtZVTUtQU1LUVTUtBTU61oUMFFDGqNGANaloNGaKPogD0uAAAAAAAAAAAAADEAGCjBmoDKMoFTW1NFGUrKDKylZQZWUrKDKylZQZU1tTQZU1tZUGVNbU0VlTW1NBlTW1NBlTW1NBlTW1NQTU1VTQTU1tTUE1NVUUGVFVUVBlRVVFSiaiqtRa50ZUVtTakGVNrbUWtxGWotbai1uRC1ztOukWtyMlrNYNqAAAAAA3WzpILrrOlyuEqp0zYsd5VSuM6XKxY06ytlc5VSs2DpK2VErZWcV0lbKiVsqKtqNbrItqdbqCmo1uoqtbqdboK1uo1uros1Ot1rRWidNBQzTVGjNAfRwHqcAAAAAAAAAGINYGgM01mit1ms1moN1ms1mg3WWs1mgWstLWWgWptLWWilTa21NoFrLS1NoFTW2ptAqaWstBlZS1NqBU0tZaDKmtqaDKmtqaKypramgyptbUWoFqLW2poMqa2otBlqa21NqCamttRagy1FqrUWs0Tai1tqbXMZai1tqLWpELUWlrn103ImnVc+ujrpztdJGfpawG1AAAAAAAAAAAAVKqdObdTGpXadLnTx5Vzpmxp3lVK4zpU6YsV1lVK5SqlZwdJVa5ytlTFdNbrnrdZwdNbqNNTFXrdRrdTBemp00wXpqdNQXpqdNUXpqNNNF6I0NH0wYa9jg0ZpoNGaaDROmg01ms0FazWazQbpqdNBus1ms0G6zWazRW6zWazUG6zWazQbrLWazQbam0tZaBam0tZaKWstZay0C1Npay0C1Npay0C1Npam1AtTaWptAtTa21NoFqbS1NoMtTa21NoMtTaWptQLU2lqbQZam1tqLQZam1tqLUGWptLU2oMtRaWotYtGWptLUWsyBa52ttcuunSRm1vXTl10zrpFuusifS3WA0oAAAAAAAAAAAAAAAA3WALlbOnNupjc6dp2udPHlVKzY1K8idKnTx50qds3lXeVsrjOlTpnB21uuU6bOmcHXW65em6mK6a3XPW6mC9brnrdMF63XPW6mC9NRppgvRGhg+naanTXrcFaanTQVpqNNBWmp1mgrTU6aDdNTrNBWs1ms0FazU6aDdZrNZoN1ms1mit1ms1moNtZrNZaDdZam1mg21lrLWWgWstZay0C1lrLWWilrLWWstAtTaWptAtZay1loFqbS1NqBam0tTaBam0tTaBam0tRaBam0tTagWotLU2gWotLUWoFqLS1HVZodVztLUWsfQtR1WddOXXTcjNreunLrpnXSHWRPrbdYDSgAAAAAAAAAAAAAAAAAAAAADdYAqVuoExqdOkqp1XLW+kxqdO07bO3HW6mNbHedqnTx9b6TyryPTfTx/Vb7Z8q7+m+nD232nkx39Hpx9ns8jt6b6cfZ7TyO3ocfYYPqWmo013eZemo00Ves1OmgrTUaaCtNTrNBWmp1mgrTU6zQVrNTrNBWs1ms0FazU6zQVrNTrNBus1ms0VtrLWWptQbay1lrLQbay1NrLQbam1lrLQbam1lrLQbam1lqbQbam0tTaDbU2stTag21NrLU2g21NrLU2ilqbS1Nohai0tTagWotLUWoNtRay1HVSha59U66c+umPo21z66Z105ddNzlm1vXbl10zrrUukhIANKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN1gCvR6SGL6q9brm3Uxr0vW656aYvt001Ho9Ji+163XP0ejF9umjn6DD2+raajTVcF6ajTQXpqNZoL01GmgvWajTQXrNTrNFXrNRpoK01Gs0F6zU6zQVrNTrNBWs1Os0FazU6zQVrLU6zQbay1lqbUVVqbWWptBVqbWWstBtqbWWptBVqbWWptBtqbWWstBtqbWWptBtqbWWptQbai0tRaDbU2stTaBam1lqLUG2otZekddIjb05ddHXTl10x9NV105ddp67cuum5yzut66c7dLdY6SLIAKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD6lprnpojpprnpoL01GmgvTXPTUF6ajWaC9NRrNBemo1mgv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"
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
          <h2>Contact Us</h2>
          <p style={{fontSize: '1.5rem'}}> For any questions or concerns, please contact us at</p>
          <p style={{fontSize: '1.5rem', color: "var(--beaver-orange)"}}>4Hrecord.books@oregonstate.edu</p>


          <br />

          <p style={{fontSize: '1.5rem'}}> To report a bug or request a feature, please submit an issue on our GitHub.</p>
          <Link href="https://github.com/Oregon-State-4-H/Record-Books" rel="noopener noreferrer" target="_blank" style={{display: "flex", alignItems: "center", fontSize: "1.25rem"}}>
            View on GitHub <FaGithub />
          </Link>


          {/* <DynamicForm inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormState} submitButtonText="Submit" submitPendingText="Submitting..." 
            inputs={[
            { type: "text", name: "first_name", label: "First Name", placeholder: "John" },
            { type: "text", name: "last_name", label: "Last Name", placeholder: "Doe" },
            { type: "email", name: "email", label: "Email", placeholder: "name@example.com" },
            { type: "select", name: "is_involved", label: "Are you involved in 4-H?", options: [{value: "No", label: "No"}, {value: "Yes", label: "Yes"}]},
          ]}
          /> */}
        </section>
      </main>
    </>
  );
}
