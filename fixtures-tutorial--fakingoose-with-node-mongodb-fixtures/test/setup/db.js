const { GenericContainer, Wait } = require("testcontainers");

exports.startDb = async () => {
    const port = 27017;
    const user = 'testuser';
    const pass = 'testpass';
    try {
        const container = await new GenericContainer("mongo", "3.3")
            .withExposedPorts(27017)
            .withWaitStrategy(Wait.forLogMessage("waiting for connections on port 27017"))
            .start();
        const mappepPort = container.getMappedPort(port);
        const ip = container.getContainerIpAddress();

        return { stopDb: () => container.stop(), dbUrl: `mongodb://${ip}:${mappepPort}` }
    } catch (e) {
        throw e;
    }

}