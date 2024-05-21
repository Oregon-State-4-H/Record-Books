"use client";

import classes from "./styles.module.css";
import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import ActionBar from "@/app/components/ActionBar";
import FormModel from "@/app/components/models/DynamicFormModel";
import { addExpense, getExpense, getExpenseDocs } from "@/app/_db/srvactions/projects/animalProject";
import CloverLoader from "@/app/components/CloverLoader";

import { IoMdAdd } from "react-icons/io";

const formBlueprint = {
  date: null,
  item: null,
  quantity: null,
  cost: null,
};

function formatValue(value, format) {
  if (!format) return value;

  switch (format) {
    case "date":
      return new Date(value).toLocaleDateString();
    case "currency":
      return `$${value.toFixed(2)}`;
    case "weight":
      return `${value} lbs`;
    default:
      return value;
  }
}

function TableCard({ data, headers, handleClick, dataLoaded }) {
  if ((!data || data.length == 0) && dataLoaded) {
    return (
      <>
        <div className={classes.infoSection}>
          <h1 className={classes.infoSectionHeader}>
            Hmm... your log is empty!
          </h1>
          <p>{"Let's fix that! Add your first entry above."}</p>
        </div>
      </>
    );
  }

  return (
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
              {headers.map((header, colID) => {
                const keys = header.key.split('.');
                let value = rowData;
                for (const key of keys) {
                  value = value[key];
                }
                const formattedValue = formatValue(value, header.format);
                return (
                  <td key={colID}>
                    {Array.isArray(formattedValue) ? (
                      <ul>
                        {formattedValue.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : formattedValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      )}
    </table>
  );
}

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
    { name: "Cost", key: "cost", format: "currency"},
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
      <div className={classes.sectionHeader}>
        <span className={classes.sectionTitle}>Other Expenses</span>
        <button
          className={classes.addInfoContainer}
          onClick={() => setShowFormCard(true)}
        >
          <IoMdAdd />
          <span id={classes.addInfo}>Add Expense</span>
        </button>
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
            { type: "number", label: "Cost", name: "cost", placeholder: "Ex. 10", step: "0.01"},
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
