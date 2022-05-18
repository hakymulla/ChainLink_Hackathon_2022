#!/usr/bin/env python
# coding: utf-8

import pandas as pd
import random
from datetime import date, timedelta
from sqlalchemy import create_engine


username = "healthdata"
password = "healthdata"
engine = create_engine(f"postgresql://{username}:{password}@localhost:5433/healthdatabase")
print(engine.connect())

###################### PATIENT DATA 
DATA_SIZE = 400
TABLE_NAME = 'Bioddata'
columns = ["PatientID", "Age", "FirstName", "LastName", "Location", "DateRegistered", "Email", "EmergencyContact"]

all_locations = []
with open("state_names.txt", "r") as locations:
    for location in locations.readlines():
        all_locations.append(location.strip("\n"))


all_names = []
with open("names.txt") as names:
    for name in names.readlines():
        all_names.append(name.strip("\n"))

df = pd.DataFrame()

test_date1, test_date2 = date(2010, 1, 1), date(2020, 7, 1)
res_dates = [test_date1]
while test_date1 != test_date2:
    test_date1 += timedelta(days=1)
    res_dates.append(test_date1)

df["PatientID"] = list(range(1, DATA_SIZE+1))
df["Age"] = random.choices(range(10, 80), k=DATA_SIZE)
df["FirstName"] = random.choices(all_names, k=DATA_SIZE)
df["LastName"] = random.choices(all_names, k=DATA_SIZE)
df["Location"] = random.choices(all_locations, k=DATA_SIZE)
df["DateRegistered"] = random.choices(res_dates, k=DATA_SIZE)
df["Email"] = df["FirstName"].map(str) + "@gmail.com" 
df["EmergencyContact"] = ""

df['DateRegistered'] = pd.to_datetime(df['DateRegistered']).astype(int)/ 10**9
df['FirstName'] = df['FirstName'].str.title()
df['LastName'] = df['LastName'].str.title()

df.head(0).to_sql(name=TABLE_NAME, con=engine, if_exists="replace")
df.to_sql(name="Bioddata", con=engine, if_exists="replace")

query = """
SELECT * FROM public."Bioddata" 
limit 5;
"""
print(pd.read_sql(query, con=engine))


###################### PHYSICIAN DATA
DATA_SIZE_PHYSICIAN = 50


position = ["Nurse", "Pharmacy", "Physician", "Physician Assistant", "Therapy"]
df_phy = pd.DataFrame()
df_phy["PhysicianID"] = list(range(1, DATA_SIZE_PHYSICIAN+1))
df_phy["Name"] = random.choices(all_names, k=DATA_SIZE_PHYSICIAN)
df_phy["Position"] = random.choices(position, k=DATA_SIZE_PHYSICIAN)
df_phy['LicenceNo'] = df_phy.Name.str.upper().str[:3] + "_"+ df_phy["Position"].str.upper().str[:4]

df_phy.head(0).to_sql(name="Physician", con=engine, if_exists="replace")
df_phy.to_sql(name="Physician", con=engine, if_exists="replace")

query = """
SELECT * FROM public."Physician" 
"""
print(pd.read_sql(query, con=engine))



###################### PRESCRIPTION DATA
DATA_SIZE_MEDICATION = 200
medication = ["Dupixent","Entresto","Entyvio","Farxiga","Fentanyl","Fentanyl Patch","Gabapentin","Gilenya",
              "Humira","Hydrochlorothiazide","Hydroxychloroquine"]


df_presc = pd.DataFrame()
phys_list = list(df_phy.loc[df_phy["Position"] == "Physician", "PhysicianID"])
df_presc["PhysicianID"] = random.choices(phys_list, k=DATA_SIZE_MEDICATION)
df_presc["PatientID"] = random.choices(range(0, DATA_SIZE), k=DATA_SIZE_MEDICATION)
df_presc["Medication"] = random.choices(medication, k=DATA_SIZE_MEDICATION)
df_presc["Date"] = random.choices(res_dates, k=DATA_SIZE_MEDICATION)
df_presc["Appointment"] = random.choices(res_dates, k=DATA_SIZE_MEDICATION)
df_presc["Dose"] = random.choices(range(0, 3), k=DATA_SIZE_MEDICATION)

df_presc['Date'] = pd.to_datetime(df_presc['Date']).astype(int)/ 10**9
df_presc['Appointment'] = pd.to_datetime(df_presc['Appointment']).astype(int)/ 10**9


df_presc.head(0).to_sql(name="Prescription", con=engine, if_exists="replace")
df_presc.to_sql(name="Prescription", con=engine, if_exists="replace")

query = """
SELECT * FROM public."Prescription" 
LIMIT 5
"""
print(pd.read_sql(query, con=engine))

####################################################################
query = """
SELECT * FROM pg_catalog.pg_tables
WHERE schemaname!= 'pg_catalog' AND schemaname != 'information_schema';
"""
print(pd.read_sql(query, con=engine))