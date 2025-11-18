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
      <div className="flex items-center justify-between bg-slate-50 px-6 py-3">
        <div>
          <input
            className="rounded px-2 py-1 font-sans text-sm text-slate-500 ring-1 ring-slate-900/10"
            value={searchTerm}
            onChange={onChange}
            placeholder="Search"
          />
          <button
            className={`ml-4 rounded bg-cyan-800 px-2 py-1 text-sm text-cyan-100 ring-1 ring-cyan-800/10 ${searchTerm === "" ? "hidden" : ""}`}
            onClick={onClick}
          >
            Reset Search
          </button>
        </div>
        <p
          className={`max-w-fit rounded-full border bg-cyan-800 p-2 text-cyan-100 ring-1 ring-cyan-800/10 ${searchTerm === "" ? "hidden" : ""}`}
        >
          <span className="font-semibold">Searching for:</span> {searchTerm}
        </p>
      </div>
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr className="sticky top-0 z-10 bg-slate-50">
            <th className="border-b border-slate-200 px-6 py-3 text-left text-sm font-medium text-slate-900">
              First Name
            </th>
            <th className="border-b border-slate-200 px-6 py-3 text-left text-sm font-medium text-slate-900">
              Last Name
            </th>
            <th className="border-b border-slate-200 px-6 py-3 text-left text-sm font-medium text-slate-900">
              City
            </th>
            <th className="border-b border-slate-200 px-6 py-3 text-left text-sm font-medium text-slate-900">
              Degree
            </th>
            <th className="border-b border-slate-200 px-6 py-3 text-left text-sm font-medium text-slate-900">
              Specialties
            </th>
            <th className="border-b border-slate-200 px-6 py-3 text-left text-sm font-medium text-slate-900">
              Years of Experience
            </th>
            <th className="border-b border-slate-200 px-6 py-3 text-left text-sm font-medium text-slate-900">
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredAdvocates.map((advocate, i) => {
            return (
              <tr key={i} className="odd:bg-white even:bg-slate-50">
                <td className="px-6 py-4 text-sm text-slate-600">
                  {advocate.firstName}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-600">
                  {advocate.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {advocate.city}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {advocate.degree}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {advocate.specialties.map((s, specialtyIdx) => {
                    const specialtyKey = `${i}-${specialtyIdx}`;
                    return <div key={specialtyKey}>{s}</div>;
                  })}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {advocate.yearsOfExperience}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {advocate.phoneNumber}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
