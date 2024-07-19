const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD
});

client.connect();

const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS blocks (
        block_number BIGINT PRIMARY KEY,
        block_hash VARCHAR(66) NOT NULL,
        parent_hash VARCHAR(66) NOT NULL,
        state_root VARCHAR(66) NOT NULL,
        extrinsics_root VARCHAR(66) NOT NULL,
        timestamp TIMESTAMP NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_blocks_hash ON blocks(block_hash);

      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        block_number BIGINT REFERENCES blocks(block_number),
        section VARCHAR(255) NOT NULL,
        method VARCHAR(255) NOT NULL,
        data JSONB NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_events_block_number ON events(block_number);
      CREATE INDEX IF NOT EXISTS idx_events_section_method ON events(section, method);

      CREATE TABLE IF NOT EXISTS transactions (
        tx_hash VARCHAR(66) PRIMARY KEY,
        block_number BIGINT REFERENCES blocks(block_number),
        from_address VARCHAR(66) NOT NULL,
        to_address VARCHAR(66) NOT NULL,
        amount VARCHAR(255) NOT NULL,
        fee VARCHAR(255) NOT NULL,
        gas_fee VARCHAR(255) NOT NULL,
        gas_value VARCHAR(255) NOT NULL,
        method VARCHAR(255) NOT NULL,
        events JSONB NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_transactions_block_number ON transactions(block_number);
      CREATE INDEX IF NOT EXISTS idx_transactions_from_address ON transactions(from_address);
      CREATE INDEX IF NOT EXISTS idx_transactions_to_address ON transactions(to_address);

      CREATE TABLE IF NOT EXISTS accounts (
        address VARCHAR(66) PRIMARY KEY,
        balance VARCHAR(255) NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_accounts_balance ON accounts(balance);
    `);

    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    client.end();
  }
};

createTables();
