import React from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ReactNode } from "react";

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
}

interface CustomerProviderProps {
  children: ReactNode;
}

interface CustomerContextValue {
  customerData: Customer[];
  updateCustomerData: (customer: Customer) => Promise<void>;
}

const customers: Customer[] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    addressLine1: "123 Main St",
    addressLine2: "Apt 4B",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    notes: "Test user 1"
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    addressLine1: "456 Oak Ave",
    addressLine2: "Suite 200",
    city: "Chicago",
    state: "IL",
    zip: "60611",
    notes: "Test user 2"
  }
];

const customerDataJson = { customers };

const storeCustomerDataAPICall = async (data: Customer[]): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem('customerData', JSON.stringify({ customers: data }));
      resolve(true);
    }, 1000);
  });
};

const fetchCustomerDataAPICall = async (): Promise<Customer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = localStorage.getItem('customerData');
      resolve(data ? JSON.parse(data).customers : customers);
    }, 1000);
  });
};

const CustomerContext = createContext<CustomerContextValue | null>(null);

export const CustomerProvider = ({ children }: CustomerProviderProps): JSX.Element => {
  const [customerData, setCustomerData] = useState<Customer[]>([]);

  const fetchCustomerData = useCallback(async () => {
    const data = await fetchCustomerDataAPICall();
    setCustomerData(data);
  }, []);

  const storeCustomerData = async (data: Customer[]): Promise<boolean> => {
    const success = await storeCustomerDataAPICall(data);
    setCustomerData(data);
    return success;
  };

  const initializeCustomerData = () => {
    if (!localStorage.getItem('customerData')) {
      localStorage.setItem('customerData', JSON.stringify(customerDataJson));
    }
  };

  useEffect(() => {
    initializeCustomerData();
    fetchCustomerData();
  }, [fetchCustomerData]);

  const updateCustomerData = async (customer: Customer): Promise<void> => {
    const updatedCustomersList = [...customerData, customer];
    await storeCustomerData(updatedCustomersList);
  };

  const value: CustomerContextValue = {
    customerData,
    updateCustomerData
  };

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
};

export const useCustomerContext = (): CustomerContextValue => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomerContext must be used within a CustomerProvider");
  }
  return context;
};
