// import $ from "jquery";
import Highcharts from "highcharts";
import { Customer } from "./customer";
import { getUsers } from "./api";

const CUSTOMERS = "CUSTOMERS";

export class App {
  constructor() {
    this.heading = "Customer Manager";
    this.customerName = "";
    this.customerAge = "";
    this.customerEmail = "";
    this.customerPhone = "";
    this.customers = [];
    this.loadData().then((data) => (this.customers = data));
  }

  diagramHandler() {
    Highcharts.chart(this.diagram, {
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
          name: "Percentage of employees with this age",
          colorByPoint: true,
          data: this.calculatePercentFromYear(this.customers),
        },
      ],
    });
  }

  async loadData() {
    if (this.getCustomersFromStorage().length === 0) {
      await getUsers().then((users) => {
        this.customers = users;
        this.customers.forEach((item) => {
          this.storeCustomer(item.name, item.age, item.email, item.phone);
        });
      });
    }
    return this.getCustomersFromStorage();
  }

  calculatePercentFromYear(o) {
    let ages = {},
      result = [];
    for (let key in o) {
      ages.hasOwnProperty(o[key].age)
        ? (ages[o[key].age] += 1)
        : (ages[o[key].age] = 1);
    }
    for (let key in ages) {
      result.push({ name: `Age: ${key}`, y: (100 * ages[key]) / o.length });
    }
    return result;
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

  storeCustomer(name, age, email, phone) {
    let customers;
    !localStorage.getItem(CUSTOMERS)
      ? (customers = [])
      : (customers = JSON.parse(localStorage.getItem(CUSTOMERS)));

    customers.push({ name, age, email, phone });
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
}
