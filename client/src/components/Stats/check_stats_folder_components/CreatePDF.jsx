import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
  Font,
} from "@react-pdf/renderer";

import DriveTimeLogo from "../../assets/Black_and_White.png";

import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
//table view on pdf

// Register font
Font.register({
  family: "Roboto",
  src: "http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Roboto",
  },
  image: {
    marginVertical: 50,
    marginHorizontal: 50,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "Roboto",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "gray",
    fontFamily: "Roboto",
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
          <Image style={styles.image} src={DriveTimeLogo} />
        </View>
      </Page>

      <Page>
        <View style={{ margin: "15px" }}>
          <Table
            tdStyle={{
              padding: "4px",
            }}
          >
            <TH
              style={{
                fontSize: 10,
              }}
            >
              <TD>Hours</TD>
              <TD>Posted</TD>
              <TD>Vehicle</TD>
              <TD>Weather</TD>
              <TD>From</TD>
              <TD>To</TD>
              <TD>Day/Night</TD>
              <TD>Practiced</TD>
              <TD>Notes</TD>
            </TH>
            {results.map((obj, index) => (
              <TR
                key={index}
                style={{
                  fontSize: 10,
                }}
              >
                <TD>{obj.hours}</TD>
                <TD>{new Date(obj.timestamp).toDateString()}</TD>
                {/* grabs us date of posting */}
                <TD>{obj.vehicle_type}</TD>
                <TD>{obj.weather}</TD>

                <TD>{obj.from}</TD>
                <TD>{obj.to}</TD>
                <TD>{obj.day === false ? "Night" : "Day"}</TD>
                <TD>{obj.practiced}</TD>
                <TD>{obj.notes}</TD>
              </TR>
            ))}
          </Table>

          <Table>
            <TH>
              <TD
                style={{
                  fontSize: 10,
                }}
              >
                TOTAL HOURS: {hours}
              </TD>
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
