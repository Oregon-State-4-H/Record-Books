"use client";

import classes from './styles.module.css';
import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import ActionBar from '@/app/components/ActionBar';
import FormModel from '@/app/components/models/DynamicFormModel';
import CloverLoader from '@/app/components/CloverLoader';

import { IoMdAdd } from "react-icons/io";

const formBlueprint = {
  feedType: null,
  amountFed: null,
}

function TableCard({ id, data, dataLoaded }) {
  // const feed = demoData.feed;
  const [feedData, setFeedData] = useState([]);

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

  useEffect(() => {
    if (id) {
      const feedData = feedData.filter((feed) => feed.animalID === id);
      if (feedData) {
        setFeedData(feedData);
      }
    }
  }, [id, feedData]);

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

function FormCard({ title, onClose, options }) {
  const [data, setData] = useState(options[0]._id);

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

        <label className={classes.label}>
          Feed Type
          <select className={classes.dropdownBtn} onChange={onOptionChangeHandler}>
            {options.map((options, index) => {
              return (
                <option key={index} value={options._id}>
                  {options.type} ({options.name})
                </option>
              )
            })}
          </select>
        </label>

        <label className={classes.label}>
            Amount Fed
            <input className={classes.textInputBox} type="number" onChange={event => {setValue(event.target.value)}} />
        </label>

        <label className={classes.label}>
            Unit
            <input className={classes.textInputBox} type="text" onChange={event => {setValue(event.target.value)}} />
        </label>
        
        <button className={classes.submitBtn}>Submit</button>

      </div>
    </div>
  )
}

export default function FeedRecord({ searchParams: {id} }) {
  const [animalData, setAnimalData] = useState(undefined);
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
    if (id) {
      let animalData = animals.find((animal) => animal._id === id);
      if (animalData) {
        setAnimalData(animalData);
      }
    }
  }, []);

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
            {type: "select", label: "Feed Type", name:"feedType", placeholder: "Ex. hay"},
            {type: "number", label: "Amount Fed", name: "amountFed", placeholder: "2"},
            {type: "text", label: "Unit", name: "unit", placeholder: "lbs"},
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