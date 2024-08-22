import express from "express";
import db from "./koneksi.js";
import bodyParser from "body-parser";
import router from "./route.js";
import dotenv from "dotenv";
dotenv.config();


const app = express()
const PORT = process.env.PORT;


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
  //     // res.send("test");
  //     const sql = "SELECT * FROM mahasiswa"
  //     db.query(sql, (error, result) => 
  //     res.json(result)
  //     )
// })

app.post("/create", (req,res) => {
  const {nim,nama_lengkap, kelas, alamat } = req.body
  const sql = "INSERT INTO mahasiswa (nim,nama_lengkap, kelas, alamat) VALUES (?,?,?,?)"
  db.query(sql, [nim,nama_lengkap, kelas, alamat], (error,result) =>{
    if(error){
      res.status(400)
      res.send(error)
    }
    res.status(201);
    res.json(result);
  })
})


app.put("/update",(req,res) => {
  const nim = req.query.nim;
  const {nama_lengkap, kelas, alamat} = req.body;
  if (nim || nama_lengkap || kelas || alamat){
    const query = ` UPDATE mahasiswa  SET nama_lengkap = "${nama_lengkap}" , kelas = "${kelas}" , alamat = "${alamat}"  WHERE nim = ${nim}`;
    db.query(query, (error, result) => {
      if(error) res.status(400).send(error.message);
      
      res.json(result);
    })
  }
})
app.delete("/delete", (req,res) => {
  const nim = req.query.nim
  const sql = "DELETE FROM mahasiswa WHERE nim = ?"
  db.query(sql, [nim], (error,result)=>{
    if(error){
      res.status(400)
      res.send(error)
    }
    res.status(200)
    res.json("data berhasil dihapus")
  } )
})

app.use("/", router)


app.listen(PORT, () => {
  console.log("server berjalan di http:localhost:" + PORT)
})
