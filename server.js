const http = require('http');
const fs = require('fs');
const os = require('os');

const host = '127.0.0.1';
const port = 2000;

const server = http.createServer((req, res) => {
    const path = req.url;

    if(path === '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'utf8', 'text/html');

        fs.readFile('./pages/index.html', (err, data) => {
            if(err){
                res.write('<p style="color: red;"><strong>There was an error serving file.</strong></p>')
            }else{
                res.write(data);
            }
            res.end();
        });
    
    }else if(path === '/about'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'utf8', 'text/html');

        fs.readFile('./pages/about.html', (err, data) => {
            if(err){
                res.write('<p style="color: red;"><strong>There was an error serving file.</strong></p>')
            }else{
                res.write(data);
            }
            res.end();
        });
    
    }else if(path === '/sys'){
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/plain');

        const osInfo = JSON.stringify({
            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            numberOfCPUS: os.cpus().length,
            networkInterfaces: os.networkInterfaces(),
            uptime: os.uptime()
        },
        null,
        4)

        fs.writeFile('./osinfo.json', osInfo, (err) => {
            if (err) {
                res.end('Sorry, something went wrong. Try again.');
              }

              res.end('Your OS info has been saved successfully!');
        });     
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
    
        fs.readFile('./pages/404.html', null, (err, html) => {
          res.write(html);
          res.end();
        });
    }
});

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});