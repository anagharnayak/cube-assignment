import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file
import { Customer as CustomerType } from './types/types';

import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';

interface Customer {
  name: string;
  title: string;
  address: string;
  photos: string[];
}

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Fetch customer data from API
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=1000') // Fetch 10 entries for testing
      .then((response) => response.json())
      .then((data) => {
        const parsedCustomers = data.results.map((result: any) => ({
          name: `${result.name.first} ${result.name.last}`,
          title: result.name.title,
          address: `${result.location.street.name}, ${result.location.city}, ${result.location.country}`,
          photos: Array.from({ length: 9 }, (_, index) => `https://via.placeholder.com/150?text=Photo${index + 1}`),
        }));
        setCustomers(parsedCustomers);
      })
      .catch((error) => console.error('Error fetching customer data:', error));
  }, []);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="app">
      <CustomerList customers={customers} selectedCustomer={selectedCustomer} onSelectCustomer={handleSelectCustomer} />
      <CustomerDetails customer={selectedCustomer} />
    </div>
  );
};

export default App;
