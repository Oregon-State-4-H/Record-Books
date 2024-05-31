"use client";

import classes from './styles.module.css';
import ActionBar from '@/app/components/ActionBar';
import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import FormModel from '@/app/components/models/DynamicFormModel';
import { updateRateOfGain, getAnimal } from '@/app/_db/srvactions/projects/animalProject';

import CloverLoader from '@/app/components/CloverLoader';
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

const formBlueprint = {
    endingWeight: null,
    endingDate: null,
    beginningWeight: null,
    beginningDate: null
}

function Card({ data, dataLoaded }) {
    console.log("== DATA: ", data)
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
}

export default function Rog({ searchParams: project, animal}) {
    const [cardData, setCardData] = useState(undefined);
    const [showFormCard, setShowFormCard] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [invalidateData, setInvalidateData] = useState(false);

    const [formInfo, setFormInfo] = useState(formBlueprint);
    const [formState, formAction] = useFormState(updateRateOfGain, formBlueprint);

    const handleChange = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = () => {
        setShowFormCard(false);
        setInvalidateData(true);
    }

    useEffect(() => {
        try {
            getAnimal(animal).then((data) => {
                setCardData(data);
                setInvalidateData(false);
                setIsLoading(false);
            });
        } catch (error) {
            console.error("Error fetching animals: ", error);
        }
    }, [invalidateData, animal]);

    return (
        <main>
            <ActionBar title="Animal Rate of Gain" disableBack={false} />
            <div className={classes.sectionHeader}>
                <span className={classes.sectionTitle}>Animal Rate of Gain</span>
                <button className={classes.addInfoContainer} onClick={() => setShowFormCard(true)}>
                    <IoMdAdd />
                    <span id={classes.addInfo}>Add Rate of Gain</span>
                </button>
            </div>

            {showFormCard && (
                <FormModel title="Add Rate of Gain" hideForm={() => setShowFormCard(false)} inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormSubmit} inputs={
                    [
                        {type: "hidden", name: "projectId", defaultValue: project},
                        {type: "hidden", name: "animalId", defaultValue: animal},
                        
                        {type: "number", label: "Ending Weight", name: "endWeight", placeholder: "Ex. 40lbs"},
                        {type: "date", label: "Ending Date", name: "endDate", placeholder: "Ex. 2023-02-06"},
                       
                        {type: "number", label: "Beginning Weight", name: "beginningWeight", placeholder: "Ex. 10lbs"},
                        {type: "date", label: "Beginning Date", name: "beginningDate", placeholder: "Ex. 2022-02-06"},
                    ]
                } />
            )}

            <Card data={cardData} dataLoaded={!isLoading} />
            {isLoading && (
                <div className={classes.loaderContainer}>
                    <CloverLoader />
                </div>
            )}
        </main>
    )
}