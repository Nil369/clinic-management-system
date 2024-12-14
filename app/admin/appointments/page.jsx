"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Logo from "@/app/_components/Logo";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const [selectedPrescription, setSelectedPrescription] = useState(null); // For viewing a prescription

  // Fetch all prescriptions
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const prescriptionsRef = collection(db, "prescriptions");
        const prescriptionSnap = await getDocs(prescriptionsRef);
        const data = prescriptionSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPrescriptions(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching prescriptions:", error.message);
      }
    };

    fetchPrescriptions();
  }, []);

  // Fetch single prescription details
  const handleViewPrescription = async (prescriptionId) => {
    try {
      const prescriptionRef = doc(db, "prescriptions", prescriptionId);
      const prescriptionSnap = await getDoc(prescriptionRef);
      if (prescriptionSnap.exists()) {
        setSelectedPrescription(prescriptionSnap.data()); // Set the selected prescription
      } else {
        console.error("Prescription not found!");
      }
    } catch (error) {
      console.error("Error fetching prescription:", error.message);
    }
  };

  // Print/Download prescription
  const handlePrint = () => {
    // Clone the template to modify it without affecting the original DOM
    const content = document.getElementById("prescription-template").cloneNode(true);
  
    // Remove the buttons section from the cloned content
    const buttons = content.querySelector("div.mt-6");
    if (buttons) {
      buttons.remove();
    }
  
    // Open a new window and write the cleaned-up content
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Prescription</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; }
            td, th { border: 1px solid #ccc; padding: 8px; text-align: left; }
            .logo { margin-bottom: 20px; color:#3B82F6 }
            h1, h2 { text-align: center; }
          </style>
        </head>
        <body>
          ${content.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="p-6 py-20 mb-80">
      <h1 className="text-2xl font-bold mb-6">Prescriptions</h1>

      {/* Prescription Table */}
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
        !selectedPrescription && (
          <div className="overflow-x-auto bg-white text-black shadow-lg rounded-lg p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date Issued</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell>{prescription.name}</TableCell>
                    <TableCell>{prescription.age}</TableCell>
                    <TableCell>{prescription.issuedBy}</TableCell>
                    <TableCell>
                      {new Date(prescription.dateIssued).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleViewPrescription(prescription.id)}
                        className="text-white"
                        variant="primary"
                      >
                        View / Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      )}

      {/* Selected Prescription Details */}
      {selectedPrescription && (
        <div
          id="prescription-template" // Add an ID for targeting the printable area
          className="p-8 max-w-screen-md mx-auto shadow-lg rounded-lg border border-gray-300"
        >
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <Logo /> {/* Import and use your Logo component */}
            <h1 className="text-2xl font-bold mt-2">
              Clinic Management System
            </h1>
            <p className="text-gray-600 text-sm">
              Your trusted partner in healthcare management
            </p>
          </div>

          {/* Prescription Details */}
          <h2 className="text-xl font-semibold mb-4">Prescription Details</h2>
          <div className="border border-gray-200 p-6 rounded-lg">
            <table className="w-full text-left border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-bold">Patient Name:</td>
                  <td className="py-2">{selectedPrescription.name}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-bold">Age:</td>
                  <td className="py-2">{selectedPrescription.age}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-bold">Issued By:</td>
                  <td className="py-2">{selectedPrescription.issuedBy}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-bold">Date Issued:</td>
                  <td className="py-2">
                    {new Date(
                      selectedPrescription.dateIssued
                    ).toLocaleDateString()}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-bold">Advice:</td>
                  <td className="py-2">{selectedPrescription.advice}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-bold">Medicines:</td>
                  <td className="py-2">{selectedPrescription.medicines}</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">Revisit:</td>
                  <td className="py-2">
                    {selectedPrescription.reVisit || "No revisit required"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Back and Print Button */}
          <div className="mt-6 flex justify-between">
            <Button
              onClick={() => setSelectedPrescription(null)}
              className="bg-gray-500 text-white px-4 py-2"
            >
              Back to List
            </Button>
            <Button
              onClick={handlePrint}
              className="text-white px-4 py-2"
              variant="primary"
            >
              Print / Download
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
