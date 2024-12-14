"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Ensure correct imports
import { db } from "../../lib/firebase"; // Firebase initialization
import { collection, getDocs } from "firebase/firestore"; // Firebase Firestore methods

export default function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const [patientCount, setPatientCount] = useState(0);
  const [doctorAvailability, setDoctorAvailability] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true); // Start loading
      try {
        // Get patient count
        const patientRef = collection(db, "appointments");
        const patientSnap = await getDocs(patientRef);
        setPatientCount(patientSnap.size);

        // Get doctor availability
        const doctorRef = collection(db, "staff");
        const doctorSnap = await getDocs(doctorRef);
        const availableDoctors = doctorSnap.docs.filter((doc) => doc.data().role === "doctor" && doc.data().available);
        setDoctorAvailability(availableDoctors);

        // Get patient data
        const patientData = [];
        patientSnap.forEach((doc) => {
          patientData.push(doc.data());
        });
        setPatients(patientData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-100 shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Patients</h2>
          <p className="text-3xl text-blue-500 font-bold">{patientCount}</p>
        </div>
        <div className="bg-yellow-100 shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold text-gray-700">Doctors Available</h2>
          <p className="text-3xl text-green-500 font-bold">{doctorAvailability.length}</p>
        </div>
      </div>

      {/* Patient Data Table */}
      <div className="overflow-x-auto bg-white text-black shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Patient Details</h2>

        {isLoading ? (
          // Show a loading skeleton if the data is still being fetched
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        ) : (
          // Show the data in the table once it's fetched
          <Table className="hover:none">
            <TableHeader>
              <TableRow className="font-bold text-gray-800">
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Problem</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Doctor Assigned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient, index) => (
                <TableRow key={index}>
                  <TableCell>{patient.name || patient.patientName}</TableCell>
                  <TableCell>{patient.age || patient.patientAge}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.problem}</TableCell>
                  <TableCell>{patient.date || patient.createdAt}</TableCell>
                  <TableCell>{patient.doctorAssigned || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
