"use client";

import ActionBar from '@/app/components/ActionBar';
import classes from './styles.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import demoData from '@/app/demoData.json';
import BackNavBtn from '@/app/components/BackNavBtn';
import { redirect } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useFormState } from "react-dom";
import { getProject, updateProject } from "@/app/_db/srvactions/project";
import { CiEdit } from "react-icons/ci";
import { getAnimalDocs } from '@/app/_db/srvactions/projects/animalProject';
import FormModel from '@/app/components/models/DynamicFormModel';

const ProjectInfo = {
  _id: null,
  uid: null,
  name: null,
  description: null,
  short_description: null,
  year: null
}

function Card(props) {
    var title = props.title;
    
    return (
        <div className={classes.cardTitle}>{title}</div>
    )
}

function FormCard({ title, onClose, options }) {
  const [data, setData] = useState(options[0]?._id);

  const onOptionChangeHandler = (event) => {
    setData(event.target.value);
  }

  return (
    <div className={classes.overlay}>
      <div className={classes.formCard}>
        <div className={classes.formHeader}>
          <span className={classes.formTitle}>{title}</span>
          <button className={classes.closeBtn} onClick={onClose}>X</button>
        </div>

        <select className={classes.dropdownBtn} onChange={onOptionChangeHandler}>
          {options.map((options, index) => {
            return (
              <option key={index} value={options._id}>
                {options.type} ({options.name})
              </option>
            )
          })}
        </select>

        <Link href={{pathname: "overview/feedRecord", query: {id: data}}} className={classes.submitBtn} id={classes.feedRecordSubmitBtn}>Submit</Link>
      </div>
    </div>
  )
}

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getUTCFullYear();
  const month = ('0' + (d.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + d.getUTCDate()).slice(-2);
  return `${year}-${month}-${day}`;
};


export default function Overview({ searchParams: {project} }) {
    const [showModal, setShowModal] = useState(false);
    const [showEditInfoModal, setShowEditInfoModal] = useState(false);
    const [projectData, setProjectData] = useState(undefined);
    const [animalData, setAnimalData] = useState(undefined);
    const [invalidateData, setInvalidateData] = useState(false);

    

    const [formInfo, setFormInfo] = useState(ProjectInfo);
    const [formState, formAction] = useFormState(updateProject, ProjectInfo);
    

    const handleChange = (e) => {
      setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = () => {
      setShowEditInfoModal(false);
      setInvalidateData(true);
    }

    useEffect(() => {
      getProject(project).then((data) => {
        setProjectData(data);
        setInvalidateData(false);
      });

      getAnimalDocs(project).then((data) => {
        setAnimalData(data);
        console.log(data);
      });
    }, [invalidateData, project]);

    

    return (
        <main>
            <ActionBar title="Project Overview" disableBack={false} />

            <div className={classes.header}>
              <span className={classes.title}>Project Overview</span>
              <button className={classes.editInfoContainer} onClick={() => setShowEditInfoModal(true)}>
                <CiEdit />
                <span id={classes.editInfo}>Edit Project Info</span>
              </button>
              {showEditInfoModal && (
                <FormModel title="Edit Project Info" hideForm={() => setShowEditInfoModal(false)} imputChangeHandler={handleChange} 
                  formAction={formAction} postSubmitAction={handleFormSubmit} submitButtonText="Update Project Info" submitPendingText="Updating..."
                  inputs={[
                    {type: "hidden", name: "_id", defaultValue: projectData?._id},
                    {type: "hidden", name: "type", defaultValue: projectData?.type},
                    {type: "text", name: "year", label: "Year", placeholder: "Year", defaultValue: projectData?.year},
                    {type: "text", name: "projectName", label: "Project Name", placeholder: "Project Name", defaultValue: projectData?.projectName},
                    {type: "text", name: "description", label: "Description", placeholder: "Description", defaultValue: projectData?.description},
                    {type: "date", name: "startDate", label: "Start Date", defaultValue: formatDate(projectData?.startDate)},
                    {type: "date", name: "endDate", label: "End Date", defaultValue: formatDate(projectData?.endDate)},
                  ]
                }/>
              )}
            </div>
            
            <div className={classes.cardContainer}>
                <div className={classes.cardGroup}>
                    {/* ANIMAL INVENTORY AND PURCHASES */}
                    <Link href={{pathname: "overview/animalInventory", query: {project: project}}}>
                      <Card title = "Animal Inventory and Purchases" />
                    </Link>
                    
                    {/* EQUIPMENT, SUPPLIES, AND FEED INVENTORY */}
                    <Link href={{pathname: "overview/supplyInventory"}}>
                      <Card title = "Equipment, Supplies, and Feed Inventory" />
                    </Link>

                    {/* OTHER EXPENSES */}
                    <Link href={{pathname: "overview/expenses", query: {project: project}}}>
                      <Card title = "Other Expenses" />
                    </Link>

                    {/* FEED RECORD */}
                    <div onClick={() => setShowModal(true)}>
                      <Card title = "Feed Record" />
                    </div>

                    {showModal && (
                      <FormCard title="Select an Animal" onClose={() => setShowModal(false)} options={animalData} />
                    )}

                    {/* FEED INVENTORY */}
                    <Link href={{pathname: "overview/feedInventory", query: {project: project}}}>
                        <Card title = "Feed Inventory" />
                    </Link>
                </div>
            </div>
        </main>
    )
}