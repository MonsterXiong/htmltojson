const express = require("express");
const app = express();
// const bodyparser = require("body-parser");
const formidable = require("express-formidable");
const { Bookmark, Category } = require("./model/");
const path = require("path");
const fs = require("fs");
const { parsingBookmarks, transListToTreeData } = require("./utils");

app.use(formidable());

app.post("/", async (req, res) => {
  // 上报数据
  // console.log(req.fields[0].children.length);
  res.end();
});

// 获取书签列表
app.get("/bookmark/", async (req, res) => {
  let booklist = await Bookmark.findAll();
  booklist.map((item) => item.dataValues);
  res.send(booklist);
});

// 根据谷歌书签HTML上传书签
app.get("/bookmark/upload", async (req, res) => {
  const targetPath = req.query.path || "bookmark.html";
  const bookmarkContent = fs.readFileSync(
    path.resolve(__dirname, targetPath),
    "utf8"
  );
  const data = await parsingBookmarks(bookmarkContent);
  const bookList = data
    .slice(0)
    .filter((item) => !item.title)
    .map((item) => {
      const info = {
        name: item.text.substr(0, 255),
        cid: item.parentId,
        icon: item.icon,
        url: item.url,
      };
      return info;
    });
  try {
    const bookmark = await Bookmark.bulkCreate(bookList, {
      updateOnDuplicate: ["cid"],
    });
    res.send(bookmark);
  } catch (err) {
    console.log(err.message);
  }
});

// 获取菜单列表
app.get("/menu/", async (req, res) => {
  const bookmarkContent = await Category.findAll();
  const alist = bookmarkContent.map((item) => item.dataValues);
  // const data = await transListToTreeData(alist);
  res.send(alist);
});

// 上传菜单列表
app.get("/menu/upload", async (req, res) => {
  const targetPath = req.query.path || "bookmark.html";
  const bookmarkContent = fs.readFileSync(
    path.resolve(__dirname, targetPath),
    "utf8"
  );
  const data = await parsingBookmarks(bookmarkContent);
  const bookList = data
    .slice(1)
    .filter((item) => item.title)
    .map((item) => {
      const data = {
        cid: item.id,
        name: item.title,
      };
      if (item.parentId) {
        data.parent_id = item.parentId;
      }
      return data;
    });
  const a = await Category.bulkCreate(bookList, {
    updateOnDuplicate: ["cid"],
  });
  res.send(a);
});

app.get("/all/", async (req, res) => {
  const targetPath = req.query.path || "bookmark.html";
  const bookmarkContent = fs.readFileSync(
    path.resolve(__dirname, targetPath),
    "utf8"
  );
  const data = await parsingBookmarks(bookmarkContent);
  res.send(data);
});

app.listen(3001, () => {
  console.log("server is running at port 3000");
});
