const models = require("../models"); // ✅ 경로 수정 (CLI 초기화 후)


const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "인증된 사용자만 작성할 수 있습니다." });
        }

        const note = await models.Note.create({ // ✅ Note (대문자)
            title,
            content,
            userId
            // createdAt은 Sequelize가 자동으로 생성
        });

        res.status(201).json({ message: "ok", data: note });
    } catch (error) {
        console.error("노트 생성 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

const findNotes = async (req, res) => {
    try {
        const notes = await models.Note.findAll({ // ✅ Note (대문자)
            include: [
                {
                    model: models.User,
                    attributes: ["userName"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({ message: "ok", data: notes });
    } catch (error) {
        console.error("노트 목록 불러오기 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

const findNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await models.Note.findByPk(noteId, {
            include: [
                {
                    model: models.User,
                    attributes: ["userName"]
                }
            ]
        });

        if (!note) {
            return res.status(404).json({ message: "노트를 찾을 수 없습니다." });
        }

        res.status(200).json({ message: "ok", data: note });
    } catch (error) {
        console.error("개별 노트 불러오기 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

const updateNote = async (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;

    try {
        const note = await models.Note.findByPk(noteId); // ✅ Note (대문자)

        if (!note) {
            return res.status(404).json({ message: "노트를 찾을 수 없습니다." });
        }

        if (!req.user || note.userId !== req.user.id) {
            return res.status(403).json({ message: "본인만 수정할 수 있습니다." });
        }

        // ✅ update 메서드 사용 (더 효율적)
        await note.update({ title, content });

        res.status(200).json({ message: "ok", data: note });
    } catch (error) {
        console.error("노트 수정 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

const deleteNote = async (req, res) => {
    const noteId = req.params.id;

    try {
        const note = await models.Note.findByPk(noteId); // ✅ Note (대문자)

        if (!note) {
            return res.status(404).json({ message: "노트를 찾을 수 없습니다." });
        }

        if (!req.user || note.userId !== req.user.id) {
            return res.status(403).json({ message: "본인만 삭제할 수 있습니다." });
        }

        await note.destroy();
        res.status(200).json({ message: "노트가 삭제되었습니다." });
    } catch (error) {
        console.error("노트 삭제 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

module.exports = {
    createNote,
    findNotes,
    findNote,
    updateNote,
    deleteNote
};
