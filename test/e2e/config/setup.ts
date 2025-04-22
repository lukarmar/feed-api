import { PostgreSqlContainer } from '@testcontainers/postgresql';

export async function startPostgresContainer() {
  const container = await new PostgreSqlContainer()
    .withDatabase('test_db')
    .withUsername('test_user')
    .withPassword('test_password')
    .start();

  return {
    host: container.getHost(),
    port: container.getPort(),
    username: container.getUsername(),
    password: container.getPassword(),
    database: container.getDatabase(),
    stop: async () => await container.stop(),
  };
}
