# Devolved AI MEXC Indexing

This project fetches block and transaction data from a Substrate-based blockchain and stores it in a PostgreSQL database. It uses PM2 to manage the process and automatically restart on failure.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- PostgreSQL (v13 or higher)
- PM2 (Process Manager for Node.js)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Devolved-AI/Devolved_AI_MEXC_Indexing.git
cd Devolved_AI_MEXC_Indexing
```

### Install Dependencies
```bash
npm install
```

### Set Up Environment Variables

Create a .env file in the root directory of your project and add the following content:
``` bash
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
DATABASE_URL=
ARGOCHAIN_RPC_URL=
```

### Initialize the docker
This script will setup postgres db and pgadmin portal

``` bash
docker-compose --env-file .env up -d --build
```

### Initialize the Database
Run the following npm script to create the necessary tables in your PostgreSQL database:

``` bash
npm run init
```

### Fetch and Store Blockchain Data
To start fetching and storing blockchain data, use PM2 to run the script:

``` bash
npm i -g pm2
pm2 start ecosystem.config.js --env production
```

### Managing the Process
You can use PM2 commands to manage the running process:

#### View Logs: pm2 logs fetchChainData

#### Restart: pm2 restart fetchChainData

#### Stop: pm2 stop fetchChainData

#### Delete: pm2 delete fetchChainData

### Scripts

#### initdb: Initializes the PostgreSQL database by creating the necessary tables.

#### fetchdata: Fetches and stores blockchain data into the PostgreSQL database.