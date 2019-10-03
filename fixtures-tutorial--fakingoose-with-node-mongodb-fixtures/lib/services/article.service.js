module.exports = ({ articleRepo }) => {
    return {
        async getAll() {
            try {
                const articles = await articleRepo.getAll();
                return { ok: true, articles }
            } catch (e) {
                return { ok: false, error: e };
            }
        }
    }
}