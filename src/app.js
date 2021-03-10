import { Customer } from "./customer";

const CUSTOMERS = "CUSTOMERS";

export class App {
  constructor() {
    this.heading = "Customer Manager";

    this.customers = this.getCustomersFromStorage();
    this.customerName = "";
    this.customerEmail = "";
    this.customerPhone = "";
  }

  addCustomer() {
    if (this.customerName && this.customerPhone && this.customerPhone) {
      this.customers.push(
        new Customer(this.customerName, this.customerEmail, this.customerPhone)
      );

      this.storeCustomer(
        this.customerName,
        this.customerEmail,
        this.customerPhone
      );

      this.customerName = "";
      this.customerEmail = "";
      this.customerPhone = "";
    }
  }

  storeCustomer(name, email, phone) {
    let customers;
    !localStorage.getItem(CUSTOMERS)
      ? (customers = [])
      : (customers = JSON.parse(localStorage.getItem(CUSTOMERS)));

    customers.push({ name, email, phone });
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
