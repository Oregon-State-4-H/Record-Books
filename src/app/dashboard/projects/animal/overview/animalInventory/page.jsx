"use client";

import classes from './styles.module.css';
import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import ActionBar from '@/app/components/ActionBar';
import FormModel from '@/app/components/models/DynamicFormModel';
import { addAnimal, getAnimal, getAnimalDocs } from '@/app/_db/srvactions/projects/animalProject';

import CloverLoader from '@/app/components/CloverLoader';
import { IoMdAdd } from "react-icons/io";

const formBlueprint = {
    name: null,
    species: null,
    animalId: null,
    birthdate: null,
    purchaseDate: null,
    sireBreed: null,
    damBreed: null,
}

function Card({ data, dataLoaded }) {
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
        <div className={classes.cardContainer}>
            <div className={classes.cardGroup}>
                <div className={classes.cardTitle}>Hi</div>
            </div>
        </div>
    )
}

export default function AnimalInventory({ searchParams: {project} }) {
    const [cardData, setCardData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [showFormCard, setShowFormCard] = useState(false);
    const [formInfo, setFormInfo] = useState(formBlueprint);

    const [formState, formAction] = useFormState(addAnimal, formBlueprint);
    const [invalidateData, setInvalidateData] = useState(false);
    
    const handleChange = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = () => {
        setShowFormCard(false);
        setInvalidateData(true);
    }

    useEffect(() => {
        try {
            getAnimalDocs(project).then((data) => {
                setCardData(data);
                setInvalidateData(false);
                setIsLoading(false);
            });
        } catch (error) {
            console.error("Error fetching projects: ", error);
        }
    }, [invalidateData, project]);

    return (
        <main>
            <ActionBar title="Animal Inventory" disableBack={false} />
            <div className={classes.sectionHeader}>
                <span className={classes.sectionTitle}>Animal Inventory</span>
                <button className={classes.addInfoContainer} onClick={() => setShowFormCard(true)}>
                    <IoMdAdd />
                    <span id={classes.addInfo}>Add Animal</span>
                </button>
            </div>

            {showFormCard && (
                <FormModel title="Add Animal" hideForm={() => setShowFormCard(false)} inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormSubmit} inputs={
                    [
                        {type: "hidden", name: "projectId", defaultValue: project},
                        {type: "text", label: "Name", name: "name", placeholder: "Ex. Billy"},
                        {type: "text", label: "Species (beef, goat, poultry, rabbit, sheep or swine)", name: "species", placeholder: "Ex. Sheep"},
                        {type: "text", label: "Identification of animal(s)", name: "animalId", placeholder: "Ex. Male"},
                        {type: "date", label: "Birth date of animal(s)", name: "birthdate", placeholder: "Ex. 2022-02-06"},
                        {type: "date", label: "Purchase date or obtained", name: "purchaseDate", placeholder: "Ex. 2022-02-14"},
                        {type: "text", label: "Breed of sire", name: "sireBreed", placeholder: "Ex. sheep"},
                        {type: "text", label: "Breed of dam", name: "damBreed", placeholder: "Ex. sheep"},
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