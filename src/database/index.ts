import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  // Pegando todas informaçoes do 'ormconfig.json' 
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database: 
        // Verificação do 'database'
        process.env.NODE_ENV === "test"
          ? "./src/database/database.test.sqlite" 
          : defaultOptions.database,
    })
  );
};