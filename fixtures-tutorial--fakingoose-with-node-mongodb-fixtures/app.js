const config = require('./lib/config');
const bootstrap = require('./lib/bootstrap');
(async () => {
    const app = await bootstrap.start(config);
    app.listen(config.PORT, function () {
        console.log(`App listening on port ${config.PORT}!`)
    });
})()
