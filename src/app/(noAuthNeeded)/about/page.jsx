import ActionBar from '@/app/components/ActionBar'
import styles from './about.module.css'
import Link from 'next/link'

export default function About() {
  return (
    <main className={styles.reducedPaddingMain}>
      <ActionBar title="About" disableBack={true} />
      
      {/* <h2 className={styles.sectionHeading}>What is 4-H Record Books?</h2>
      <p>
        4-H Record Books is a web application that helps 4-H members keep track of their projects, goals, and achievements.
      </p> */}

      <h2 className={styles.sectionHeading}>Meet the team</h2>
      <p>
        This application is an ongoing project developed by a team of students at Oregon State University.
      </p>

      <div className={styles.memberCardContainer}>
        <div className={styles.memberCard}>
          <img src="/images/placeholder.png" alt="Placeholder" />
          <h3 className={styles.memberName}>Byron Ojua-Nice</h3>
          <p className={styles.cardSection} style={{fontWeight: 'bold'}}>Roles</p>
          <p className={styles.memberRole}>Project Manager, Documentation, Swiss Army Knife</p>

          <p className={styles.cardSection} style={{fontWeight: 'bold'}}>Bio</p>
          <p className={styles.memberRole}>Placeholder bio</p>
          <Link href="https://www.linkedin.com/in/byron-ojua-nice/" className={styles.memberLink} rel="noopener noreferrer" target="_blank">{"View Byron on LinkedIn ->"}</Link>
        </div>

        <div className={styles.memberCard}>
          <img src="/assets/photos/michelle_profile.jpeg" alt="Michelle Profile Picture" />
          <h3 className={styles.memberName}>Michelle Nguyen</h3>
          <p className={styles.cardSection} style={{fontWeight: 'bold'}}>Roles</p>
          <p className={styles.memberRole}>UI Design, Frontend Developer</p>

          <p className={styles.cardSection} style={{fontWeight: 'bold'}}>Bio</p>
          <p className={styles.memberRole}>Placeholder bio</p>
          <Link href="https://www.linkedin.com/in/michellehuyen/" className={styles.memberLink} rel="noopener noreferrer" target="_blank">{"View Michelle on LinkedIn ->"}</Link>
        </div>

        <div className={styles.memberCard}>
        <img src="/assets/photos/javier_profile.jpeg" alt="Javier Profile Picture" />
          <h3 className={styles.memberName}>Javier Garcia Ramirez</h3>
          <p className={styles.cardSection} style={{fontWeight: 'bold'}}>Roles</p>
          <p className={styles.memberRole}>Backend Developer, Database Manager</p>

          <p className={styles.cardSection} style={{fontWeight: 'bold'}}>Bio</p>
          <p className={styles.memberRole}>Placeholder bio</p>
          <Link href="https://www.linkedin.com/in/javi-g/" className={styles.memberLink} rel="noopener noreferrer" target="_blank">{"View Javier on LinkedIn ->"}</Link>
        </div>
      </div>
    </main>
  )
}