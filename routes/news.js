const {
  getAllNews,
  getNews,
  createNews,
  updateNews,
  deleteNews,
} = require("../controllers/news");
const { getCommentsFromNews } = require("../controllers/comments");

router.get("/", getAllNews);
router.get("/:id/comments", getCommentsFromNews);
router.get("/:id", getNews);
router.post("/", createNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

module.exports = router;
