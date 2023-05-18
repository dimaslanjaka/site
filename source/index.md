---
title: hexo-shortcodes demo
date: 2013-12-25 00:14:39
updated: 2023-02-25T00:48:02+07:00
---

Various hexo shortcode tags. [GitHub](https://github.com/dimaslanjaka/hexo-shortcodes)

| shortcode | description |
| :--- | :--- |
| [hexo **codepen** shortcode](codepen) | embed codepen |
| [hexo **gist** shortcode](gist) | embed gist |
| [hexo **jsfiddle** shortcode](jsfiddle) | embed jsfiddle |
| [hexo **github card** shortcode](githubCard) | embed github card |
| [hexo **rss reader** shortcode](rssreader) | embed rss feed |
| [hexo **github** shortcode](github) | embed any source files from [github.com](https://github.com) |
| [hexo **npmrunkit** shortcode](npmrunkit) | embed any javascript codes to website |
| [videos](videos) | default hexo embedding videos |

## Language Test

- [php](lang/php)

## Changelog
read more at https://github.com/dimaslanjaka/hexo-shortcodes/commits/pre-release `chore` sections
### 1.2.0
- `gist`: change parameters and usages
- `gist`: validate id is URL or not
### 1.1.3
- `rssreader`: hotfix get thumbnail from rss item
- `rssreader`: fix: validate item['media:group'] is Array
### 1.1.2
- `gist`: fix undefined username
### 1.1.1
- fix: invalid `git-embed` location