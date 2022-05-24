const fs = require("fs");
const path = require("path");
const { parsingBookmarks } = require("./utils");
async function html2Json(
  sourcePath = "bookmark.html",
  targetPath = "all.json"
) {
  const bookmarkContent = fs.readFileSync(
    path.resolve(__dirname, sourcePath),
    "utf8"
  );
  const data = await parsingBookmarks(bookmarkContent);
  const bookmark = data.map((item) => {
    return { ...item, description: "" };
  });
  await fs.writeFileSync(
    targetPath,
    JSON.stringify({
      name: "nav",
      author: "Monster",
      bookmark,
    }),
    "utf8"
  );
}

html2Json();
