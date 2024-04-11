import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";
import DriveTimeLogo from "../../assets/Black_and_White.png";

import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
//table view on pdf

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    // fontFamily: "AntonFamily",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    // fontFamily: "AntonFamily",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    // fontFamily: "AntonFamily",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
    // fontFamily: "AntonFamily",
  },
});

const CreatePDF = ({ results, hours }) => {
  console.log(hours);
  return (
    <Document>
      <Page style={styles.body}>
        <View title="Basic">
          <Text style={styles.header} fixed>
            DriveTime Official Summary Report
          </Text>
          <Image style={styles.Image} src={DriveTimeLogo} />

          <Table
            tdStyle={{
              padding: "4px",
            }}
          >
            <TH
              style={{
                fontSize: 14,
              }}
            >
              <TD>Hours</TD>
              <TD>Posted</TD>
              <TD>Vehicle</TD>
              <TD>Weather</TD>
              <TD>From</TD>
              <TD>To</TD>
            </TH>
            {results.map((obj, index) => (
              <TR key={index}>
                <TD>{obj.hours}</TD>
                <TD>{new Date(obj.timestamp).toDateString()}</TD>
                {/* grabs us date of posting */}
                <TD>{obj.vehicle_type}</TD>
                <TD>{obj.weather}</TD>
                //! do a day or night also
                <TD>{obj.from}</TD>
                <TD>{obj.to}</TD>
              </TR>
            ))}
          </Table>

          <Table>
            <TH>
              <TD>TOTAL HOURS: {hours}</TD>
            </TH>
          </Table>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </View>
      </Page>
    </Document>
  );
};

export default CreatePDF;
