-- from the terminal run:
-- psql < medical_center.sql

DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center

--med_center Table
CREATE TABLE med_centers
(
  id SERIAL PRIMARY KEY,
  med_center_name text NOT NULL
);
--doctor Table
CREATE TABLE doctors
(
  id SERIAL PRIMARY KEY,
  fname text NOT NULL,
  lname text NOT NULL
);
--doctor_med Table
CREATE TABLE doctors_med_centers
(
  id SERIAL PRIMARY KEY,
  med_center_id INTEGER REFERENCES med_centers,
  doctor_id INTEGER REFERENCES doctors
);
--patient table
CREATE TABLE patients
(
  id SERIAL PRIMARY KEY,
  fname text NOT NULL,
  lname text NOT NULL
);
--patient_doctor Table
CREATE TABLE patient_doctor
(
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients,
  doctor_id INTEGER REFERENCES doctors
);
--diseases Table
CREATE TABLE diseases
(
  id SERIAL PRIMARY KEY,
  dname text NOT NULL
);
--patient_Diseases Table
CREATE Table patient_diseases
(
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients,
    disease_id INTEGER REFERENCES diseases
);
