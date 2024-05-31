import pkg from 'pg';
const { Pool } = pkg;

export const connection = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'COED',
    password: '5401',
    port: 5432, // Puerto por defecto de PostgreSQL
});

try {
    connection.connect();
    console.log('Conexión exitosa a la base de datos');
} catch (error) {
    console.error('Error al conectar a la base de datos:', error);
}