import React, { Component } from "react";
import Table from "./Table";
import "../CustomerDashboard/CustomerDashboard.css";

class TimeSlotTable extends Component {
  render() {
    const tableOneHeadings = [
      "Date",
      "Time",
      "Class",
      "Instructor",
      "Length",
      "Cost",
    ];

    const tableOneRows = [
      ["19/08/2020", "10:00am", "Karate Session", "Dr. Foo Bar", "1 hr", "$40"],
      ["20/08/2020", "2:00pm", "1:1 Coaching", "Andrew Lee", "1 hr", "$40"],
    ];

    const tableTwoHeadings = [
      "Date",
      "Time",
      "Class",
      "Instructor",
      "Length",
      "Cost",
    ];

    const tableTwoRows = [
      ["22/08/2020", "12:00pm", "Yoga", "Yoda", "1 hr", "$40"],
      ["24/08/2020", "5:00pm", "Kids Class", "Angelina Smith", "2 hr", "$60"],
      ["29/08/2020", "7:00am", "Karate Session", "Dr. Foo Bar", "1 hr", "$40"],
    ];

    return (
      <div title="heading" className="heading">
        <Table headings={tableOneHeadings} rows={tableOneRows} />
        <Table headings={tableTwoHeadings} rows={tableTwoRows} />
      </div>
    );
  }
}

export default TimeSlotTable;