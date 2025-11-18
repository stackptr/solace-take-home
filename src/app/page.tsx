"use client";

import { useEffect, useState } from "react";

type Advocate = {
  // id: number  # TODO: Use persistent key when wired to DB, see #2
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
};

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return Object.values(advocate).some((fieldVal) => {
        if (typeof fieldVal === "string") {
          return fieldVal.toLowerCase().includes(searchTerm);
        } else if (typeof fieldVal === "number") {
          return fieldVal.toString().toLowerCase().includes(searchTerm);
        } else if (Array.isArray(fieldVal)) {
          return fieldVal.some((s) => s.toLowerCase().includes(searchTerm));
        }
      });
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main>
      <h1 className="border-b-2 bg-cyan-900 p-4 text-xl font-semibold text-cyan-200">
        Solace Advocates
      </h1>
      <div className="my-4">
        <p>Search</p>
        <input
          className="border border-black"
          value={searchTerm}
          onChange={onChange}
        />
        <button onClick={onClick}>Reset Search</button>
        <p className="max-w-fit rounded-full border bg-cyan-900 p-2 text-cyan-100">
          <span className="font-semibold">Searching for:</span> {searchTerm}
        </p>
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, i) => {
            return (
              <tr key={i}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, specialtyIdx) => {
                    const specialtyKey = `${i}-${specialtyIdx}`;
                    return <div key={specialtyKey}>{s}</div>;
                  })}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
