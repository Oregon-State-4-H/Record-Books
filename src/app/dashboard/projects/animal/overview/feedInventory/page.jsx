"use client";

import classes from "./styles.module.css";
import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from 'react-dom';

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

function TableCard({ data, headers, dataLoaded }) {
  console.log("=== Data for TableCard: ", data);
  
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
            {headers.map((header, headerID) => (
              <th key={headerID}>{header.name}</th>
            ))}
          </tr>
        </thead>

        {data && (
          <tbody>
            {data.map((rowData, rowID) => (
              <tr key={rowID}>
                {headers.map((header, colID) => (
                  <td key={colID}>
                    {Array.isArray(rowData[header.key]) ? (
                      <ul>
                        {rowData[header.key].map((value, index) => (
                          <li key={index}>{value}</li>
                        ))}
                      </ul>
                    ) : rowData[header.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </>
  );
}

export default function FeedInventory({ searchParams: {project} }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showFormCard, setShowFormCard] = useState(false);
  const [tableData, setTableData] = useState(undefined);
  const [feedOptions, setFeedOptions] = useState(undefined);

  const [formInfo, setFormInfo] = useState(formBlueprint);
  const [formState, formAction] = useFormState(addFeedPurchase, formBlueprint);
  const [invalidateData, setInvalidateData] = useState(false);
  const [invalidateOptions, setInvalidateOptions] = useState(false);

  const headers = [
    {name: "Date", key: "datePurchased"},
    {name: "Feed Type", key: "feedType"},
    {name: "Total Cost of Purchase", key: "totalCost"},
    {name: "Amount Purchased", key: "amountPurchased"},
  ];

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }

  const handleFormSubmit = () => {
    setShowFormCard(false);
    setInvalidateData(true);
  }

  const addFeedPrompt = () => {
    let newFeed = prompt("Please enter a new feed type");
    addFeedNoForm(newFeed, project);
    setInvalidateOptions(true);
  }

  useEffect(() => {
    getFeedPurchaseDocs(project).then((data) => {
      console.log("FeedPurchaseDocs", data);
      setTableData(data);
      setInvalidateData(false);
      setIsLoading(false);
    });
  }, [invalidateData, project]);

  useEffect(() => {
    getFeedDocs(project).then((data) => {
      setFeedOptions(data.map((feed) => {
        return { value: feed._id, label: feed.name }
      }))
      setInvalidateOptions(false);
      console.log("FeedDocs", data);
    });
  }, [invalidateOptions,project]);

  function invalidateDataHandler() {
    setInvalidateData(true);
  }

  function invalidateOptionsHandler() {
    setInvalidateOptions(true);
  }

  return (
    <main>
      <ActionBar title="Feed Inventory" disableBack={false} />
      <div className={classes.sectionTitle}>Feed Information</div>

      <div className={classes.btnContainer}>
        <button className={classes.addInfoContainer} onClick={() => setShowFormCard(true)}>
          <IoMdAdd />
          Add Feed Purchases
        </button>

        <button className={classes.addInfoContainer} onClick={addFeedPrompt}>
          <IoMdAdd />
          Add feed
        </button>
      </div>

      {showFormCard && (
        <FormModel title="Feed Purchased" hideForm={() => setShowFormCard(false)} inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormSubmit} inputs={
          [
            {type: "hidden", name: "projectId", defaultValue: project},
            {type: "select", label: "Feed Type", name: "feedId", options: feedOptions},
            {type: "date", label: "Date Purchased", name: "datePurchased", placeholder: "Ex. 2022-02-22"},
            {type: "number", label: "Total Cost of Purchase", name: "totalCost", placeholder: "Ex. 20"},
            {type: "number", label: "Amount Purchased", name: "amountPurchased", placeholder: "Ex. 2"},
          ]
        } />
      )}

      <TableCard data={tableData} headers={headers} dataLoaded={!isLoading} />
      {isLoading && (
        <div className={classes.loaderContainer}>
          <CloverLoader />
        </div>
      )}
    </main>
  );
}