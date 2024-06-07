"use client";

import { useState, useEffect } from 'react';
import ActionBar from '@/app/components/ActionBar';
import styles from './styles.module.css';
import sectionOutline from "./sectionOutline.json"
import { useFormState } from "react-dom";
import TableCard from '@/app/components/logging/RecordTable';
import CloverLoader from '@/app/components/CloverLoader';
import { Document } from '@react-pdf/renderer';
import { AddButton, PDFDownloadButton, PDFPreviewButton } from '@/app/components/logging/ActionButton';

import { 
  addSection1, getSection1Docs, deleteSection1, updateSection1,
  addSection2, getSection2Docs, deleteSection2, updateSection2,
  addSection3, getSection3Docs, deleteSection3, updateSection3,
  addSection4, getSection4Docs, deleteSection4, updateSection4,
  addSection5, getSection5Docs, deleteSection5, updateSection5,
  addSection6, getSection6Docs, deleteSection6, updateSection6,
  addSection7, getSection7Docs, deleteSection7, updateSection7,
  addSection8, getSection8Docs, deleteSection8, updateSection8,
  addSection9, getSection9Docs, deleteSection9, updateSection9,
  addSection10, getSection10Docs, deleteSection10, updateSection10,
  addSection11, getSection11Docs, deleteSection11, updateSection11,
  addSection12, getSection12Docs, deleteSection12, updateSection12,
  addSection13, getSection13Docs, deleteSection13, updateSection13,
  addSection14, getSection14Docs, deleteSection14, updateSection14
} from '@/app/_db/srvactions/resume';
import Section1 from '@/app/components/reports/resume/Section1';
import Section2 from '@/app/components/reports/resume/Section2';
import Section3 from '@/app/components/reports/resume/Section3';
import Section4 from '@/app/components/reports/resume/Section4';
import Section5 from '@/app/components/reports/resume/Section5';
import Section6 from '@/app/components/reports/resume/Section6';
import Section7 from '@/app/components/reports/resume/Section7';
import Section8 from '@/app/components/reports/resume/Section8';
import Section9 from '@/app/components/reports/resume/Section9';
import Section10 from '@/app/components/reports/resume/Section10';
import Section11 from '@/app/components/reports/resume/Section11';
import Section12 from '@/app/components/reports/resume/Section12';
import Section13 from '@/app/components/reports/resume/Section13';
import Section14 from '@/app/components/reports/resume/Section14';
import FormModel from '@/app/components/models/DynamicFormModel';
import BackNavBtn from '@/app/components/BackNavBtn';
import PDFPreviewModel from '@/app/components/models/PDFPreviewModel';
import PageHeader from '@/app/components/PageHeader';

const sectionComponents = {
  '1': Section1,
  '2': Section2,
  '3': Section3,
  '4': Section4,
  '5': Section5,
  '6': Section6,
  '7': Section7,
  '8': Section8,
  '9': Section9,
  '10': Section10,
  '11': Section11,
  '12': Section12,
  '13': Section13,
  '14': Section14
};

export default function Section({ searchParams: {section} }) {
  const [tableData, setTableData] = useState(undefined);
  const [showFormCard, setShowFormCard] = useState(false);
  var headers = {}
  // var inputs = {}
  var pageTitle = ""
  var sectionObj = {}
  const PDFDoc = sectionComponents[section];
  var _srvActAdd = () => {}
  var _srvActGet = () => {}
  var _srvActUpt = () => {}
  var _srvActDel = () => {}
  var formBlueprint = {}
  const [inputs, setInputs] = useState({}); // State to manage form inputs
  const [isEdit, setIsEdit] = useState(false); // State to manage edit mode
  const [isComplete, setIsComplete] = useState(false); // State to manage completeness
  const [showPreview, setShowPreview] = useState(false);
  
  const [isLoading, setIsLoading] = useState(true);
  const [formInfo, setFormInfo] = useState(formBlueprint);
  const [invalidateData, setInvalidateData] = useState(false);

  const showForm = () => { setShowFormCard(true); }
  const hideForm = () => { setShowFormCard(false); }

  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }

  const resetForm = () => {
    setIsEdit(false);
    setInputs(sectionObj.form);
  }

  const handlePostSubmit = () => {
    hideForm();
    resetForm();
    setInvalidateData(true);
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this record?")) {
      _srvActDel(id).then(() => {
        setInvalidateData(true);
      });
    }
  }

  useEffect(() => {
    try {
      _srvActGet().then((data) => {
        setTableData(data);
        setIsLoading(false);
        setInvalidateData(false);
        setIsComplete(true);
      });

      setInputs(sectionObj.form);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  }, [invalidateData]);

  switch (section) {
    case '1':
      _srvActAdd = addSection1;
      _srvActGet = getSection1Docs;
      _srvActUpt = updateSection1;
      _srvActDel = deleteSection1;
      sectionObj = sectionOutline.section1;
      break;
    case '2':
      _srvActAdd = addSection2;
      _srvActGet = getSection2Docs;
      _srvActUpt = updateSection2;
      _srvActDel = deleteSection2;
      sectionObj = sectionOutline.section2;
      break;
    case '3':
      _srvActAdd = addSection3;
      _srvActGet = getSection3Docs;
      _srvActUpt = updateSection3;
      _srvActDel = deleteSection3;
      sectionObj = sectionOutline.section3;
      break;
    case '4':
      _srvActAdd = addSection4;
      _srvActGet = getSection4Docs;
      _srvActUpt = updateSection4;
      _srvActDel = deleteSection4;
      sectionObj = sectionOutline.section4;
      break;
    case '5':
      _srvActAdd = addSection5;
      _srvActGet = getSection5Docs;
      _srvActUpt = updateSection5;
      _srvActDel = deleteSection5;
      sectionObj = sectionOutline.section5;
      break;
    case '6':
      _srvActAdd = addSection6;
      _srvActGet = getSection6Docs;
      _srvActUpt = updateSection6;
      _srvActDel = deleteSection6;
      sectionObj = sectionOutline.section6;
      break;
    case '7':
      _srvActAdd = addSection7;
      _srvActGet = getSection7Docs;
      _srvActUpt = updateSection7;
      _srvActDel = deleteSection7;
      sectionObj = sectionOutline.section7;
      break;
    case '8':
      _srvActAdd = addSection8;
      _srvActGet = getSection8Docs;
      _srvActUpt = updateSection8;
      _srvActDel = deleteSection8;
      sectionObj = sectionOutline.section8;
      break;
    case '9':
      _srvActAdd = addSection9;
      _srvActGet = getSection9Docs;
      _srvActUpt = updateSection9;
      _srvActDel = deleteSection9;
      sectionObj = sectionOutline.section9;
      break;
    case '10':
      _srvActAdd = addSection10;
      _srvActGet = getSection10Docs;
      _srvActUpt = updateSection10;
      _srvActDel = deleteSection10;
      sectionObj = sectionOutline.section10;
      break;
    case '11':
      _srvActAdd = addSection11;
      _srvActGet = getSection11Docs;
      _srvActUpt = updateSection11;
      _srvActDel = deleteSection11;
      sectionObj = sectionOutline.section11;
      break;
    case '12':
      _srvActAdd = addSection12;
      _srvActGet = getSection12Docs;
      _srvActUpt = updateSection12;
      _srvActDel = deleteSection12;
      sectionObj = sectionOutline.section12;
      break;
    case '13':
      _srvActAdd = addSection13;
      _srvActGet = getSection13Docs;
      _srvActUpt = updateSection13;
      _srvActDel = deleteSection13;
      sectionObj = sectionOutline.section13;
      break;
    case '14':
      _srvActAdd = addSection14;
      _srvActGet = getSection14Docs;
      _srvActUpt = updateSection14;
      _srvActDel = deleteSection14;
      sectionObj = sectionOutline.section14;
      break;
    default:
      sectionObj = null;
      break;
  }

  const [addFormState, addFormAction] = useFormState(_srvActAdd, formBlueprint);
  const [editFormState, editFormAction] = useFormState(_srvActUpt, formBlueprint);

  if (sectionObj == null) {
    return (
      <main>
        <ActionBar title={"Section " + section} />
        <div className="pageHeader">
          <BackNavBtn id="headerBack" />
          <h1 className="pageTitle">{pageTitle}</h1>
      </div>
        <div className={styles.infoSection}>
          <h1 className={styles.infoSectionHeader}>Oh No!</h1>
          <p>It seems that the section you are looking for does not exist.</p>
          <p>Please check the URL and try again.</p>
        </div>
      </main>
    )
  }


  headers = sectionObj.headers;
  pageTitle = sectionObj.title;
  formBlueprint = headers.reduce((acc, header) => {
    acc[header.key] = null;
    return acc;
  }, {});

  const handleEdit = (id) => {
    var record = tableData.find((record) => record._id === id);
    setIsEdit(true);

    var newInputs = inputs.map((input) => ({
      ...input,
      defaultValue: record[input.name]
    }));
    
    newInputs.push({ name: "id", type: "hidden", defaultValue: id });

    console.log("newInputs", newInputs);
    setInputs(newInputs);
    showForm();
  }

  return (
    <main>
      <ActionBar title={pageTitle} />
      <PageHeader title={pageTitle} />

      <div className="btnContainer">
        <div className="btnGroup">
          { isComplete && (tableData && tableData.length > 0) &&
            <>
              <PDFPreviewButton text="Preview Section PDF" handleClick={() => setShowPreview(true)} />
              <PDFDownloadButton text="Download Section PDF" document={<Document><PDFDoc tableData={tableData} /></Document>} fileName={"My 4-H Resume - Section " + section + ".pdf"} />
            </>
          }
        </div>

        <div className="btnGroup">
          <AddButton text="Add Entry" handleClick={ 
            () => {
              resetForm();
              showForm();
            }
          } />
        </div>
      </div>

      { showPreview &&
        <PDFPreviewModel title={"Section " + section + " Preview"} handleClose={() => setShowPreview(false)}>
          <Document>
            <PDFDoc tableData={tableData} />
          </Document>
        </PDFPreviewModel>
      }

      <TableCard 
        data={tableData}
        headers={headers}
        dataLoaded={!isLoading} 
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {isLoading && <div className={styles.loaderContainer}>
        <CloverLoader />
      </div>}
      
      {/*  If is Edit, formAction is edit else add */}
      {showFormCard && ( 
        <FormModel title={isEdit ? "Edit Entry" : "Add Entry"}
        hideForm={hideForm} 
        inputChangeHandler={handleChange} 
        formAction={isEdit ? editFormAction : addFormAction}
        postSubmitAction={handlePostSubmit} 
        inputs={inputs} />)
      }
    </main>
  )
}