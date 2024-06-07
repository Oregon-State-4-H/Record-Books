"use client";

import { PDFViewer, Document } from "@react-pdf/renderer"
import DailyFeed from "@/app/components/reports/animalScience/DailyFeed"

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
  

export default function Preview() {
    return (
        <main>
        {/* //     <PDFViewer style={{ width: "100%", height: "100vh" }}>
        //         <Document>
        //            <DailyFeed data={data} />
        //         </Document>
        //     </PDFViewer> */}
        </main>
    )
}