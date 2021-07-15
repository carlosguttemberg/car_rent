import { Connection, createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
}
export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
};
