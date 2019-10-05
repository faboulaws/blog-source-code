module.exports = (app, di) => {
    const articleService = di.get('service.article');
    app.get('/', async (req, res) => {
        try {
            const { ok, articles, message } = await articleService.getAll();
            if (ok) {
                res.json({ ok, articles });
            } else {
                res.json({ ok, message });
            }
        } catch (e) {
            console.log(e);
            res.json({ ok: false, message: 'Internal server Failure' });
        }
    });

    app.get('/:id', async (req, res) => {
        try {
            const { params: { id } } = req;
            const { ok, article, message, code } = await articleService.getById(id);
            if (ok) {
                res.json({ ok, article });
            } else if (!ok && code === 'NOT_FOUND') {
                res.status(404).json({ ok: false, message: 'Resource not found' })
            } else {
                res.json({ ok, message });
            }
        } catch (e) {
            console.log(e);
            res.json({ ok: false, message: 'Internal server Failure' });
        }
    });

    return app;
}