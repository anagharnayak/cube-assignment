import React from 'react';
import { Customer } from '../types/types'; // Import Customer type from types.ts

interface CustomerListProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onSelectCustomer: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, selectedCustomer, onSelectCustomer }) => {
  return (
    <div className="customer-list">
      {customers.map((customer, index) => (
        <div
          key={index}
          className={`customer-card ${customer === selectedCustomer ? 'selected' : ''}`}
          onClick={() => onSelectCustomer(customer)}
        >
          <p>{customer.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
