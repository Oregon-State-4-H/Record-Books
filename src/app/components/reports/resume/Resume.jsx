import { Document, Page, Text } from "@react-pdf/renderer";
import Section0 from "./Section0.jsx";
import Section1 from "./Section1.jsx";
import Section2 from "./Section2.jsx";
import Section3 from "./Section3.jsx";
import Section4 from "./Section4.jsx";
import Section5 from "./Section5.jsx";
import Section6 from "./Section6.jsx";
import Section7 from "./Section7.jsx";
import Section8 from "./Section8.jsx";
import Section9 from "./Section9.jsx";
import Section10 from "./Section10.jsx";
import Section11 from "./Section11.jsx";
import Section12 from "./Section12.jsx";
import Section13 from "./Section13.jsx";
import Section14 from "./Section14.jsx";


export default function PDFFile(resumeData) {
  var data = resumeData.resumeData;
  return (
    <Document>
        <Section0 userData={data['section0Data']}/> 
        <Section1 tableData={data['section1Data']}/>
        <Section2 tableData={data['section2Data']}/>
        <Section3 tableData={data['section3Data']}/>
        <Section4 tableData={data['section4Data']}/>
        <Section5 tableData={data['section5Data']}/>
        <Section6 tableData={data['section6Data']}/>
        <Section7 tableData={data['section7Data']}/>
        <Section8 tableData={data['section8Data']}/>
        <Section9 tableData={data['section9Data']}/>
        <Section10 tableData={data['section10Data']}/>
        <Section11 tableData={data['section11Data']}/>  
        <Section12 tableData={data['section12Data']}/>
        <Section13 tableData={data['section13Data']}/>
        <Section14 tableData={data['section14Data']}/>
    </Document>
  )
};