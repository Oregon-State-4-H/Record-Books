"use client";

import classes from './styles.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import ActionBar from '@/app/components/ActionBar';
import FormModel from '@/app/components/models/DynamicFormModel';
import { updateRateOfGain, getAnimal, updateAnimal } from '@/app/_db/srvactions/projects/animalProject';

import CloverLoader from '@/app/components/CloverLoader';
import { CiEdit } from "react-icons/ci";

const formBlueprint = {
    beginningWeight: null,
    beginningDate: null,
    endWeight: null,
    endDate: null
}

const formAnimalBlueprint = {
    name: null,
    birthdate: null,
    species: null,
    sireBreed: null,
    damBreed: null,
    purchaseDate: null,
    animalCost: null
}

const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = ('0' + (d.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + d.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
};

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
    const [animalFormInfo, setAnimalFormInfo] = useState(formAnimalBlueprint);

    const [formState, formAction] = useFormState(updateRateOfGain, formBlueprint);
    const [animalFormState, animalFormAction] = useFormState(updateAnimal, formAnimalBlueprint);
    
    useEffect(() => {
        getAnimal(animal).then((data) => {
          setAnimalData(data);
          setInvalidateData(false);
          setIsLoading(false);
        });
    }, [invalidateData, animal]);

    const handleChange = (e) => {
        setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
        setAnimalFormInfo({ ...animalFormInfo, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = () => {
        setAnimalInfoFormCard(false);
        setWeightFormCard(false);
        setInvalidateData(true);
    }

    useEffect(() => {
        try {
            getAnimal(animal).then((data) => {
                setAnimalData(data);
                setInvalidateData(false);
                setIsLoading(false);
            });
        } catch (error) {
            console.error("Error fetching animals: ", error);
        }
    }, [invalidateData, animal]);

    console.log("=== animalData: ", animalData);

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
                    <CardItem label="Birth date" value={formatDate(animalData?.birthdate)} />
                    <CardItem label="Species" value={animalData?.species} />
                    <CardItem label="Sire breed" value={animalData?.sireBreed} />
                    <CardItem label="Dam breed" value={animalData?.damBreed} />
                    <CardItem label="Purchase date or obtained" value={formatDate(animalData?.purchaseDate)} />
                    <CardItem label="Animal Cost" value={animalData?.animalCost} />
                </Card>

                {/* EDIT ANIMAL INFO MODAL */}
                {animalInfoFormCard && (
                    <FormModel title="Edit Animal Info" hideForm={() => setAnimalInfoFormCard(false)} inputChangeHandler={handleChange} formAction={animalFormAction} postSubmitAction={handleFormSubmit} inputs={
                        [
                            {type: "hidden", name: "projectId", defaultValue: project},
                            {type: "hidden", name: "animalId", defaultValue: animal},

                            {type: "text", label: "Name", name: "name", placeholder: "Ex. Billy"},
                            {type: "date", label: "Birth Date", name: "birthdate", placeholder: "Ex. 2023-02-06"},

                            {type: "text", label: "Species", name: "species", placeholder: "Ex. Sheep"},
                            {type: "text", label: "Sire Breed", name: "sireBreed", placeholder: "Ex. Sheep"},
                            {type: "text", label: "Dam Breed", name: "damBreed", placeholder: "Ex. Sheep"},
                            
                            {type: "date", label: "Purchase date or obtained", name: "purchaseDate", defaultValue: formatDate(animalData?.purchaseDate)},
                            {type: "number", label: "Animal Cost", name: "animalCost", placeholder: "Ex. $100"}
                        ]
                    } />
                )}

                {/* RATE OF GAIN */}
                <Card title="Animal Rate of Gain" action={() => setWeightFormCard(true)}>
                    <CardItem label="Beginning Weight" value={animalData?.beginningWeight + " lbs"} />
                    <CardItem label="Beginning Date" value={formatDate(animalData?.beginningDate)} />
                    <CardItem label="Ending Weight" value={animalData?.endWeight + " lbs"} />
                    <CardItem label="Ending Date" value={formatDate(animalData?.endDate)} />
                </Card>

                {/* EDIT RATE OF GAIN INFO MODAL */}
                {weightFormCard && (
                    <FormModel title="Edit Rate of Gain" hideForm={() => setWeightFormCard(false)} inputChangeHandler={handleChange} formAction={formAction} postSubmitAction={handleFormSubmit} inputs={
                        [
                            {type: "hidden", name: "projectId", defaultValue: project},
                            {type: "hidden", name: "animalId", defaultValue: animal},

                            {type: "number", label: "Beginning Weight (lbs)", name: "beginningWeight", placeholder: "Ex. 10lbs"},
                            {type: "date", label: "Beginning Date", name: "beginningDate", defaultValue: formatDate(animalData?.beginningDate)},

                            {type: "number", label: "Ending Weight (lbs)", name: "endWeight", placeholder: "Ex. 40lbs"},
                            {type: "date", label: "Ending Date", name: "endDate", defaultValue: formatDate(animalData?.endDate)},
                        ]
                    } />
                )}
            </div>
        </main>
    )
}