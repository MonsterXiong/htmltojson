const htmlparser2 = require("htmlparser2");

function parsingBookmarks(bookmarksHtml) {
  const contentArr = [];
  const tagArr = [];
  const titleArr = [];
  const textArr = [];
  let index = 0;

  return new Promise((resolve, reject) => {
    try {
      const parser = new htmlparser2.Parser({
        onopentag: function (name, attribs) {
          if (_isBookmarkTag(name)) {
            const obj = {
              id: index++,
            };

            if (_isATag(name)) {
              const { href, icon } = attribs;
              obj.url = href;
              obj.icon = icon;
            }

            if (_isDlTag(name)) {
              obj.title = titleArr[titleArr.length - 1] || "Bookmarks";
              titleArr.pop();
            }

            if (tagArr.length) {
              obj.parentId = tagArr[tagArr.length - 1].id;
            }

            tagArr.push(obj);
            contentArr.push(obj);
          }
        },
        ontext: function (text) {
          const textValue = text.trim();
          const tagLen = tagArr.length;
          if (textValue && tagLen) {
            textArr.push(textValue);
          }
        },
        onclosetag: function (name) {
          const lastTextArrayItem = textArr[textArr.length - 1];

          if (_isCategoryTag(name)) {
            titleArr.push(lastTextArrayItem);
          }

          if (_isBookmarkTag(name)) {
            if (_isATag(name)) {
              contentArr[contentArr.length - 1].text = lastTextArrayItem;
            }

            tagArr.pop();
          }
          if (!_isDlTag(name)) {
            textArr.pop();
          }
        },
      });

      parser.write(bookmarksHtml.replace(/\<(DT|p)\>/g, ""));
      parser.end();

      resolve(contentArr);
    } catch (e) {
      reject(e);
    }
  });
}

function _isATag(tag) {
  return tag === "a";
}

function _isDlTag(tag) {
  return tag === "dl";
}

function _isCategoryTag(tag) {
  return tag === "h3";
}

function _isBookmarkTag(tag) {
  return _isATag(tag) || _isDlTag(tag);
}

function transListToTreeData(list, rootValue) {
  const arr = [];
  list.forEach((item) => {
    // if (item.parentId === rootValue) {
    if (item.parent_id == rootValue) {
      // const children = transListToTreeData(list, item.id);
      const children = transListToTreeData(list, item.cid);
      if (children.length) {
        item.children = children;
      }
      arr.push(item);
    }
  });
  return arr;
}

module.exports = {
  parsingBookmarks,
  transListToTreeData,
};
