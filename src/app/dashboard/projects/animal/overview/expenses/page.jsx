"use client";

import classes from "./styles.module.css";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import ActionBar from "@/app/components/ActionBar";
import FormModel from "@/app/components/models/DynamicFormModel";
import { addExpense, getExpenseDocs } from "@/app/_db/srvactions/projects/animalProject";
import CloverLoader from "@/app/components/CloverLoader";
import TableCard from "@/app/components/logging/RecordTable";
import PageHeader from "@/app/components/PageHeader";
import { AddButton } from "@/app/components/logging/ActionButton";

const formBlueprint = {
  date: null,
  item: null,
  quantity: null,
  cost: null,
};

export default function Expenses({ searchParams: { project } }) {
  const [tableData, setTableData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [showFormCard, setShowFormCard] = useState(false);
  const [formInfo, setFormInfo] = useState(formBlueprint);

  const [formState, formAction] = useFormState(addExpense, formBlueprint);
  const [invalidateData, setInvalidateData] = useState(false);

  const headers = [
    { name: "Date", key: "date", format: "date" },
    { name: "Item(s)", key: "items" },
    { name: "Quantity", key: "quantity" },
    { name: "Total Cost", key: "cost", format: "currency"},
  ];

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    setShowFormCard(false);
    setInvalidateData(true);
  };

  useEffect(() => {
    try {
      getExpenseDocs(project).then((data) => {
        setTableData(data);
        setInvalidateData(false);
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, [invalidateData, project]);

  return (
    <main>
      <ActionBar title="Other Expenses" disableBack={false} />
      <PageHeader title="Other Expenses" disableBack={false} />

      <div className="btnContainer">
        <div className="btnGroup" style={{marginLeft: "auto"}}>
          <AddButton text="Add Expense" handleClick={() => setShowFormCard(true)} />
        </div>
      </div>


      {showFormCard && (
        <FormModel
          title="Add Expenses"
          hideForm={() => setShowFormCard(false)}
          inputChangeHandler={handleChange}
          formAction={formAction}
          postSubmitAction={handleFormSubmit}
          inputs={[
            { type: "hidden", name: "projectId", defaultValue: project },
            { type: "date", label: "Date", name: "date", placeholder: "Ex. 2022-02-22" },
            { type: "text", label: "Item(s)", name: "items", placeholder: "Ex. transportation, boarding" },
            { type: "number", label: "Number or Quantity", name: "quantity", placeholder: "Ex. 2" },
            { type: "number", label: "Total Cost", name: "cost", placeholder: "Ex. 10", step: "0.01"},
          ]}
        />
      )}

      <TableCard
        data={tableData}
        headers={headers}
        handleClick={() => showForm()}
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
