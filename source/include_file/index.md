---
title: Include any files to Hexo Post
date: 2023-05-19T20:08:11+07:00
updated: 2023-05-19T20:08:11+07:00
---

## path relative to source directory

```
{% include_file 'fixtures/include-one.txt' %}
```

{% include_file 'fixtures/include-one.txt' %}

## path relative to current file (with space)

```
{% include_file '../fixtures/include two.txt' %}
```

{% include_file '../fixtures/include two.txt' %}