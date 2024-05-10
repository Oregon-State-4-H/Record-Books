"use client";

import ActionBar from '@/app/components/ActionBar';
import classes from './styles.module.css';
import Link from 'next/link';
import BackNavBtn from '@/app/components/BackNavBtn';
import { getProjects } from '@/app/_db/srvactions/project';
import CloverLoader from '@/app/components/CloverLoader';
import { useState, useEffect } from 'react';


export default function Projects() {
  const [projects, setProjects] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      getProjects()
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
      <ActionBar title="All Projects" disableBack={false} />
      
      <div className={classes.header}>
        <BackNavBtn /> 
        <div className={classes.title}>All Projects</div>
      </div>


      <div className={classes.cardContainer}>
        { projects?.map((project, index) => {
            return (
              <Link href={{pathname: "projects/" + project.type + "/overview", query: {project: project._id}}} key={index} className={classes.card}>
                <div className={classes.cardHeader}>
                  <div className={classes.cardTitle}>{project.projectName}</div>
                  <div className={classes.cardDescription}>{"(" + project.year + ")"}</div>
                </div>
                <div className={classes.cardDescription}>{project.description}</div>
              </Link>
        )})}
      </div>

      {isLoading && <div className={classes.loaderContainer}>
        <CloverLoader />
      </div>}

    </main>
  );
}
