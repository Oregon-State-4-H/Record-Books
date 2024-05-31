"use client";

import classes from './styles.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import ActionBar from '@/app/components/ActionBar';
import { getAnimal } from '@/app/_db/srvactions/projects/animalProject';

import { CiEdit } from "react-icons/ci";

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
    const [invalidateData, setInvalidateData] = useState(false);

    useEffect(() => {
        getAnimal(animal).then((data) => {
          setAnimalData(data);
          setInvalidateData(false);
        });
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

                {/* RATE OF GAIN */}
                <Card title="Animal Rate of Gain" action={() => setWeightFormCard(true)}>
                    <CardItem label="Ending Weight" value={animalData?.endWeight} />
                    <CardItem label="Ending Date" value={animalData?.endDate} />
                    <CardItem label="Beginning Weight" value={animalData?.beginningWeight} />
                    <CardItem label="Beginning Date" value={animalData?.beginningDate} />
                </Card>
            </div>
        </main>
    )
}