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

  const [formInfo, setFormInfo] = useState(formBlueprint);

  const [formState, formAction] = useFormState(addDailyFeed, formBlueprint);
  const [invalidateData, setInvalidateData] = useState(false);
  const [tableData, setTableData] = useState(undefined);
  const [feedOptions, setFeedOptions] = useState(undefined);
  const [feedPurchases, setFeedPurchases] = useState(undefined);
  const [feedPurchaseOptions, setFeedPurchaseOptions] = useState(undefined);
  const [filteredFeedPurchaseOptions, setFilteredFeedPurchaseOptions] = useState(undefined);


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

  return (
    <main>
      <ActionBar title="Daily Feed Log" disableBack={false} />
      <PageHeader title="Daily Feed Log" disableBack={false} />

      <div className="btnContainer">
        <div className="btnGroup" style={{marginLeft: "auto"}}>
          <AddButton text="Add Info" handleClick={() => setShowFormCard(true)} />
        </div>
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

      <TableCard
        data={tableData}
        headers={headers}
        dataLoaded={!isLoading}
      />
      {isLoading && <div className={classes.loaderContainer}>
        <CloverLoader />
      </div>}
    </main>
  )
}