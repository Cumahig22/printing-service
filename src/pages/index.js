import React, { useEffect, useRef } from "react";
import Deposit from "./deposit";
import { getQueue } from "../services/queue_service";
import { useState } from "react";
import { set } from "react-hook-form";
const PrintPage = (props) => {
  const [queue, setQueue] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const depositRef = useRef();

  function generateNbsps(count) {
    return "&nbsp;".repeat(count);
  }

  function convertNumberToWord(number) {
    const units = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (number === 0) {
      return units[0];
    }

    if (number < 20) {
      return units[number];
    }

    if (number < 100) {
      const digitOne = Math.floor(number / 10);
      const digitTwo = number % 10;
      return tens[digitOne] + (digitTwo !== 0 ? " " + units[digitTwo] : "");
    }

    if (number < 1000) {
      const digitOne = Math.floor(number / 100);
      const digitTwo = number % 100;
      return (
        units[digitOne] +
        " Hundred" +
        (digitTwo !== 0 ? " " + convertNumberToWord(digitTwo) : "")
      );
    }

    if (number < 1000000) {
      const digitOne = Math.floor(number / 1000);
      const digitTwo = number % 1000;
      return (
        convertNumberToWord(digitOne) +
        " Thousand" +
        (digitTwo !== 0 ? " " + convertNumberToWord(digitTwo) : "")
      );
    }

    if (number < 1000000000) {
      const digitOne = Math.floor(number / 1000000);
      const digitTwo = number % 1000000;
      return (
        convertNumberToWord(digitOne) +
        " Million" +
        (digitTwo !== 0 ? " " + convertNumberToWord(digitTwo) : "")
      );
    }

    const digitOne = Math.floor(number / 1000000000);
    const digitTwo = number % 1000000000;
    return (
      convertNumberToWord(digitOne) +
      " Billion" +
      (digitTwo !== 0 ? " " + convertNumberToWord(digitTwo) : "")
    );
  }

  const handlePrint = () => {
    const currentDate = new Date().toLocaleDateString();
    // Create a new window for printing
    const printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(
      "<style>body { font-family: monospace; }</style>"
    );
    printWindow.document.write("</head><body>");
    //first 10 lines
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    //first 10 lines
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");

    printWindow.document.write(
      `<p>${generateNbsps(6)}${queue?.account_number ?? ""}${generateNbsps(
        48 - 8
      )}${currentDate}</p>`
    );
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write(
      `<p>${generateNbsps(6)}${queue?.account_name ?? ""}</p>`
    );
    printWindow.document.write("<p> &nbsp</p>");
    //first 10 lines
    printWindow.document.write(
      `<p>${generateNbsps(6)}${
        convertNumberToWord(queue?.amount?.amount) ?? ""
      }</p>`
    );
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write(
      `<p>   ${generateNbsps(14)}${queue?.amount?.amount}</p>`
    );
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");

    const { denomination } = queue;
    const denominations = Object.entries(denomination).filter(
      ([_, value]) => value !== 0
    );
    const denominationString = denominations
      .map(([key, value]) =>
        printWindow.document.write(
          `<p>${generateNbsps(6)}${""}${generateNbsps(
            32 - 10
          )}${key}${generateNbsps(6 - 2)}${value}</p>`
        )
      )
      .join(", ");

    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    //first 10 lines
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write(`<p>${generateNbsps(52)}1000</p>`);
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    //first 10 lines
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");

    printWindow.document.write(
      `<p>${generateNbsps(6)}${queue.depositor}${generateNbsps(34 - 11)}${
        queue.teller
      }</P>`
    );
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write(`<p> ${generateNbsps(6)}+63 XXX XXX XXXX</p>`);
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.write("<p> &nbsp</p>");
    //first 10 lines
    printWindow.document.write("<p> &nbsp</p>");

    printWindow.document.write("</body></html>");
    printWindow.document.write("<p> &nbsp</p>");
    printWindow.document.close();
    printWindow.print();
  };

  // const getQueueX = async () => {
  //   try {
  //     const queryParams = new URLSearchParams(window.location.search);
  //     const id = queryParams.get("id");
  //     const token = queryParams.get("token");
  //     var res = await getQueue(id, token);
  //     setQueue(res.data);
  //     console.log(res);
  //     return;
  //   } catch (err) {
  //     console.log(err);
  //     return;
  //   }
  // };

  const getQueueX = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const data = queryParams.get("data");
      var parsedData = JSON.parse(data);
      if (typeof parsedData === "string") {
        parsedData = JSON.parse(parsedData);
      }

      setQueue(parsedData);
      console.log(data);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return;
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      return;
    }
  };

  useEffect(() => {
    getQueueX();
  }, []);

  return isLoading ? (
    <div>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div>
      <h1>Print Page {queue.account_name ?? "NADA"}</h1>
      <button onClick={handlePrint}>Print</button>
      <div style={{ display: "none" }}>
        <Deposit ref={depositRef} />
      </div>
    </div>
  );
};
export default PrintPage;
