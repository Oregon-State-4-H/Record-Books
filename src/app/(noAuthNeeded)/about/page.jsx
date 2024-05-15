import ActionBar from '@/app/components/ActionBar'
import styles from './about.module.css'
import Link from 'next/link'

function BioCard({name, role, bio, linkedin, image}) {
  return (
    <div className={styles.memberCard}>
      <img src={image} alt={ name + " Profile Picture"} />
      <h3 className={styles.memberName}>{name}</h3>
      <p className={styles.cardSection} style={{fontWeight: 'bold'}}>Roles</p>
      <p className={styles.memberRole}>{role}</p>

      <p className={styles.cardSection} style={{fontWeight: 'bold'}}>Bio</p>
      <p className={styles.memberRole}>{bio}</p>
      <Link href={linkedin} className={styles.memberLink} rel="noopener noreferrer" target="_blank">{"View on LinkedIn ->"}</Link>
    </div>
  )
}

function QuoteCard({quote, author}) {
  return (
    <div className={styles.quoteCard}>
      <div className={styles.quote}>
        <p className={styles.quoteOpen}>" </p>
        <p className={styles.quoteText}>{quote}</p>
        <p className={styles.quoteClose}> "</p>
      </div>
      <p className={styles.quoteAuthor}>- {author}</p>
    </div>
  )
}

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

      <div className={styles.quoteCardContainer}>
        <QuoteCard quote="Placeholder quote" author="Byron Ojua-Nice" />
        <QuoteCard quote="Placeholder quote" author="Michelle Nguyen" />
        <QuoteCard quote="Placeholder quote" author="Javier Garcia Ramirez" />
      </div>
    </main>
  )
}