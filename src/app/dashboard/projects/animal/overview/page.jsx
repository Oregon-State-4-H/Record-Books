"use client";

import ActionBar from '@/app/components/ActionBar';
import classes from './styles.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from "next/navigation";
import { useFormState } from "react-dom";
import { getProject, updateProject } from "@/app/_db/srvactions/project";
import { getAnimalDocs } from '@/app/_db/srvactions/projects/animalProject';
import FormModel from '@/app/components/models/DynamicFormModel';
import PageHeader from '@/app/components/PageHeader';
import { EditButton } from '@/app/components/logging/ActionButton';

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
    const [animalOptions, setAnimalOptions] = useState([]);
    const [invalidateData, setInvalidateData] = useState(false);

    const [formInfo, setFormInfo] = useState(ProjectInfo);
    const [formState, formAction] = useFormState(updateProject, ProjectInfo);
    const [selectedAnimal, setSelectedAnimal] = useState(undefined);
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (e) => {
      setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    }

    const selectAnimal = (e) => {
      setSelectedAnimal(e.target.value);
    }

    const navigateToFeedRecord = () => {
      if (!selectedAnimal) return;
      router.push(pathname + "/feedRecord?project=" + project + "&animal=" + selectedAnimal);
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
        setAnimalOptions(data?.map((doc) => ({ value: doc._id, label: doc.name + " (" + doc.species + ")" })));
        if (data.length > 0) {
          setSelectedAnimal(data[0]._id);
        }
      });
    }, [invalidateData, project]);

    return (
      <main>
          <ActionBar title="Project Overview" disableBack={false} />
          <PageHeader title="Project Overview" disableBack={false} />

          <div className="btnContainer">
            <div className="btnGroup" style={{marginLeft: "auto"}}>
              <EditButton text="Edit Project Info" handleClick={() => setShowEditInfoModal(true)} />
            </div>
          </div>

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
          
          <div className={classes.cardContainer}>
            <div className={classes.cardGroup}>
              {/* ANIMAL INVENTORY AND PURCHASES */}
              <Link href={{pathname: "overview/animalInventory", query: {project: project}}}>
                <Card title = "Animal Inventory and Purchases" />
              </Link>
              
              {/* EQUIPMENT, SUPPLIES, AND FEED INVENTORY */}
              <Link href={{pathname: "overview/supplyInventory", query: {project: project}}}>
                <Card title = "Equipment and Supplies" />
              </Link>

              {/* OTHER EXPENSES */}
              <Link href={{pathname: "overview/expenses", query: {project: project}}}>
                <Card title = "Other Expenses" />
              </Link>

              {/* FEED RECORD */}
              <div onClick={() => setShowModal(true)}>
                <Card title = "Feed Record" project={project} />
              </div>

              {showModal && (
                // <FormCard title="Select an Animal" onClose={() => setShowModal(false)} options={animalData} />
                <FormModel title="Select Animal" hideForm={() => setShowModal(false)} inputChangeHandler={selectAnimal} 
                  formAction={navigateToFeedRecord} postSubmitAction={() => {}} submitButtonText="Go"
                  inputs={[
                    {type: "select", name: "animal", label: "Animal", options: animalOptions},
                  ]
                }/>
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