"use client";

import classes from "./styles.module.css";
import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from 'react-dom';

// import demoData from "@/app/demoData.json";
import ActionBar from "@/app/components/ActionBar";
import FormModel from '@/app/components/models/DynamicFormModel';
import { addFeedNoForm, getFeedDocs, getFeedPurchaseDocs, addFeedPurchase } from "@/app/_db/srvactions/projects/animalProject";
import CloverLoader from '@/app/components/CloverLoader';

import { IoMdAdd } from "react-icons/io";

const formBlueprint = {
  feedType: null,
  cost: null,
  amountPurchased: null,
}

function TableCard() {
  return (
    <>
      <div className={classes.sectionHeader}>
        <span className={classes.sectionTitle}>Feed Information</span>
        <button className={classes.addInfoContainer}>
          <IoMdAdd />
          <span id={classes.addInfo}>Add Info</span>
        </button>
      </div>
    </>
  );
}

function FormCard({ title, onClose, options, invalidateData, invalidateOptions, projectId}) {
  // const [data, setData] = useState(options[0]._id);

  const onOptionChangeHandler = (event) => {
    setData(event.target.value);
  };

  const addFeedType = () => {
    let newFeed = prompt("Please enter a new feed type");
    // Add new feed type to the database using serverAction addFeedType
    addFeedNoForm(newFeed, projectId);
    invalidateOptions();
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.formCard}>
        <div className={classes.formHeader}>
          <span className={classes.formTitle}>{title}</span>
          <button className={classes.closeBtn} onClick={onClose}>
            X
          </button>
        </div>

        <div className={classes.feedTypeContainer}>
          <label className={classes.label}>
            Feed Type
            <select
              className={classes.dropdownBtn}
              onChange={onOptionChangeHandler}
            >
              {options?.map((options, index) => {
                return (
                  <option key={index} value={options._id}>
                    {options.type}
                  </option>
                );
              })}
            </select>
          </label>

          <button id={classes.addFeed} onClick={addFeedType}>
            <IoMdAdd />
            <span id={classes.addInfo}>Add New Feed Type</span>
          </button>
        </div>

        <label className={classes.label}>
          Total Cost of Purchase
          <input
            className={classes.numInputBox}
            type="number"
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        </label>
        <label className={classes.label}>
          Amount Purchased
          <input
            className={classes.numInputBox}
            type="number"
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        </label>

        <button className={classes.submitBtn}>Add</button>
      </div>
    </div>
  );
}

export default function FeedInventory({ searchParams: {project} }) {
  // const feedType = demoData.feed;
  const [showModal, setShowModal] = useState(false);
  const [invalidateData, setInvalidateData] = useState(false);
  const [feedOptions, setFeedOptions] = useState(undefined);
  const [invalidateOptions, setInvalidateOptions] = useState(false);
  const [tableData, setTableData] = useState(undefined);

  useEffect(() => {
    getFeedPurchaseDocs().then((data) => {
      setTableData(data);
      setInvalidateData(false);
    });
  }, [invalidateData]);

  useEffect(() => {
    getFeedDocs().then((data) => {
      setFeedOptions(data);
      setInvalidateOptions(false);
    });
  }, [invalidateOptions]);

  function invalidateDataHandler() {
    setInvalidateData(true);
  }

  function invalidateOptionsHandler() {
    setInvalidateOptions(true);
  }

  return (
    <main>
      <ActionBar title="Feed Inventory" disableBack={false} />
      <div className={classes.sectionHeader}>
        <span className={classes.sectionTitle}>Feed Information</span>
        <button
          className={classes.addInfoContainer}
          onClick={() => setShowModal(true)}
        >
          <IoMdAdd />
          <span id={classes.addInfo}>Add Feed Purchases</span>
        </button>
      </div>

      {showModal && (
        <FormCard
          title="Feed Purchased"
          onClose={() => setShowModal(false)}
          options={feedOptions}
          invalidateData={invalidateDataHandler}
          invalidateOptions={invalidateOptionsHandler}
          projectId={project}
        />
      )}
    </main>
  );
}
