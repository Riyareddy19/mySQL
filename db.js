// boiler plate
const express = require ("express");
const mysql = require ("mysql");
const app = express();
const port = 3000
app.use(express.json());

// make connection 

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Riakreddy_1911',
  database: 'user_table'
});

// check connection

con.connect((err) => {
  if(err)
    console.log(err);
  else
    console.log("CONNECTED!!");
})

// get all the user info

app.get('/user/all', (req, res) => {
  con.query('SELECT * FROM user_info',(err, result) => {
    if(err)
      console.log(err)
    else
      res.send(result)
  })
})

// get user info through id

app.get('/user/:userid', (req, res) => {
  const userid = req.params['userid'];
  con.query('SELECT * FROM user_info WHERE id = ?',userid, (err, result) => {
    if(err)
      console.log(err)
    else
      res.send(result)
  })
})

// add new user info by post 

app.post('/user', (req, res) => {
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phoneNo = req.body.phoneNo;

  con.query('INSERT INTO user_info VALUES (?, ?, ?, ?, ?)', [id, firstName, lastName, email, phoneNo],(err, result) => {
    if(err)
      console.log(err);
    else
      res.send("POSTED!!");
  });
})

// update user info by put

app.put('/user/:userid', (req, res) => {
  const userid = req.params['userid'];
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phoneNo = req.body.phoneNo;

  con.query('UPDATE user_info SET firstName = ?, lastName = ?, email = ?, phoneNo = ? WHERE id = ?',[firstName, lastName, email, phoneNo, userid], (err, result) => {
    if(err)
      console.log(err)
    else
      res.send("UPDATED!!")
  })
})

// Delete user info by id

app.delete('/user/:userid',(req, res) => {
  const userid = req.params['userid'];
  con.query('DELETE FROM user_info WHERE id = ?',userid,(err, result) => {
    if(err)
      console.log(err)
    else
      res.send("DELETED!!")
  })
})

// listen on port

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})