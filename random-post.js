const { existsSync, mkdirSync, writeFileSync, rmSync } = require("fs");
const { join } = require("path");
const yaml = require("yaml");
const moment = require("moment");
require("js-prototypes/dist/libs/globals");
const prompt = require("prompt");

const properties = [
  {
    name: "count",
    validator: /^[0-9=]{1,5}$/,
    warning: "Only accept number"
  }
];

prompt.start();

prompt.get(properties, function (err, result) {
  if (err) {
    return onErr(err);
  }

  let countArticle = parseInt(result.count ? result.count : 10) / 2;
  if (!countArticle) countArticle = 2;
  console.log("creating", countArticle, "posts");
  const posts = generate(countArticle);
  const sourcePostsDir = join(__dirname, "source/_posts/random");
  create(posts, sourcePostsDir);

  console.log("creating", countArticle, "pages");
  const pages = generate(countArticle);
  const sourcePageDir = join(__dirname, "source/page/random");
  create(pages, sourcePageDir);
});

function generate(countArticle) {
  return Array.from(Array(countArticle).keys()).map((n) => {
    // make random post latest to 2021-11-25
    // prevent indicator post overriden
    const created = randomDate(new Date(2012, 0, 1), moment("2021-11-25").toDate());
    // latest updated based on created date
    const updated = randomDate(new Date(2012, 0, 1), created);
    // index count, dismiss 0/zero
    const current = n + 1;
    return {
      title: "Post " + current,
      date: created,
      keywords: ['random', 'post', 'pages'],
      author: 'Dimas Lanjaka',
      tags: ["random post", current.toString().includes("5") ? "post has 5" : "untagged"].removeEmpties(),
      category: ["random post", current.toString().includes("0") ? "post has 0" : "uncategorized"].removeEmpties(),
      updated: updated,
      content: "This is content of post " + current,
      filename: "post-" + current + ".md"
    };
  });
}

function create(posts, sourceDir) {
  if (existsSync(sourceDir)) rmSync(sourceDir, { recursive: true, force: true });
  if (!existsSync(sourceDir)) mkdirSync(sourceDir, { recursive: true });
  posts.forEach((post) => {
    post.date = moment(post.date).format("YYYY-MM-DDTHH:mm:ssZ");
    post.updated = moment(post.updated).format("YYYY-MM-DDTHH:mm:ssZ");
    const content = post.content;
    const filepath = join(sourceDir, post.filename);
    delete post.content;
    delete post.filename;
    const header = yaml.stringify(post);
    const build = `---\n${header}---\n${content}`;
    writeFileSync(filepath, build);
  });
}

function onErr(err) {
  console.log(err);
  return 1;
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
