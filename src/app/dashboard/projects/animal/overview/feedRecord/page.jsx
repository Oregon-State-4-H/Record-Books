"use client";

import classes from './styles.module.css';
import { useState, useEffect, use } from 'react';
import { useFormState } from 'react-dom';

import ActionBar from '@/app/components/ActionBar';
import FormModel from '@/app/components/models/DynamicFormModel';
import CloverLoader from '@/app/components/CloverLoader';

import { AddButton } from '@/app/components/logging/ActionButton';
import PageHeader from '@/app/components/PageHeader';
import TableCard from '@/app/components/logging/RecordTable';
import { getDailyFeedDocs, addDailyFeed, getFeedDocs, getFeedPurchaseDocs } from '@/app/_db/srvactions/projects/animalProject';
import { PDFDownloadButton, PDFPreviewButton } from '@/app/components/logging/ActionButton';
import PDFPreviewModel from '@/app/components/models/PDFPreviewModel';
import DailyFeed from '@/app/components/reports/animalScience/DailyFeed';

const data = {
  user: {
      name: "John Doe",
      county: "Benton",
  },
  animal: {
      type: "Chicken",
      identification: "325",
  },
  month: "May",
  feed: [
      { date: new Date(2023, 5, 1), feed1Lb: 10, feed1Cost: 5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Good consumption" },
      { date: new Date(2023, 5, 2), feed1Lb: 9, feed1Cost: 4.5, feed2Lb: 7, feed2Cost: 3.5, feed3Lb: 11, feed3Cost: 5.5, notes: "Reduced feed" },
      { date: new Date(2023, 5, 3), feed1Lb: 11, feed1Cost: 5.5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Normal" },
      { date: new Date(2023, 5, 4), feed1Lb: 10, feed1Cost: 5, feed2Lb: 9, feed2Cost: 4.5, feed3Lb: 13, feed3Cost: 6.5, notes: "High consumption" },
      { date: new Date(2023, 5, 5), feed1Lb: 10, feed1Cost: 5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Good consumption" },
      { date: new Date(2023, 5, 6), feed1Lb: 9, feed1Cost: 4.5, feed2Lb: 7, feed2Cost: 3.5, feed3Lb: 11, feed3Cost: 5.5, notes: "Reduced feed" },
      { date: new Date(2023, 5, 7), feed1Lb: 11, feed1Cost: 5.5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Normal" },
      { date: new Date(2023, 5, 8), feed1Lb: 10, feed1Cost: 5, feed2Lb: 9, feed2Cost: 4.5, feed3Lb: 13, feed3Cost: 6.5, notes: "High consumption" },
      { date: new Date(2023, 5, 9), feed1Lb: 10, feed1Cost: 5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Good consumption" },
      { date: new Date(2023, 5, 10), feed1Lb: 9, feed1Cost: 4.5, feed2Lb: 7, feed2Cost: 3.5, feed3Lb: 11, feed3Cost: 5.5, notes: "Reduced feed" },
      { date: new Date(2023, 5, 11), feed1Lb: 11, feed1Cost: 5.5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Normal" },
      { date: new Date(2023, 5, 12), feed1Lb: 10, feed1Cost: 5, feed2Lb: 9, feed2Cost: 4.5, feed3Lb: 13, feed3Cost: 6.5, notes: "High consumption" },
      { date: new Date(2023, 5, 13), feed1Lb: 10, feed1Cost: 5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Good consumption" },
      { date: new Date(2023, 5, 14), feed1Lb: 9, feed1Cost: 4.5, feed2Lb: 7, feed2Cost: 3.5, feed3Lb: 11, feed3Cost: 5.5, notes: "Reduced feed" },
      { date: new Date(2023, 5, 15), feed1Lb: 11, feed1Cost: 5.5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Normal" },
      { date: new Date(2023, 5, 16), feed1Lb: 10, feed1Cost: 5, feed2Lb: 9, feed2Cost: 4.5, feed3Lb: 13, feed3Cost: 6.5, notes: "High consumption" },
      { date: new Date(2023, 5, 17), feed1Lb: 10, feed1Cost: 5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Good consumption" },
      { date: new Date(2023, 5, 18), feed1Lb: 9, feed1Cost: 4.5, feed2Lb: 7, feed2Cost: 3.5, feed3Lb: 11, feed3Cost: 5.5, notes: "Reduced feed" },
      { date: new Date(2023, 5, 19), feed1Lb: 11, feed1Cost: 5.5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Normal" },
      { date: new Date(2023, 5, 20), feed1Lb: 10, feed1Cost: 5, feed2Lb: 9, feed2Cost: 4.5, feed3Lb: 13, feed3Cost: 6.5, notes: "High consumption" },
      { date: new Date(2023, 5, 21), feed1Lb: 10, feed1Cost: 5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Good consumption" },
      { date: new Date(2023, 5, 22), feed1Lb: 9, feed1Cost: 4.5, feed2Lb: 7, feed2Cost: 3.5, feed3Lb: 11, feed3Cost: 5.5, notes: "Reduced feed" },
      { date: new Date(2023, 5, 23), feed1Lb: 11, feed1Cost: 5.5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Normal" },
      { date: new Date(2023, 5, 24), feed1Lb: 10, feed1Cost: 5, feed2Lb: 9, feed2Cost: 4.5, feed3Lb: 13, feed3Cost: 6.5, notes: "High consumption" },
      { date: new Date(2023, 5, 25), feed1Lb: 10, feed1Cost: 5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Good consumption" },
      { date: new Date(2023, 5, 26), feed1Lb: 9, feed1Cost: 4.5, feed2Lb: 7, feed2Cost: 3.5, feed3Lb: 11, feed3Cost: 5.5, notes: "Reduced feed" },
      { date: new Date(2023, 5, 27), feed1Lb: 11, feed1Cost: 5.5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Normal" },
      { date: new Date(2023, 5, 28), feed1Lb: 10, feed1Cost: 5, feed2Lb: 9, feed2Cost: 4.5, feed3Lb: 13, feed3Cost: 6.5, notes: "High consumption" },
      { date: new Date(2023, 5, 29), feed1Lb: 10, feed1Cost: 5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Good consumption" },
      { date: new Date(2023, 5, 30), feed1Lb: 9, feed1Cost: 4.5, feed2Lb: 7, feed2Cost: 3.5, feed3Lb: 11, feed3Cost: 5.5, notes: "Reduced feed" },
      { date: new Date(2023, 5, 31), feed1Lb: 11, feed1Cost: 5.5, feed2Lb: 8, feed2Cost: 4, feed3Lb: 12, feed3Cost: 6, notes: "Normal" }
  ]
}


const formBlueprint = {
  feedType: null,
  amountFed: null,
}

const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getUTCFullYear();
  const month = ('0' + (d.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + d.getUTCDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const headers = [
  { name: "Date", key: "feedDate", format: "date" },
  { name: "Feed", key: "feedId.name" },
  { name: "Amount Fed", key: "feedAmount" },
  { name: "Feed Cost", key: "feedCost", format: "currency"},
]


export default function FeedRecord({ searchParams: {project, animal} }) {
  const [showFormCard, setShowFormCard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [isComplete, setIsComplete] = useState(false); // State to manage completeness


  const [formInfo, setFormInfo] = useState(formBlueprint);
  const [selectedMonth, setSelectedMonth] = useState("");

  const [formState, formAction] = useFormState(addDailyFeed, formBlueprint);
  const [invalidateData, setInvalidateData] = useState(false);
  const [tableData, setTableData] = useState(undefined);
  const [feedOptions, setFeedOptions] = useState(undefined);
  const [feedPurchases, setFeedPurchases] = useState(undefined);
  const [feedPurchaseOptions, setFeedPurchaseOptions] = useState(undefined);
  const [filteredFeedPurchaseOptions, setFilteredFeedPurchaseOptions] = useState(undefined);
  const [reportData, setReportData] = useState([]);


  const handleChange = (e) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    if (e.target.name === "feedId") {
      const selectedFeedType = e.target.value;
      const newFeedPurchaseOptions = feedPurchases.filter((item) => item.feedId._id === selectedFeedType).map((item) => {
        const price = (item.totalCost / item.amountPurchased).toFixed(2);
        const date = formatDate(item.datePurchased);
        return { value: item._id, label: `${item.feedId.name} - ${date} ($${price})` };
      });
      setFilteredFeedPurchaseOptions(newFeedPurchaseOptions);
    }
  }

  const handleFormSubmit = () => {
      setShowFormCard(false);
      setInvalidateData(true);
  }

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);

    if (e.target.value != "") {
      var filteredData = tableData.filter((item) => {
        var month = new Date(item.feedDate).getMonth() + 1;
        return month === parseInt(e.target.value);
      });
      setReportData(filteredData);
    }

  };

  useEffect(() => {
    try {
      getDailyFeedDocs(project, animal).then((data) => {
        var formattedData = data.map((item) => {
          return {
            ...item,
            feedCost: item.feedAmount * (item.feedPurchaceId.totalCost / item.feedPurchaceId.amountPurchased)
          }
        });
        setTableData(formattedData);
        setInvalidateData(false);
        setIsLoading(false);
        setIsComplete(true);
      });

      getFeedDocs(project).then((data) => {
        var opts = data?.map((item) => {
          return {value: item._id, label: item.name}
        });
        setFeedOptions(opts);
      });

      getFeedPurchaseDocs(project).then((data) => {
        setFeedPurchases(data);
        var opts = data?.map((item) => {
          var price = (item.totalCost / item.amountPurchased).toFixed(2);
          var date = formatDate(item.datePurchased);
          return {value: item.price, label: item.feedId.name + " - " + date + " ($" + price + ")"}
        });
        setFeedPurchaseOptions(opts);
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, [invalidateData]);

  useEffect(() => {
    if (feedOptions && feedOptions.length > 0 && feedPurchases) {
      const selectedFeedType = feedOptions[0].value;
      const newFeedPurchaseOptions = feedPurchases.filter((item) => item.feedId._id === selectedFeedType).map((item) => {
        const price = (item.totalCost / item.amountPurchased).toFixed(2);
        const date = formatDate(item.datePurchased);
        return { value: item._id, label: `${item.feedId.name} - ${date} ($${price})` };
      });
      setFilteredFeedPurchaseOptions(newFeedPurchaseOptions);
      setFormInfo({ ...formInfo, feedType: selectedFeedType });
    }
  }, [feedOptions, feedPurchases]);

  const filteredTableData = tableData?.filter((item) => {
    if (!selectedMonth) return true;
    const month = new Date(item.feedDate).getMonth() + 1;
    console.log(month);
    return month === parseInt(selectedMonth);
  }).sort((a, b) => new Date(a.feedDate) - new Date(b.feedDate));

  return (
    <main>
      <ActionBar title="Daily Feed Log" disableBack={false} />
      <PageHeader title="Daily Feed Log" disableBack={false} />

      <div className="btnContainer">
        <div className="btnGroup">
          { isComplete && selectedMonth != "" &&
            <>
              <PDFPreviewButton text="Preview Record" handleClick={() => setShowPreview(true)} />
              <PDFDownloadButton text="Download Record" document={<DailyFeed data={data} />} fileName={"Daily Feed Record for Market Animal.pdf"} />
            </>
          }
        </div>

        <div className="btnGroup" style={{marginLeft: "auto"}}>
          <AddButton text="Add Info" handleClick={() => setShowFormCard(true)} />
        </div>
      </div>

      <div className={classes.filter} style={{ marginTop: "20px", marginBottom: "20px" }}>
        <label htmlFor="monthFilter">Filter by Month: </label>
        <select id={classes.monthFilter} name="monthFilter" onChange={handleMonthChange}>
          <option value="">All</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      {showFormCard && (
        <FormModel title="Add Feed Record" hideForm={() => setShowFormCard(false)} inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormSubmit} inputs={
          [
            {type: "hidden", name: "projectId", defaultValue: project},
            {type: "hidden", name: "animalId", defaultValue: animal},

            {type: "date", label: "Date", name: "feedDate", placeholder: "Ex. 2021-01-01"},
            {type: "select", label: "Feed Type", name:"feedId", placeholder: "Ex. hay", options: feedOptions},
            {type: "select", label: "From Purchase", name:"feedPurchaceId", options: filteredFeedPurchaseOptions},
            {type: "number", label: "Amount Fed (lbs)", name: "feedAmount", placeholder: "Ex. 2", step: "0.01"},
          ]
        } />
      )}

      { showPreview &&
        <PDFPreviewModel title="Daily Feed Preview" handleClose={() => setShowPreview(false)} >
          <DailyFeed data={data} />
        </PDFPreviewModel>
      }

      <TableCard
        data={filteredTableData}
        headers={headers}
        dataLoaded={!isLoading}
      />
      {isLoading && <div className={classes.loaderContainer}>
        <CloverLoader />
      </div>}
    </main>
  )
}