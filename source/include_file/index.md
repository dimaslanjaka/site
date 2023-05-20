---
title: Include any files to Hexo Post
date: 2023-05-19T20:08:11+07:00
updated: 2023-05-19T20:08:11+07:00
---

include any local files with syntax highlighter
```
{% include_file [title:'scoped title'] [lang:language] [from:line] [to:line] [pretext:[true|false]] path/to/file %}{% endinclude_file %}
```

| option key | description | default |
| :--- | :--- | :--- |
| title | caption title | `path.extname(pathToFile)` |
| pretext | wrap codes with `<pre/><code/>` and syntax highlight enable indicator | `true` |
| lang | syntax highlighter for spesific language, _needs `pretext` to `true`_ | `empty string` by default treat as text plain |
| from | embed start line | `0` |
| to | embed ends line | `Number.MAX_VALUE` |

## path relative to source directory

```
{% include_file 'fixtures/include-one.txt' %}{% endinclude_file %}
```

{% include_file 'fixtures/include-one.txt' %}{% endinclude_file %}

## path relative to current file (with space and without preText)

```
{% include_file '../fixtures/include two.txt' pretext:false %}{% endinclude_file %}
```

{% include_file '../fixtures/include two.txt' pretext:false %}{% endinclude_file %}

## include_code alias
Inserts code snippets relative to `source` folder. `code_dir` option in the config also be used for reference finder.

references:
- [hexojs/hexo#3211](https://github.com/hexojs/hexo/issues/3211)

### Embed the whole content of test.js
`test.js` inside `source/downloads/code` (`hexo.code_dir`)

```
{% include_file lang:javascript 'test.js' %}{% endinclude_file %}
```

{% include_file lang:javascript 'test.js' %}{% endinclude_file %}

```
{% include_file lang:javascript 'downloads/code/test.js' %}{% endinclude_file %}
```

{% include_file lang:javascript 'downloads/code/test.js' %}{% endinclude_file %}

### Embed line 13 only

```
{% include_file lang:typescript from:13 to:13 'fixtures/test.ts' %}{% endinclude_file %}
```

{% include_file lang:typescript from:13 to:13 'fixtures/test.ts' %}{% endinclude_file %}

### Embed line 5 to 8

```
{% include_file lang:typescript from:5 to:8 'fixtures/test.ts' %}{% endinclude_file %}
```

{% include_file lang:typescript from:5 to:8 'fixtures/test.ts' %}{% endinclude_file %}

### Embed line 5 to the end of file

```
{% include_file lang:typescript from:5 'fixtures/test.ts' %}{% endinclude_file %}
```

{% include_file lang:typescript from:5 'fixtures/test.ts' %}{% endinclude_file %}

### Embed line 1 to 8

```
{% include_file lang:javascript to:8 'test.js' %}{% endinclude_file %}
```

{% include_file lang:javascript to:8 'test.js' %}{% endinclude_file %}

### Custom Template

> `$line` is current line of code
> `$index` is current line index of code

```
<table>
  <thead>
    <tr>
      <th>index</th><th>contents line</th>
    </tr>
  </thead>
  <tbody>
    {% include_file lang:javascript 'test.js' pretext:false %}
    <tr><td>$index</td><td>$line</td></tr>
    {% endinclude_file %}
  </tbody>
</table>
```

<table>
  <thead>
    <tr>
      <th>index</th><th>contents line</th>
    </tr>
  </thead>
  <tbody>
    {% include_file lang:javascript 'test.js' pretext:false %}
    <tr><td>$index</td><td>$line</td></tr>
    {% endinclude_file %}
  </tbody>
</table>
