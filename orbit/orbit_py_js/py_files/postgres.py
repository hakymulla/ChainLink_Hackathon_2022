import pandas as pd
from sqlalchemy import create_engine
# psycopg2

username = ""
password = ""

def main():
    engine = create_engine("postgresql://{username}:{password}@localhost:5433/healthdatabase")
    engine.connect()

    query = """
            SELECT * FROM public."Bioddata" 
            LIMIT 5
        """
    data = pd.read_sql(query, con=engine)
    data.rename(mapper={'index':'_id'}, inplace=True, axis=1)
    data = data.to_json(orient="records")
    print( data)
    return { '_id': 1, 'name': 'shamb0t', 'followers': 500 }

if  __name__ == '__main__':
    main()