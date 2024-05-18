import React from "react";
import { Text, View, StyleSheet, Page } from "@react-pdf/renderer";
import ReportStyles from "../ReportStyles.jsx";
import Footer from "../Footer.jsx";

let col1Flex = 1.25;
let col2Flex = 1;
let col3Flex = 3;
let col4Flex = 1.75;
let col5Flex = 3;
let col6Flex = 1;
let col7Flex = 1.5;

const styles = StyleSheet.create({
  headerRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    fontWeight: "bold",
    borderColor: "black",
    borderBottom: 2,
    borderLeft: 1,
    borderRight: 1,
    borderTop: 1,
    fontSize: 11,
  },
  tableRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    textAlign: "left",
    fontWeight: "normal",
    borderColor: "black",
    borderBottom: 1,
    borderLeft: 1,
    borderRight: 1,
    height: 25,
    alignContent: "center",
    fontSize: 10,
  },
  col1: {
    flex: col1Flex,
    borderRight: 1,
  },
  col2: {
    flex: col2Flex,
    borderRight: 1,
  },
  col3: {
    flex: col3Flex,
    borderRight: 1,
  },
  col4: {
    flex: col4Flex,
    borderRight: 1,
  },
  col5: {
    flex: col5Flex,
    borderRight: 1,
  },
  col6: {
    flex: col6Flex,
    borderRight: 1,
  },
  col7: {
    flex: col7Flex,
  },
});

function TableHeader(props) {
  const headerKey = props.headerKey;
  const isBreak = props.isBreak;

  if(isBreak === false){
    return (
      <View key={headerKey} style={styles.headerRow}>
        <View style={[styles.col1, ReportStyles.tableColAlignCenter]}>
          <Text>Year</Text>
        </View>
        <View style={[styles.col2, ReportStyles.tableColAlignCenter]}>
          <Text>Grade</Text>
        </View>
        <View style={[styles.col3, ReportStyles.tableColAlignCenter]}>
          <Text>Club/Group Name</Text>
        </View>
        <View style={[styles.col4, ReportStyles.tableColAlignCenter]}>
          <Text>Number in Club/Group</Text>
        </View>
        <View style={[styles.col5, ReportStyles.tableColAlignCenter]}>
          <Text>Club/Group Leader or Advisor</Text>
        </View>
        <View style={[styles.col7, ReportStyles.tableColAlignCenter]}>
          <Text>Meetings Attended</Text>
        </View>
      </View>
    )
  } else {
    return (
      <View key={headerKey} style={styles.headerRow} break>
        <View style={[styles.col1, ReportStyles.tableColAlignCenter]}>
          <Text>Year</Text>
        </View>
        <View style={[styles.col2, ReportStyles.tableColAlignCenter]}>
          <Text>Grade</Text>
        </View>
        <View style={[styles.col3, ReportStyles.tableColAlignCenter]}>
          <Text>Club/Group Name</Text>
        </View>
        <View style={[styles.col4, ReportStyles.tableColAlignCenter]}>
          <Text>Number in Club/Group</Text>
        </View>
        <View style={[styles.col5, ReportStyles.tableColAlignCenter]}>
          <Text>Club/Group Leader or Advisor</Text>
        </View>
        <View style={[styles.col7, ReportStyles.tableColAlignCenter]}>
          <Text>Meetings Attended</Text>
        </View>
      </View>
    )
  }
}

var rows = [];

function addPageBreaks() {
  var i = 21;
  var count = 1

  while (i < rows.length) {
    rows.splice(i, 0, <TableHeader key={"Sec1Head-" + count} isBreak={true} />);
    i += 25;
    count++;
  }
}

/**
 * PDF page for Section 1 of the 4-H Resume
 * @param {Object} tableData - Section 1 data
 * @returns {JSX.Element}
 * @see {@link 'src/app/_db/models/resumeSections/section1Model'} for object structure
 * @example <Section1 tableData={section1Data}/>
 */
export default function Section1(props) {
  const tableData = props.tableData;
  rows = tableData?.map((row, index) => {
    return (
      <View key={index} style={styles.tableRow}>
        <View style={[styles.col1, ReportStyles.tableColAlignCenter]}>
          <Text>{row.year}</Text>
        </View>
        <View style={[styles.col2, ReportStyles.tableColAlignCenter]}>
          <Text>{row.grade}</Text>
        </View>
        <View style={[styles.col3, ReportStyles.tableColAlignLeft]}>
          <Text>{row.clubName}</Text>
        </View>
        <View style={[styles.col4, ReportStyles.tableColAlignCenter]}>
          <Text>{row.numInClub}</Text>
        </View>
        <View style={[styles.col5, ReportStyles.tableColAlignLeft]}>
          <Text>{row.clubLeader}</Text>
        </View>
        <View style={[styles.col7, ReportStyles.tableColAlignCenter]}>
          <Text>{row.meetingsAttended} / {row.meetingsHeld}</Text>
        </View>
      </View>
    )
  });

  if (tableData?.length > 23)
    addPageBreaks();

  return (
    <Page size="LETTER" style={ReportStyles.body} wrap>
        <Text style={ReportStyles.h1}>Section 1: 4-H Involvement Summary</Text>
        <Text style={ReportStyles.tableHeaading}>List of all of the clubs/groups I have participated in.</Text>
  
        <TableHeader headerKey={"Sec1Head-0"} isBreak={false} />

        {rows}

        { (!rows || rows.length == 0) && <Text style={ReportStyles.noData}>No data available</Text> }

      <Footer />
    </Page>
  )
};