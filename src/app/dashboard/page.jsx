"use client";

import Link from 'next/link'
import styles from "./styles.module.css"
import ActionBar from '@/app/components/ActionBar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { redirect } from "next/navigation";
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { getUserBookmarks } from '../_db/srvactions/user';
import { FaBookmark } from 'react-icons/fa';


function Card({title, url, openInNewTab = true}) {
  if (openInNewTab) {
    return (
      <Link href={url} className={styles.summaryCardItem} rel="noopener noreferrer" target="_blank">
        <div className={styles.cardText}>{title}</div>
      </Link>
    ) 
  } else {
    return (
      <Link href={url} className={styles.summaryCardItem}>
        <div className={styles.cardText}>{title}</div>
      </Link>
    ) 
  }
}

export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!user && !isLoading) {
      redirect("/api/auth/login");
    }

    getUserBookmarks().then((bookmarks) => {
      setBookmarks(bookmarks);
    })
  }, [user, isLoading]);

  return (
    <main>
      <ActionBar title="Dashboard" disableBack={true} />
      <PageHeader title="Dashboard" disableBack={true}/>

      <div className={styles.summaryCardContainer}>
        <div className={styles.summaryCard}>
          <h2 className={styles.cardTitle}>4-H Resources</h2>
          <Card title="4-H Youth Development" url="https://extension.oregonstate.edu/4h" />
          <Card title="Events" url="https://extension.oregonstate.edu/program/all/4h/events" />
          <Card title="Local 4-H Program Finder" url="https://extension.oregonstate.edu/program/all/4h/local-programs" />
          <Card title="About 4-H" url="https://extension.oregonstate.edu/4h/about-4-h" />
          <Card title="4-H Summer Camps" url="https://extension.oregonstate.edu/4h/4-h-summer-camps" />
          <Card title="4-H Projects" url="https://extension.oregonstate.edu/4h/4-h-projects" />
          <Card title="Volunteer Resources" url="https://extension.oregonstate.edu/4h/volunteer-resources-0" />
          <Card title="Support 4-H" url="https://extension.oregonstate.edu/4h/support-4-h" />
        </div>

        { bookmarks && bookmarks.length > 0 &&
        <div className={`${styles.summaryCard} ${styles.bookmarkCard}`}>
          <div className={styles.cardTitle}>
            <h2>Bookmarks</h2>
            <FaBookmark />
          </div>
          {bookmarks.map((bookmark, index) => {
            return <Card key={index} title={bookmark.label} url={bookmark.link} openInNewTab={false} />
          })}
        </div>}
      </div>
    </main>
  )
}