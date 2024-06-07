"use client";

import classes from "./styles.module.css";
import { useState, useEffect } from "react";
import { useFormState } from 'react-dom';

import ActionBar from "@/app/components/ActionBar";
import FormModel from '@/app/components/models/DynamicFormModel';
import { addFeedNoForm, getFeedDocs, getFeedPurchaseDocs, addFeedPurchase } from "@/app/_db/srvactions/projects/animalProject";
import CloverLoader from '@/app/components/CloverLoader';

import { AddButton } from "@/app/components/logging/ActionButton";
import PageHeader from "@/app/components/PageHeader";
import TableCard from "@/app/components/logging/RecordTable";

const formBlueprint = {
  feedType: null,
  cost: null,
  amountPurchased: null,
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
    { name: "Date", key: "datePurchased", format: "date" },
    { name: "Feed Type", key: "feedId.name" },
    { name: "Total Cost of Purchase", key: "totalCost", format: "currency" },
    { name: "Amount Purchased", key: "amountPurchased", format: "weight"},
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

    if (!newFeed) return;
    addFeedNoForm(newFeed, project);
    setInvalidateOptions(true);
  }

  useEffect(() => {
    getFeedPurchaseDocs(project).then((data) => {
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
    });
  }, [invalidateOptions,project]);

  return (
    <main>
      <ActionBar title="Feed Inventory" disableBack={false} />
      <PageHeader title="Feed Inventory" disableBack={false} />
      
      <div className="btnContainer" >
        <div className="btnGroup" style={{marginLeft: "auto"}}>
          <AddButton text="Add Feed" handleClick={addFeedPrompt} />
          <AddButton text="Add Feed Purchases" handleClick={() => setShowFormCard(true)} />
        </div>
      </div>

      {showFormCard && (
        <FormModel title="Feed Purchased" hideForm={() => setShowFormCard(false)} inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormSubmit} inputs={
          [
            {type: "hidden", name: "projectId", defaultValue: project},
            {type: "select", label: "Feed Type", name: "feedId", options: feedOptions},
            {type: "date", label: "Date Purchased", name: "datePurchased", placeholder: "Ex. 2022-02-22"},
            {type: "number", label: "Total Cost of Purchase", name: "totalCost", placeholder: "Ex. 20", step: "0.01"},
            {type: "number", label: "Amount Purchased (lbs)", name: "amountPurchased", placeholder: "Ex. 2", step: "0.01"},
          ]
        } />
      )}

      <TableCard 
        data={tableData} 
        headers={headers} 
        dataLoaded={!isLoading}
      />

      {isLoading && (
        <div className={classes.loaderContainer}>
          <CloverLoader />
        </div>
      )}
    </main>
  );
}