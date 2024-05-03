"use client";

import { useState, useEffect } from 'react';
import ActionBar from '@/app/components/ActionBar';
import styles from './styles.module.css';
import { IoMdAdd } from "react-icons/io";
import sectionOutline from "./sectionOutline.json"
import { useFormState } from "react-dom";
import { addSection1, getSection1Docs } from '@/app/_db/srvactions/resume/Section1';
import { addSection2, getSection2Docs } from '@/app/_db/srvactions/resume/Section2';
import { addSection3, getSection3Docs } from '@/app/_db/srvactions/resume/Section3';
import { addSection4, getSection4Docs } from '@/app/_db/srvactions/resume/Section4';
import { addSection5, getSection5Docs } from '@/app/_db/srvactions/resume/Section5';
import { addSection6, getSection6Docs } from '@/app/_db/srvactions/resume/Section6';
import { addSection7, getSection7Docs } from '@/app/_db/srvactions/resume/Section7';
import { addSection8, getSection8Docs } from '@/app/_db/srvactions/resume/Section8';
import { addSection9, getSection9Docs } from '@/app/_db/srvactions/resume/Section9';
import { addSection10, getSection10Docs } from '@/app/_db/srvactions/resume/Section10';
import { addSection11, getSection11Docs } from '@/app/_db/srvactions/resume/Section11';
import { addSection12, getSection12Docs } from '@/app/_db/srvactions/resume/Section12';
import { addSection13, getSection13Docs } from '@/app/_db/srvactions/resume/Section13';
import { addSection14, getSection14Docs } from '@/app/_db/srvactions/resume/Section14';

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

function FormInput({ type, label, name, placeholder, onChangeHandler, options }) {

  if (type == "select" && options != undefined) {
    return (
      <label className={styles.label}>
        {label}
        <select className={styles.dropdownBtn}
          name={name}
          onChange={onChangeHandler}
          required
        >
          <option key="0" value="-1">Select an option</option>
          {options.map((option, index) => (
            <option key={index+1} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    )
  } else {
    return (
      <label className={styles.label}>
        {label}
        <input className={styles.textInputBox}
          type={type}
          name={name}
          onChange={onChangeHandler}
          placeholder={placeholder}
          required
        />
      </label>
    )
  }
}

export default function Section({ searchParams: {section} }) {
  const [tableData, setTableData] = useState(undefined);
  const [showFormCard, setShowFormCard] = useState(false);
  var headers = {}
  var inputs = {}
  var pageTitle = ""
  var sectionObj = {}
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
      sectionObj = sectionOutline.section1;
      break;
    case '2':
      _srvActAdd = addSection2;
      _srvActGet = getSection2Docs;
      sectionObj = sectionOutline.section2;
      break;
    case '3':
      _srvActAdd = addSection3;
      _srvActGet = getSection3Docs;
      sectionObj = sectionOutline.section3;
      break;
    case '4':
      _srvActAdd = addSection4;
      _srvActGet = getSection4Docs;
      sectionObj = sectionOutline.section4;
      break;
    case '5':
      _srvActAdd = addSection5;
      _srvActGet = getSection5Docs;
      sectionObj = sectionOutline.section5;
      break;
    case '6':
      _srvActAdd = addSection6;
      _srvActGet = getSection6Docs;
      sectionObj = sectionOutline.section6;
      break;
    case '7':
      _srvActAdd = addSection7;
      _srvActGet = getSection7Docs;
      sectionObj = sectionOutline.section7;
      break;
    case '8':
      _srvActAdd = addSection8;
      _srvActGet = getSection8Docs;
      sectionObj = sectionOutline.section8;
      break;
    case '9':
      _srvActAdd = addSection9;
      _srvActGet = getSection9Docs;
      sectionObj = sectionOutline.section9;
      break;
    case '10':
      _srvActAdd = addSection10;
      _srvActGet = getSection10Docs;
      sectionObj = sectionOutline.section10;
      break;
    case '11':
      _srvActAdd = addSection11;
      _srvActGet = getSection11Docs;
      sectionObj = sectionOutline.section11;
      break;
    case '12':
      _srvActAdd = addSection12;
      _srvActGet = getSection12Docs;
      sectionObj = sectionOutline.section12;
      break;
    case '13':
      _srvActAdd = addSection13;
      _srvActGet = getSection13Docs;
      sectionObj = sectionOutline.section13;
      break;
    case '14':
      _srvActAdd = addSection14;
      _srvActGet = getSection14Docs;
      sectionObj = sectionOutline.section14;
      break;
    default:
      sectionObj = null;
      break;
  }

  if (sectionObj == null) {
    return (
      <main>
        <ActionBar title={"Section " + section} />
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>Section {section}</span>
        </div>
        <div className={styles.table}>
          <p>Section {section} does not exist</p>
        </div>
      </main>
    )
  }

  headers = sectionObj.headers;
  inputs = sectionObj.form;
  pageTitle = sectionObj.title;
  formBlueprint = headers.reduce((acc, header) => {
    acc[header.key] = null;
    return acc;
  }, {});

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