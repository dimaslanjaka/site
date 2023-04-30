---
title: embed any codes from github
---

## with full url

{% github https://github.com/dimaslanjaka/static-blog-generator/blob/e8ef351552d57c5e28e016e39e78fef139a8e7b2/.github/workflows/build-beta.yml#L152-L158 %}

## without base url
embed tag without base url `https://github.com/`

{% github dimaslanjaka/static-blog-generator/blob/e8ef351552d57c5e28e016e39e78fef139a8e7b2/.github/workflows/build-beta.yml#L152-L158 %}

## using object options

| property | description | sample value |
| :--- | :--- | :--- |
| repo | github repository | github_username/github_repo |
| file | file path | file path to embed |
| ref | github refs | commit hash or branch |
| line | embed specific line | 152-158 or #L152-L158 |

{% github repo:dimaslanjaka/static-blog-generator ref:e8ef351552d57c5e28e016e39e78fef139a8e7b2 file:.github/workflows/build-beta.yml line:#L152-L158 %}

## using object options - line without `#L`

{% github repo:dimaslanjaka/static-blog-generator ref:e8ef351552d57c5e28e016e39e78fef139a8e7b2 file:.github/workflows/build-beta.yml line:152-158 %}