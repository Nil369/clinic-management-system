# Clinic Management System

## Overview
The Clinic Management System is a web application designed to facilitate efficient clinic operations. It enables healthcare providers (doctors and receptionists) to manage patient appointments, prescriptions, and doctor availability, as well as generate printable prescription forms. The system also allows patients to book appointments and view their medical records.

This system is built with **Next.js** (App Router), **Firebase** for authentication and Firestore database, and **ShadCN UI** for the user interface components.

## Features

- **User Authentication**: 
  - Secure login and registration for doctors, receptionists, and patients using Firebase Authentication.
  - Role-based access control to ensure proper access levels.
  
- **Appointments**: 
  - Receptionists can assign tokens and appointments to doctors.
  - Doctors can view and manage assigned patients based on tokens.
  
- **Prescription Management**: 
  - Doctors can write prescriptions for patients, including advice, prescribed medicines, and revisit information.
  - Prescriptions can be viewed, printed, or downloaded as PDF documents.

- **Admin Dashboard**:
  - Analytics of total patients and doctor availability.
  - View, add, or manage staff, patients, and appointments.
  
- **Patient Details**:
  - Patients can view and book appointments.
  - Patients' medical records are updated with their prescribed medications and doctor recommendations.
  
- **PDF Generation**:
  - Prescription details can be generated as a clean and printable PDF, including the clinic's logo and all relevant data.

## Tech Stack

- **Frontend**: 
  - React (Next.js 15, App Router)
  - ShadCN UI (for UI components)
  - Firebase Authentication
  - Firestore Database

- **Backend**:
  - Firebase Firestore (for storing appointments, prescriptions, and user data)

- **Other Libraries**:
  - Zod (for form validation)
  - React hooks (for managing state and effects)
  - Firebase SDK (for database and authentication)

## Setup & Installation

### Prerequisites

1. Node.js (v14 or higher)
2. Firebase Account with a Firestore database set up
3. A Vercel account (for deployment)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/clinic-management-system.git
   cd clinic-management-system
