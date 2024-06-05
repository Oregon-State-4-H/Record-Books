"use client";

import classes from './styles.module.css';
import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import ActionBar from '@/app/components/ActionBar';
import FormModel from '@/app/components/models/DynamicFormModel';
import CloverLoader from '@/app/components/CloverLoader';

import { getDailyFeedDocs } from '@/app/_db/srvactions/projects/animalProject';

import { IoMdAdd } from "react-icons/io";

const formBlueprint = {
  feedType: null,
  amountFed: null,
}

function TableCard({ id, data, dataLoaded }) {
  const [feedData, setFeedData] = useState([]);

  useEffect(() => {
    if (id) {
      const feedData = feedData.filter((feed) => feed.animalID === id);
      if (feedData) {
        setFeedData(feedData);
      }
    }
  }, [id, feedData]);

  if ((!data || data.length == 0) && dataLoaded) {
    return (
      <>
        <div className={classes.infoSection}>
          <h1 className={classes.infoSectionHeader}>Hmm... your log is empty!</h1>
          <p>{"Let's fix that! Add your first entry above."}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>Feed Type</th>
            <th>Amount Fed</th>
          </tr>
        </thead>

        <tbody>
          {feedData?.map((feedType, index) => (
            <tr key={index}>
              <td>{feedType.type}</td>
              <td>{feedType.amount} {feedType.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default function FeedRecord({ searchParams: {project, animal} }) {
  const [feedData, setFeedData] = useState(undefined);
  const [showFormCard, setShowFormCard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formInfo, setFormInfo] = useState(formBlueprint);

  const [formState, formAction] = useFormState(formBlueprint);
  // const [formState, formAction] = useFormState(addFeed, formBlueprint);
  const [invalidateData, setInvalidateData] = useState(false);

  const handleChange = (e) => {
      setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }

  const handleFormSubmit = () => {
      setShowFormCard(false);
      setInvalidateData(true);
  }

  useEffect(() => {
    getDailyFeedDocs(project, animal).then((data) => {
      setFeedData(data);
      setIsLoading(false);
    });
  }, [invalidateData]);

  return (
    <>
      <div className={classes.animalName}>{animalData?.type} - {animalData?.name}</div>
      
      <div className={classes.sectionHeader}>
        <span className={classes.sectionTitle}>Daily Feed Log</span>
        <button className={classes.addInfoContainer} onClick={() => setShowFormCard(true)}>
          <IoMdAdd />
          <span id={classes.addInfo}>Add Feeding Data</span>
        </button>
      </div>

      {showFormCard && (
        // <FormCard title="Add Feed Record" onClose={() => setShowFormCard(false)} options={animals} />
        <FormModel title="Add Feed Record" hideForm={() => setShowFormCard(false)} inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormSubmit} inputs={
          [
            {type: "hidden", name: "projectId", defaultValue: project},
            {type: "hidden", name: "animI", defaultValue: animal},

            {type: "select", label: "Feed Type", name:"feedType", placeholder: "Ex. hay"},
            {type: "number", label: "Amount Fed", name: "amountFed", placeholder: "Ex. 2"},
            {type: "text", label: "Unit", name: "unit", placeholder: "Ex. lbs"},
          ]
        } />
      )}

      <TableCard id={id} data={animalData} dataLoaded={!isLoading} />
      {isLoading && <div className={classes.loaderContainer}>
        <CloverLoader />
      </div>}
    </>
  )
}