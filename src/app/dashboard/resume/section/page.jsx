"use client";

import { useState, useEffect } from 'react';
import ActionBar from '@/app/components/ActionBar';
import styles from './styles.module.css';
import { IoMdAdd } from "react-icons/io";

import demoData from "../../../demoData.json"
import formOutline from "./formOutline.json"
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
        <thead >
          <tr>
            {headers.map((header, headerID) => (
              <th key={headerID}>{header}</th>
            ))}
          </tr>
        </thead>
        
        if (data === null) {
          <tbody>
            {data.map((rowData, rowID) => (
              <tr key={rowID}>
                {Object.keys(rowData).map((item, colID) => (
                  <td key={colID}>
                    {Array.isArray(rowData[item]) ? (
                      <ul>
                        {rowData[item].map((value, index) => (
                          <li key={index}>{value}</li>
                        ))}
                      </ul>
                    ) : rowData[item]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        }
      </table>
    </>
  )
}

/*
function FormCard({ onClose, children }) {
  return (
    <div className={styles.overlay}>
      <form className={styles.formCard}>
        <button id={styles.closeBtn} onClick={onClose}>X</button>
        <div className={styles.children}>
          {children}
        </div>
        <button type="submit" className={styles.submitBtn}>Submit</button>
      </form>
    </div>
  )
}

function StringCard(props) {
  var text = props.text;
  var input_name = props.input_name;
  var onChangeHandler = props.onChangeHandler;

  return (
      <label className={styles.label}>
          {text}
          <input className={styles.textInputBox} 
          type="text"
          name={input_name}
          onChange={onChangeHandler}
          placeholder={text}
        />
      </label>
  )
}

function TextAreaCard(props) {
  var text = props.text;

  return (
      <label className={styles.label}>
          {text}
          <textarea className={styles.textInputBox} type="text" />
      </label>
  )
}

function NumberCard(props) {
  var text = props.text;
  var input_name = props.input_name;
  var onChangeHandler = props.onChangeHandler;

  return (
      <label className={styles.label}>
          {text}
          <input className={styles.textInputBox} 
            type="number"
            name={input_name}
            onChange={onChangeHandler}
            placeholder={text}
          />
      </label>
  )
}

function DropdownCard(props) {
  const [data, setData] = useState(undefined);
  var options = props.options;

  const onOptionChangeHandler = (event) => {
    setData(event.target.value);
  }

  return (
    <select className={styles.dropdownBtn} onChange={onOptionChangeHandler}>
      <option>Please choose one option</option>
      {options.map((option, index) => {
        return (
          <option key={index}>
            {option}
          </option>
        )
      })}
    </select>
  )
}

function addInfo3Columns(closeModal, col2, col3) {
  return (
    <FormCard onClose={closeModal}>
      <StringCard text="Year" />
      <TextAreaCard text={col2} />
      {col3 && <TextAreaCard text={col3} />}
    </FormCard>
  )
}

function addInfo5Cols(closeModal, col2, col3, col4, col5) {
  return (
    <FormCard onClose={closeModal}>
      <StringCard text="Year" />

      <TextAreaCard text={col2} />
      {col5 && <TextAreaCard text={col5} />}
      
      <NumberCard text={col3} />
      <NumberCard text={col4} />
    </FormCard>
  )
}

function addInfoDropDownSections(closeModal, activity, text, arr) {
  return (
    <FormCard onClose={closeModal}>
      <StringCard text="Year" />

      <StringCard text={activity} />
      <StringCard text={text} />

      <DropdownCard options={arr} />
    </FormCard>
  )
}
*/

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


function Section1() {
  const headers = ["Year", "Grade", "Name of Club/Group", "Number in Club/Group", "Club/Group Leader or Advisor", "Meetings Held", "Meetings Attended"]
  const data = demoData.section1
  const [tableData, setTableData] = useState(null);
  const [showFormCard, setShowFormCard] = useState(false);
  const inputs = formOutline.section1.form;

  const showForm = () => {
    setShowFormCard(true);
  }

  const hideForm = () => {
    setShowFormCard(false);
  }

  const formBlueprint = {
    year: null,
    grade: null,
    clubName: null,
    numInClub: null,
    clubLeader: null,
    meetingsHeld: null,
    meetingsAttended: null
  }

  const [formState, formAction] = useFormState(addSection1, formBlueprint);
  const [formInfo, setFormInfo] = useState(formBlueprint);

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    try {
      getSection1Docs()
        .then((data) => {
          setTableData(data);
        });
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  }, []);
    
  return (
    <>
      <TableCard title="4-H Involvement" data={tableData} headers={headers} handleClick={() => showForm()} />
      {showFormCard && (
        <div className={styles.overlay}>
          <form className={styles.formCard} action={formAction}>
            <button id={styles.closeBtn} onClick={hideForm}>X</button>
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
    </>
  )
}

function getSection(section) {
  switch (section) {
    case '1':
      return Section1();
    default:
      return null;
  }
}

export default function Section({ searchParams: {section} }) {
  return (
    <main>
        <ActionBar title={"Section " + section} />
        {getSection(section)}
    </main>
  )
}