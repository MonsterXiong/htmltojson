const bookJson = require("./all.json");
const fs = require("fs");
function transListToTreeData(list, rootValue) {
  const arr = [];
  list.forEach((item) => {
    if (item.parentId == rootValue) {
      const children = transListToTreeData(list, item.id);
      if (children.length) {
        item.children = children;
      }
      arr.push(item);
    }
  });
  return arr;
}

const bookList = transListToTreeData(bookJson.bookmark.slice(1), 0);

function treeDataToHtml(data) {
  let h = "";

  if (data.title) {
    h += `<DT><H3>${data.title}</H3>\n`;
  }
  if (data.children && data.children.length) {
    h += `<DL><p>\n`;
    data.children.map((item) => {
      if (item.children) {
        h += treeDataToHtml(item);
      }
      h += `<DT><A HREF="${item.url}" ICON="${item.icon}">${item.text}</A>\n`;
    });

    h += `</DL><p>\n`;
  }

  return h;
}

let contentHtml = "";
bookList.forEach((item) => {
  contentHtml += treeDataToHtml(item);
});

const preHtml = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>\n<DL><p>\n${contentHtml}</DL><p>`;
fs.writeFileSync("./all2.html", preHtml, "utf8");
