# Chainlink

This docker file starts up 

   - A local chainlink Node
   - A postgres server
   - A postgres Admin

### Create the following Directories and files in chainlink-rinkeby
  #### Directories 
    .chainlink-volume
    .data
    
   ##### Files
   
     
  - .env
          
          ROOT=/chainlink
          LOG_LEVEL=debug
          ETH_CHAIN_ID=4
          CHAINLINK_TLS_PORT=0
          SECURE_COOKIES=false
          ALLOW_ORIGINS=*
          ETH_URL=wss://eth-rinkeby.alchemyapi.io/v2/{ALCHEMY_API_KEY_RINKEBY}
          DATABASE_URL=postgres://username:password@pg_chainlink:5432/chainlink-rinkeby?sslmode=disable
          
  - database.env

        POSTGRES_USER=username
        POSTGRES_PASSWORD=password
        POSTGRES_DB=chainlink-rinkeby
        POSTGRES_TRUST_LOCALNET=true
        
        
  -  pg_admin.env
    
        PGADMIN_DEFAULT_EMAIL=email
        PGADMIN_DEFAULT_PASSWORD=password


   Email and Password to login into chainlink
  - .chainlink-volume/apicredentials.txt
      
        email
        password
  Database password (POSTGRES_PASSWORD from database.env)
 - .chainlink-volume/password.txt
          
          password
            
