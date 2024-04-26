"use client";

import { useState, useEffect } from 'react';
import ActionBar from '@/app/components/ActionBar';
import styles from './styles.module.css';
import { IoMdAdd } from "react-icons/io";
import sectionOutline from "./sectionOutline.json"
import { useFormState } from "react-dom";
import { addSection1, getSection1Docs } from '@/app/_db/srvactions/resume/Section1';

function TableCard({ title, data, headers, handleClick }) {
  return (
    <>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>{title}</span>
        <button className={styles.addInfoContainer} onClick={handleClick}>
          <IoMdAdd />
          <span id={styles.addInfo}>Add Info</span>
        </button>
      </div>

      <table className={styles.table}>
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
  )
}

function FormInput({ type, label, name, placeholder, onChangeHandler }) {
  return (
    <label className={styles.label}>
      {label}
      <input className={styles.textInputBox}
        type={type}
        name={name}
        onChange={onChangeHandler}
        placeholder={placeholder}
      />
    </label>
  )
}

export default function Section({ searchParams: {section} }) {
  const [tableData, setTableData] = useState(undefined);
  const [showFormCard, setShowFormCard] = useState(false);
  var headers = {}
  var inputs = {}
  var pageTitle = ""
  var _srvActAdd = () => {}
  var _srvActGet = () => {}
  var formBlueprint = {}

  const [formState, formAction] = useFormState(addSection1, formBlueprint);
  const [formInfo, setFormInfo] = useState(formBlueprint);

  const showForm = () => { setShowFormCard(true); }
  const hideForm = () => { setShowFormCard(false); }

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    try {
      _srvActGet()
        .then((data) => {
          setTableData(data);
        });
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  }, []);


  switch (section) {
    case '1':
      _srvActAdd = addSection1;
      _srvActGet = getSection1Docs;
      headers = sectionOutline.section1.headers;
      inputs = sectionOutline.section1.form;
      pageTitle = sectionOutline.section1.title;
      formBlueprint = headers.reduce((acc, header) => {
        acc[header.key] = null;
        return acc;
      }, {});
      break;
  }

  return (
    <main>
      <ActionBar title={"Section " + section} />
      <TableCard title={pageTitle} data={tableData} headers={headers} handleClick={() => showForm()} />
      {showFormCard && (
        <div className={styles.overlay}>
          <form className={styles.formCard} action={formAction}>
            <button type="cancel" id={styles.closeBtn} onClick={hideForm}>X</button>
            <div className={styles.children}>
              {inputs.map((input, index) => {
                return (
                  <FormInput key={index} {...input} onChangeHandler={handleChange} />
                )
              })}
            </div>
            <button type="submit" className={styles.submitBtn}>Submit</button>
          </form>
        </div>
      )}
    </main>
  )
}