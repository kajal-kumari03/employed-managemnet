import React, { useState } from 'react';
import useSearch from '../hooks/useSearch'; // Import the custom hook

const EmployeeTable = ({ data }) => {
  const [employees, setEmployees] = useState(data);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [selectedGender, setSelectedGender] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortBySalary = () => {
    setSortOrder((prevOrder) => (prevOrder === "ascending" ? "descending" : "ascending"));
    const sortedEmployees = [...employees].sort((a, b) => {
      return sortOrder === "ascending" ? a.salary - b.salary : b.salary - a.salary;
    });
    setEmployees(sortedEmployees);
  };

  const handleFilterByGender = (gender) => {
    setSelectedGender(gender);
  };

  const handleEditEmployee = (id, field, value) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === id ? { ...employee, [field]: value } : employee
      )
    );
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
  };

  const filteredEmployees = employees.filter((employee) => {
    if (selectedGender === "All") return true;
    return employee.gender === selectedGender;
  });

  const searchedEmployees = useSearch(filteredEmployees, searchQuery);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div>
        <button onClick={handleSortBySalary}>Sort by Salary</button>
        <select onChange={(e) => handleFilterByGender(e.target.value)} value={selectedGender}>
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Agender">Agender</option>
          <option value="Genderfluid">Genderfluid</option>
        </select>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>
                <input
                  type="text"
                  value={employee.first_name}
                  onChange={(e) => handleEditEmployee(employee.id, "first_name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={employee.last_name}
                  onChange={(e) => handleEditEmployee(employee.id, "last_name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={employee.email}
                  onChange={(e) => handleEditEmployee(employee.id, "email", e.target.value)}
                />
              </td>
              <td>{employee.gender}</td>
              <td>
                <input
                  type="number"
                  value={employee.salary}
                  onChange={(e) => handleEditEmployee(employee.id, "salary", e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
