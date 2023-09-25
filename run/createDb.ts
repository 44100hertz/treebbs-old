import { Client } from 'pg';
let client: Client;

async function getClient(): Promise<Client> {
    if (!client) {
        client = new Client({
          host: 'localhost',
          port: 5432
        })
        await client.connect();
        await createForumIfNotExists(client);
    }
    return client;
}

async function createForumIfNotExists(client: Client) {
  await client.query(`
    CREATE DATABASE forum;

    CREATE TABLE posts (
        id integer PRIMARY KEY,
        parent_id integer,
        created_at timestamp,
        body text,
    );
  `);
}