"use client";

import classes from './styles.module.css';
import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import ActionBar from '@/app/components/ActionBar';
import FormModel from '@/app/components/models/DynamicFormModel';
import { addExpense, getExpense, getExpenseDocs } from '@/app/_db/srvactions/projects/animalProject';
import CloverLoader from '@/app/components/CloverLoader';

import { IoMdAdd } from "react-icons/io";

const formBlueprint = {
    date: null,
    item: null,
    quantity: null,
    cost: null,
}

function TableCard({ data, headers, handleClick, dataLoaded }) {
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
                            <th key={headerID}>{header}</th>
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
    )
}

export default function Expenses({ searchParams: {project} }) {
    const [tableData, setTableData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [showFormCard, setShowFormCard] = useState(false);
    const [formInfo, setFormInfo] = useState(formBlueprint);

    const [formState, formAction] = useFormState(addExpense, formBlueprint);
    const [invalidateData, setInvalidateData] = useState(false);

    const headers = ["Date", "Item(s)", "Number or Quantity", "Cost"];

    const handleChange = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = () => {
        setShowFormCard(false);
        setInvalidateData(true);
    }

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
      }, [invalidateData]);

    return (
        <main>
            <ActionBar title="Other Expenses" disableBack={false} />
            <div className={classes.sectionHeader}>
                <span className={classes.sectionTitle}>Other Expenses</span>
                <button className={classes.addInfoContainer} onClick={() => setShowFormCard(true)}>
                    <IoMdAdd />
                    <span id={classes.addInfo}>Add Expense</span>
                </button>
            </div>

            {showFormCard && (
                <FormModel title="Add Expenses" hideForm={() => setShowFormCard(false)} inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormSubmit} inputs={
                    [
                        {type: "hidden", name: "projectId", value: project},
                        {type: "date", label: "Date", name: "date", placeholder: "Ex. 2022-02-22"},
                        {type: "text", label: "Item(s)", name: "items", placeholder: "Ex. transportation, boarding"},
                        {type: "number", label: "Number or Quantity", name: "quantity", placeholder: "Ex. 2"},
                        {type: "number", label: "cost", name: "cost", placeholder: "Ex. 10"},
                    ]
                } />
            )}

            <TableCard data={tableData} headers={headers} handleClick={() => showForm()} dataLoaded={!isLoading} />
            {isLoading && <div className={classes.loaderContainer}>
                <CloverLoader />
            </div>}
        </main>
    )
}