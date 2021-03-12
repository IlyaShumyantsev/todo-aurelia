// import $ from "jquery";
import Highcharts from "highcharts";
import { Customer } from "./customer";

const CUSTOMERS = "CUSTOMERS";

export class App {
  constructor() {
    this.heading = "Customer Manager";

    this.customers = this.getCustomersFromStorage();
    this.customerName = "";
    this.customerAge = "";
    this.customerEmail = "";
    this.customerPhone = "";

    console.log(this.customers);
    this.calculatePercentFromYear(this.customers);
  }

  calculatePercentFromYear(o) {
    let ages = new Map();
    for (let key in o) {
      console.log(o[key].age);
    }
  }

  addCustomer() {
    if (
      this.customerName &&
      this.customerAge &&
      this.customerPhone &&
      this.customerPhone
    ) {
      this.customers.push(
        new Customer(
          this.customerName,
          this.customerAge,
          this.customerEmail,
          this.customerPhone
        )
      );

      this.storeCustomer(
        this.customerName,
        this.customerAge,
        this.customerEmail,
        this.customerPhone
      );

      this.customerName = "";
      this.customerAge = "";
      this.customerEmail = "";
      this.customerPhone = "";
    }
  }

  storeCustomer(name, age, email, phone, y) {
    let customers;
    !localStorage.getItem(CUSTOMERS)
      ? (customers = [])
      : (customers = JSON.parse(localStorage.getItem(CUSTOMERS)));

    customers.push({ name, age, y: 22, email, phone });
    localStorage.setItem(CUSTOMERS, JSON.stringify(customers));
  }

  getCustomersFromStorage() {
    let customers;
    !localStorage.getItem(CUSTOMERS)
      ? (customers = [])
      : (customers = JSON.parse(localStorage.getItem(CUSTOMERS)));

    return customers;
  }

  removeCustomer(customer) {
    let index = this.customers.indexOf(customer);
    if (index !== -1) {
      this.customers.splice(index, 1);
    }
    this.removeCustomerFromStorage(index);
  }

  removeCustomerFromStorage(index) {
    let customers = JSON.parse(localStorage.getItem(CUSTOMERS));
    customers.splice(index, 1);
    localStorage.setItem(CUSTOMERS, JSON.stringify(customers));
  }

  attached() {
    Highcharts.chart(this.container, {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "Customers age",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      series: [
        {
          name: "Brands",
          colorByPoint: true,
          data: [
            {
              name: "Chrome",
              y: 61.41,
            },
            {
              name: "Internet Explorer",
              y: 11.84,
            },
            {
              name: "Firefox",
              y: 10.85,
            },
            {
              name: "Edge",
              y: 4.67,
            },
            {
              name: "Safari",
              y: 4.18,
            },
            {
              name: "Sogou Explorer",
              y: 1.64,
            },
            {
              name: "Opera",
              y: 1.6,
            },
            {
              name: "QQ",
              y: 1.2,
            },
            {
              name: "Other",
              y: 2.61,
            },
          ],
        },
      ],
    });
  }
}
