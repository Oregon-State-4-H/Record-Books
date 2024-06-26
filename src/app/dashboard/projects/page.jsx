"use client";

import ActionBar from '@/app/components/ActionBar';
import classes from './styles.module.css';
import Link from 'next/link';
import { addProject, getCurrentProjects } from '@/app/_db/srvactions/project';
import CloverLoader from '@/app/components/CloverLoader';
import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import styles from './styles.module.css';
import FormModel from '@/app/components/models/DynamicFormModel';
import PageHeader from '@/app/components/PageHeader';
import { AddButton, LinkButton } from '@/app/components/logging/ActionButton';

const Project = {
  year: null,
  projectName: null,
  description: null,
  type: null,
  startDate: null,
  endDate: null,
}

const formBlueprint = {
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
  const [showFormCard, setShowFormCard] = useState(false);
  const [formState, formAction] = useFormState(addProject, formBlueprint);

  const [formInfo, setFormInfo] = useState(formBlueprint);
  const [invalidateData, setInvalidateData] = useState(false);

  const showForm = () => { setShowFormCard(true); }
  const hideForm = () => { setShowFormCard(false); }

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }

  const handleFormSubmit = () => {
    hideForm();
    setInvalidateData(true);
  }

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
  }, [invalidateData]);

  return (
    <main>
      <ActionBar title="Projects" disableBack={true} />
      <PageHeader title="Projects" disableBack={true}/>

      <div className='btnContainer'>
        <div className="btnGroup" style={{marginLeft: "auto"}}>
          <AddButton text="Add Project" handleClick={showForm} />
          <LinkButton url="projects/previous" searchParams={{}} text="View All Projects" />
        </div>
      </div>

      <div className={classes.cardContainer}>
        {projects?.map((project, index) => {
            return (
              <Link href={{pathname: "projects/" + project.type + "/overview", query: {project: project._id}}} key={index} className={classes.card}>
                <div className={classes.cardTitle}>{project.projectName}</div>
                <div className={classes.cardDescription}>{project.description}</div>
              </Link>
        )})}
      </div>

      {isLoading && <div className={styles.loaderContainer}>
        <CloverLoader />
      </div>}

      {showFormCard && (
        <FormModel title="Add Project" hideForm={hideForm} inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormSubmit} inputs={
          [
            {type: "text", label: "Year", name: "year", placeholder: "Ex. 2021-22"},
            {type: "text", label: "Project Name", name: "projectName", placeholder: "Ex. Horses"},
            {type: "text", label: "Description", name: "description", placeholder: "Ex. Learn how to care for horses"},
            {type: "select", label:"Project Type", name: "type", options: [{label: "Animal", value: "animal"}]},
            {type: "date", label:"Start Date", name: "startDate"},
            {type: "date", label:"End Date", name: "endDate"}
          ]
        }/>
      )}
    </main>
  );
}