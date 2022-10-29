const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/', async function(req, res, next)  {
  let developers = req.body.developers;
  const info = await getDevInfo(developers);
  return res.json(info)
});

async function getDevInfo(developers){
  let info = []
  for(let dev of developers){
    try{
      const response = await axios.get(`https://api.github.com/users/${dev}`);
      info.push({"name":response.data.name, "bio": response.data.bio});
    }catch{
        console.log("Couldn't find user")
    }
  }
  return info
};

  // try {
  //   let results = req.body.developers.map(async d => {
  //     return await axios.get(`https://api.github.com/users/${d}`);
  //   });
  //   console.log(results)
  //   //let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

  //   //return res.send(JSON.stringify(out));
  // } catch (err) {
  //   next(err);
  // }


app.listen(3000, function() {
  console.log('Server started on port 3000.');
});
