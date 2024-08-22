import mySQL from "mysql"

const db = mySQL.createConnection ({
    host: "localhost",
    user: "root",
    password: "",
    database: "universitas",
})

export default db;