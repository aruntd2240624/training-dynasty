const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {


  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.send({message : "Not authorised"})

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) console.log(err)

    if (err) return res.send({message : "Not authorised"})

    req.user = user

    if(req.method == "POST" ||req.method =="PATCH" || req.method =="DELETE"){

      if(!user.level) return res.send({error:"You are not authorised to do this operation"})

      if(user.level == 100 || user.level == 101) return next()

      return res.send({error:"You are not authorised to do this operation"})
    }

    next()
  })
}

module.exports = authenticateToken