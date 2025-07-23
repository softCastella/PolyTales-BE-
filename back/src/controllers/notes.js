// back/controllers/notes.js
const models = require("../models");

const createNote = async (req, res) => {
    try {
        const { title, content, storyId } = req.body;
        const userId = req.user?.id || 1; // 임시로 userId = 1로 설정

        // 임시로 주석 처리
        // if (!userId) {
        //     return res.status(401).json({ message: "인증된 사용자만 작성할 수 있습니다." });
        // }

        const note = await models.Note.create({
            title,
            content,
            userId,
            storyId,
            createdAt: new Date(),
        });

        res.status(201).json({ message: "ok", data: note });
    } catch (error) {
        console.error("노트 생성 오류:", error);
        res.status(500).json({ message: "서버 오류", error: error.message, stack: error.stack });
    }
};

const findNotes = async (req, res) => {
    try {
        const notes = await models.Note.findAll({
            include: [
                {
                    model: models.User,
                    as: "user",
                    attributes: ["nickName", "email"]
                },
                {
                    model: models.Story,
                    as: "story",
                    attributes: ["storyTitle", "langLevel"]
                }
            ],
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json({ message: "ok", data: notes });
    } catch (error) {
        console.error("노트 목록 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

const findNote = async (req, res) => {
    try {
        const { id } = req.params;

        const note = await models.Note.findByPk(id, {
            include: [
                {
                    model: models.User,
                    as: "user",
                    attributes: ["nickName", "email"]
                },
                {
                    model: models.Story,
                    as: "story",
                    attributes: ["storyTitle", "langLevel"]
                }
            ]
        });

        if (!note) {
            return res.status(404).json({ message: "노트를 찾을 수 없습니다." });
        }

        res.status(200).json({ message: "ok", data: note });
    } catch (error) {
        console.error("노트 조회 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user?.id;

        const note = await models.Note.findByPk(id);

        if (!note) {
            return res.status(404).json({ message: "노트를 찾을 수 없습니다." });
        }

        if (note.userId !== userId) {
            return res.status(403).json({ message: "본인만 수정할 수 있습니다." });
        }

        await note.update({ title, content });

        res.status(200).json({ message: "노트가 수정되었습니다.", data: note });
    } catch (error) {
        console.error("노트 수정 오류:", error);
        res.status(500).json({ message: "서버 오류" });
    }
};

const deleteNote = async (req, res) => {
    const noteId = req.params.id;

    try {
        const note = await models.Note.findByPk(noteId);

        if (!note) {
            return res.status(404).json({ message: "노트를 찾을 수 없습니다." });
        }

        // 삭제 : 작성자와 현재 유저가 다른 경우
        if (note.userId !== req.user.id) {
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
    deleteNote,
};
