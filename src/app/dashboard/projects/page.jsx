"use client";

import ActionBar from '@/app/components/ActionBar';
import classes from './styles.module.css';
import Link from 'next/link';
import { getCurrentProjects } from '@/app/_db/srvactions/project';
import CloverLoader from '@/app/components/CloverLoader';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

const Project = {
  year: null,
  projectName: null,
  description: null,
  type: null,
  startDate: null,
  endDate: null,
}

export default function Projects() {
  const [projects, setProjects] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      getCurrentProjects()
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  });

  return (
    <main>
      <ActionBar title="Projects" disableBack={true} />
      
      <div className={classes.header}>
        <div className={classes.title}>Current Projects</div>
        <Link href={{pathname: "projects/previous"}} className={classes.btn} id='previousBtn'>View All Projects</Link>
      </div>

      <div className={classes.cardContainer}>
        { projects?.map((project, index) => {
            return (
              <Link href={{pathname: "projects/" + project.type + "/overview", query: {project: project._id}}} key={index} className={classes.card}>
                <div className={classes.cardTitle}>{project.name}</div>
                <div className={classes.cardDescription}>{project.description}</div>
              </Link>
        )})}
      </div>

      {isLoading && <div className={styles.loaderContainer}>
        <CloverLoader />
      </div>}
    </main>
  );
}
