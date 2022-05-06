#!/usr/bin/env python
# coding: utf-8

import pandas as pd
import random
from datetime import date, timedelta
from sqlalchemy import create_engine

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

df['DateRegistered'] = pd.to_datetime(df['DateRegistered'])
df['FirstName'] = df['FirstName'].str.title()
df['LastName'] = df['LastName'].str.title()


# engine = create_engine("postgresql://username:pass@localhost:5432/db")
# engine.connect()

engine = create_engine("postgresql://healthdata:healthdata@localhost:5432/chainlink-rinkeby")
print(engine.connect())

df.head(0).to_sql(name=TABLE_NAME, con=engine, if_exists="replace")

query = """
SELECT * FROM pg_catalog.pg_tables
WHERE schemaname!= 'pg_catalog' AND schemaname != 'information_schema';
"""
print(pd.read_sql(query, con=engine))

df.head(100).to_sql(name="Bioddata", con=engine, if_exists="replace")


query = """
SELECT * FROM public."Bioddata" 
limit 5;
"""
print(pd.read_sql(query, con=engine))


# In[ ]:




