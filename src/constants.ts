export const JWT = {
  SECRET:
    'eyJpZCI6MTEsInVzZXJuYW1lIjoiYWtzaGF5MjkiLCJpYXQiOjE2Njk3MzYxMzMsImV4cCI6MTY2OTczNjMxM30',
  EXPIRE_IN: '2s',
  ISSUER: 'task-managment',
  AUDIENCE: '127.0.0.1',
};

export const REPOSITORY = {
  DATASOURCE: 'DATA_SOURCE',
  TASK: 'TASK_REPOSITORY',
  USER: 'USER_REPOSITORY',
};

/*
export enum DATASOURCE {
  TYPE = 'postgres',
  HOST = 'localhost',
  PORT = 5432,
  USERNAME = 'postgres',
  PASSWORD = 'postgres',
  DATABASE = 'taskmanagment'
}
*/
