module.exports = (app, di) => {
    const articleService = di.get('service.article');
    app.get('/', async (req, res) => {
        try {
            const { ok, articles, error } = await articleService.getAll();
            if (ok) {
                res.json({ ok, articles });
            } else {
                res.json({ ok, message: 'Failure' });
            }
        } catch (e) {
            console.log(e);
            res.json({ ok: false, message: 'Failure' });
        }

    });

    return app;
}