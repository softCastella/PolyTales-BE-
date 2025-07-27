const { Progress } = require('../models');

// 진도 저장(업데이트 또는 생성)
exports.saveProgress = async (req, res) => {
    try {
        const { userId, storyId, currentPage, totalPage } = req.body;
        const isFinished = currentPage >= totalPage;

        // upsert: 있으면 업데이트, 없으면 생성
        const [progress, created] = await Progress.findOrCreate({
            where: { userId, storyId },
            defaults: { currentPage, totalPage, isFinished }
        });
        if (!created) {
            await progress.update({ currentPage, totalPage, isFinished, updatedAt: new Date() });
        }
        res.json({ success: true, progress });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// 진도 조회
exports.getProgress = async (req, res) => {
    try {
        const { userId, storyId } = req.query;
        const progress = await Progress.findOne({ where: { userId, storyId } });
        res.json({ success: true, progress });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};