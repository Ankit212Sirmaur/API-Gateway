const express = require('express');
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 3,
})
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);
app.use('/flightService', createProxyMiddleware({ target: ServerConfig.FLIGHT_SERVICE, changeOrigin: true }))
app.use('/bookingService', createProxyMiddleware({ target: ServerConfig.BOOKING_SERVICE, changeOrigin: true }))
app.use('/api', apiRoutes);


app.listen(ServerConfig.PORT, () => {
    console.log(`sucessfully started our server on port : ${ServerConfig.PORT}`);
});
