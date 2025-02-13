const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const passport = require('passport');

const { checkApiKey } = require('./middlewares/auth.handler')
const { logErrors, errorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());
//app.use(cors()); 
app.use(cors({
    origin: 'http://localhost:3001', // Replace with your frontend origin
    allowedHeaders: ['Authorization', 'Content-Type'],
  }));

require('./utils/auth');

app.get('/nueva-ruta', checkApiKey, (req, res)=>{
    res.send('Hola !!!');
});

app.use(passport.initialize());

//debugging 
app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body); 
    next();
});

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port,()=>{
    console.log('Mon Port Back: ' + port);
});
