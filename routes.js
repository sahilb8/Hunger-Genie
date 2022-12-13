const fs = require('fs');
let userName = '';
const routeHandler = (req,res) =>{
    const url = req.url;
    const method = req.method;

   if(url === '/'){
       res.setHeader('Content-Type', 'text/html');
       if(userName.length == 0){
        res.write('<html>');
        res.write('<form method="POST" action="/create-user"><input type="text" name="username"><button type="submit">Submit</button></input></form>');
        res.write('</html>');
       } else {
        res.write('<html>');
        res.write('<h1>'+userName+'</h1>');
        res.write('</html>');
       }

       res.end();
   } else if(url === '/users'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<ul><li>User 1</li></ul>');
        res.write('<ul><li>User 2</li></ul>');
        res.write('<ul><li>User 3</li></ul>');
        res.write('<ul><li>User 4</li></ul>');
        res.write('<ul><li>User 5</li></ul>');
        res.write('</html>');
        res.end();
   } else if(url === '/create-user' && method === 'POST') {
       const body = [];
       req.on('data',(chunk) => {
           body.push(chunk);
       })

       req.on('end',() =>{
           let formData = Buffer.concat(body).toString();
           userName = formData.split('=')[1];
           res.statusCode = 302;
           res.setHeader('Location', '/');
           res.end();
       })
   } 
}

// module.exports = routeHandler;

// module.exports = {
//     handler: routeHandler,
// }

//module.exports.handler = routeHandler;

exports.handler = routeHandler;