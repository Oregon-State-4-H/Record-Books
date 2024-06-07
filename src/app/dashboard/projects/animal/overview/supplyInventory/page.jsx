"use client";

import classes from "./styles.module.css";
import { useState, useEffect } from "react";

import ActionBar from "@/app/components/ActionBar";
import FormModel from "@/app/components/models/DynamicFormModel";
import { getSupplyDocs, addSupply, } from "@/app/_db/srvactions/projects/animalProject";
import CloverLoader from "@/app/components/CloverLoader";

import { AddButton } from "@/app/components/logging/ActionButton";
import PageHeader from "@/app/components/PageHeader";
import TableCard from "@/app/components/logging/RecordTable";
import { useFormState } from "react-dom";

const formBlueprint = {
  description: null,
  startValue: null,
  endValue: null,
}

export default function SupplyInventory({ searchParams: {project} }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showFormCard, setShowFormCard] = useState(false);
  const [tableData, setTableData] = useState(undefined);

  const [formInfo, setFormInfo] = useState(formBlueprint);
  const [invalidateData, setInvalidateData] = useState(false);
  const [invalidateOptions, setInvalidateOptions] = useState(false);
  const [formState, formAction] = useFormState(addSupply, formBlueprint);

  const headers = [
    { name: "Equipment and supplies on hand", key: "description" },
    { name: "Value at Start of Record", key: "startValue", format: "currency" },
    { name: "Value at Clost of Record", key: "endValue", format: "currency" },
  ];

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }

  const handleFormSubmit = () => {
    setShowFormCard(false);
    setInvalidateData(true);
  }

  useEffect(() => {
    getSupplyDocs(project).then((data) => {
      setTableData(data);
      setInvalidateData(false);
      setIsLoading(false);
    });
  }, [invalidateData, project]);

  return (
    <main>
    <ActionBar title="Equipment and Supply Inventory" disableBack={false} />
    <PageHeader title="Equipment and Supply Inventory" disableBack={false} />
    
    <div className="btnContainer">
      <div className="btnGroup" style={{marginLeft: "auto"}}>
        <AddButton text="Add Info" handleClick={() => setShowFormCard(true)} />
      </div>
    </div>

    {showFormCard && (
      <FormModel title="Add Supply" hideForm={() => setShowFormCard(false)} inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormSubmit} inputs={
        [
          {type: "hidden", name: "projectId", defaultValue: project},
          {type: "text", label: "Equipment and supplies on hand", name: "description", placeholder: "Ex. Buckets"},
          {type: "number", label: "Value at Start of Record", name: "startValue", placeholder: "Ex. 20"},
          {type: "number", label: "Value at Close of Record", name: "endValue", placeholder: "Ex. 10", required: false},
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
  )
}
