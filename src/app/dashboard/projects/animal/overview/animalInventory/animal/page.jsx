"use client";

import classes from './styles.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import ActionBar from '@/app/components/ActionBar';
import FormModel from '@/app/components/models/DynamicFormModel';
import { updateRateOfGain, getAnimal } from '@/app/_db/srvactions/projects/animalProject';

import CloverLoader from '@/app/components/CloverLoader';
import { CiEdit } from "react-icons/ci";

const formBlueprint = {
    endingWeight: null,
    endingDate: null,
    beginningWeight: null,
    beginningDate: null
}

function Card({ title, action, children }) {
    return (
        <div className={classes.card}>
            <span id={classes.sectionTitle}>{title}</span>

            <div className={classes.children}>
                {children}
            </div>

            <button className={classes.editInfoContainer} onClick={action}>
                <CiEdit />
                <span id={classes.editInfo}>Edit</span>
            </button>
        </div>
    )
}

function CardItem({ label, value }) {
    return (
        <span className={classes.cardItem}>{label}: {value}</span>
    )
}

export default function Animal({ searchParams: {project, animal} }) {
    const [animalData, setAnimalData] = useState(undefined);
    const [animalInfoFormCard, setAnimalInfoFormCard] = useState(false);
    const [weightFormCard, setWeightFormCard] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [invalidateData, setInvalidateData] = useState(false);

    const [formInfo, setFormInfo] = useState(formBlueprint);
    const [formState, formAction] = useFormState(updateRateOfGain, formBlueprint);
    
    useEffect(() => {
        getAnimal(animal).then((data) => {
          setAnimalData(data);
          setInvalidateData(false);
          setIsLoading(false);
        });
    }, [invalidateData, animal]);

    const handleChange = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = () => {
        setWeightFormCard(false);
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
            <ActionBar title="Animal" disableBack={false} />
            <div className={classes.header}>
                <span className={classes.title}>Animal</span>
            </div>
            <div className={classes.cardContainer}>
                {/* ANIMAL INFO */}
                <Card title="Animal Information" action={() => setAnimalInfoFormCard(true)}>
                    <CardItem label="Name" value={animalData?.name} />
                    <CardItem label="Birth date" value={animalData?.birthdate} />
                    <CardItem label="Species" value={animalData?.species} />
                    <CardItem label="Sire breed" value={animalData?.sireBreed} />
                    <CardItem label="Dam breed" value={animalData?.damBreed} />
                </Card>

                {/* {animalInfoFormCard && (
                    <FormModel title="Edit Rate of Gain" hideForm={() => setWeightFormCard(false)} inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormSubmit} inputs={
                        [
                            {type: "hidden", name: "projectId", defaultValue: project},
                            {type: "hidden", name: "animalId", defaultValue: animal},

                            {type: "text", label: "Name", name: "name", placeholder: "Ex. Billy"},
                            {type: "date", label: "Birth Date", name: "birthdate", placeholder: "Ex. 2023-02-06"},

                            {type: "text", label: "Species", name: "species", placeholder: "Ex. Sheep"},
                            {type: "text", label: "Sire Breed", name: "sireBreed", placeholder: "Ex. Sheep"},
                            {type: "text", label: "Dam Breed", name: "damBreed", placeholder: "Ex. Sheep"},
                        ]
                    } />
                )} */}

                {/* RATE OF GAIN */}
                <Card title="Animal Rate of Gain" action={() => setWeightFormCard(true)}>
                    <CardItem label="Ending Weight" value={animalData?.endWeight} />
                    <CardItem label="Ending Date" value={animalData?.endDate} />
                    <CardItem label="Beginning Weight" value={animalData?.beginningWeight} />
                    <CardItem label="Beginning Date" value={animalData?.beginningDate} />
                </Card>

                {weightFormCard && (
                    <FormModel title="Edit Rate of Gain" hideForm={() => setWeightFormCard(false)} inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormSubmit} inputs={
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
            </div>
        </main>
    )
}