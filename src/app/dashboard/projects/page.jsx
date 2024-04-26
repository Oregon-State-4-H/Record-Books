"use client";

import ActionBar from '@/app/components/ActionBar';
import classes from './styles.module.css';
import Link from 'next/link';
import demoData from '@/app/demoData.json';

export default function Projects() {
  return (
    <main>
      <ActionBar title="Projects" disableBack={true} />
      <h1>Projects</h1>
    </main>
  );
}
