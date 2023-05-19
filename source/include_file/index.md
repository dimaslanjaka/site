---
title: Include any files to Hexo Post
date: 2023-05-19T20:08:11+07:00
updated: 2023-05-19T20:08:11+07:00
---

include any local files with syntax highlighter
```
{% include_file [title:'scoped title'] [lang:language] [from:line] [to:line] path/to/file %}
```

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

## include_code alias
Inserts code snippets relative to `source` folder. `code_dir` option in the config also be used for reference finder.

### Embed the whole content of test.js

```
{% include_file lang:javascript 'test.js' %}
```

{% include_file lang:javascript 'test.js' %}

### Embed line 13 only

```
{% include_file lang:typescript from:13 to:13 'fixtures/test.ts' %}
```

{% include_file lang:typescript from:13 to:13 'fixtures/test.ts' %}

### Embed line 5 to 8

```
{% include_file lang:typescript from:5 to:8 'fixtures/test.ts' %}
```

{% include_file lang:typescript from:5 to:8 'fixtures/test.ts' %}

### Embed line 5 to the end of file

```
{% include_file lang:typescript from:5 'fixtures/test.ts' %}
```

{% include_file lang:typescript from:5 'fixtures/test.ts' %}

### Embed line 1 to 8

```
{% include_file lang:javascript to:8 'test.js' %}
```

{% include_file lang:javascript to:8 'test.js' %}