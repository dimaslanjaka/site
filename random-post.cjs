'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const hexoUtil = require('hexo-util');
const Hexo = require('hexo');

const hexo = new Hexo(__dirname, { silent: true });

const TOTAL_POSTS = 100;

const RANDOM_BODY = fs.readFileSync(path.join(__dirname, 'random-post-body.md'), 'utf8');

const LAYOUTS = [
  { layout: 'layout-njk', tags: ['nunjucks'], category: ['nunjucks'] },
  { layout: 'layout-ejs', tags: ['ejs'], category: ['ejs'] },
  { layout: 'layout-pug', tags: ['pug'], category: ['pug'] }
];

const DATE_START = new Date('2012-01-01');
const DATE_END = new Date('2021-11-25');

hexo.init().then(() => {
  console.log(`Creating ${TOTAL_POSTS} posts...`);
  create(generate(TOTAL_POSTS), path.join(__dirname, 'source/_posts/random'));

  console.log(`Creating ${TOTAL_POSTS} pages...`);
  create(generate(TOTAL_POSTS), path.join(__dirname, 'source/page/random'));
}).catch((err) => {
  console.error('Error initializing Hexo:', err);
});

/**
 * Generate post data
 */
function generate(count, type = 'post') {
  return Array.from({ length: count }, (_, index) => {
    const current = index + 1;

    const created = randomDate(DATE_START, DATE_END);
    const updated = randomDate(created, new Date());

    const selectedLayout = LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)];

    return {
      title: `${type === 'post' ? 'Post' : 'Page'} ${current}`,
      date: formatDate(created),
      updated: formatDate(updated),
      author: 'Dimas Lanjaka',
      layout: selectedLayout.layout,
      keywords: ['random', `${type === 'post' ? 'post' : 'page'}`],
      tags: [...(current.toString().includes('5') ? ['post has 5'] : []), ...selectedLayout.tags],
      category: [
        'random',
        current.toString().includes('0') ? 'post has 0' : 'uncategorized',
        ...selectedLayout.category
      ],
      filename: `post-${current}.md`,
      permalink: `/random-post-${current}.html`,
      content: buildContent(current)
    };
  });
}

/**
 * Create markdown files
 */
function create(posts, outputDir) {
  cleanDir(outputDir);

  const filesCreated = [];
  for (const post of posts) {
    const { filename, content, ...frontmatter } = post;
    const filePath = path.join(outputDir, filename);
    const fileContent = ['---', yaml.stringify(frontmatter).trim(), '---', '', content.trim(), ''].join('\n');

    fs.writeFileSync(filePath, fileContent);
    filesCreated.push(filePath);
  }

  const indexPath = path.join(outputDir, 'index.md');
  fs.writeFileSync(
    indexPath,
    `---
title: Index ${outputDir.includes('page') ? 'Pages' : 'Posts'}
description: This is the index page for ${outputDir.includes('page') ? 'pages' : 'posts'}.
permalink: /random-${outputDir.includes('page') ? 'pages' : 'posts'}/
---

# Index Page

This is the index page for ${outputDir.includes('page') ? 'pages' : 'posts'}.

# List of ${outputDir.includes('page') ? 'pages' : 'posts'}

${posts.map((post) => `- [${post.title}](${hexoUtil.url_for.bind(hexo)(post.permalink)})`).join('\n')}

    `
  );
  filesCreated.push(indexPath);

  return filesCreated;
}

/**
 * Remove and recreate folder
 */
function cleanDir(dir) {
  fs.rmSync(dir, {
    recursive: true,
    force: true
  });

  fs.mkdirSync(dir, {
    recursive: true
  });
}

/**
 * Build markdown content
 */
function buildContent(current) {
  return `
# Post Content

This is content of post ${current}

## random image 200x300

![random image ${current}](https://picsum.photos/200/300)
![another random image ${current}](https://picsum.photos/200/300?random=${current})

## placeholder image 640x480

![placeholder image ${current}](https://dummyimage.com/640x480/000/fff&text=Post+${current})

${RANDOM_BODY}
`;
}

/**
 * Generate random date between range
 */
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

/**
 * Format date as ISO string
 */
function formatDate(date) {
  return date.toISOString();
}
