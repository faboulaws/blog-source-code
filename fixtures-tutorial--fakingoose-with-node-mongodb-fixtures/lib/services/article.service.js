module.exports = ({ articleRepo, logger }) => {
    return {
        async getAll() {
            try {
                const articles = await articleRepo.getAll();
                return { ok: true, articles, message: 'Success', code: 'OK' }
            } catch (e) {
                logger.error(e);
                return { ok: false, message: e.message, code: 'ERROR' };
            }
        },
        async getById(id) {
            try {
                const article = await articleRepo.getById(id);
                if (article) {
                    return { ok: true, article, code: 'OK' }
                }
                return { ok: false, code: 'NOT_FOUND' };
            } catch (e) {
                logger.error(e);
                return { ok: false, message: e.message, code: 'ERROR' };
            }
        }
    }
}