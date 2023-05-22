---
title: markdown-it-attrs
date: 2023-05-23T00:43:29+07:00
updated: 2023-05-23T00:43:29+07:00
---

<style>
  .red { color: red }
  .red { color: green }
</style>

## Examples
Example input:
```md
# header {.style-me}
paragraph {data-toggle=modal}
```

Output:
```html
<h1 class="style-me">header</h1>
<p data-toggle="modal">paragraph</p>
```

# header {.green #id}
some text {with=attrs and="attrs with space"}

Works with inline elements too:
```md
paragraph *style me*{.red} more text
```

Output:
```html
<p>paragraph <em class="red">style me</em> more text</p>
```

And fenced code blocks:
<pre><code>
```python {data=asdf}
nums = [x for x in range(10)]
```
</code></pre>

Output:
```html
<pre><code data="asdf" class="language-python">
nums = [x for x in range(10)]
</code></pre>
```

You can use `..` as a short-hand for `css-module=`:

```md
Use the css-module green on this paragraph. {..green}
```

Output:
```html
<p css-module="green">Use the css-module green on this paragraph.</p>
```

## bracketed spans

Also works with spans, in combination with the [markdown-it-bracketed-spans](https://github.com/mb21/markdown-it-bracketed-spans) plugin (to be installed and loaded as such then):

```md
paragraph with [a style me span]{.red}
```

Output should be:
```html
<p>paragraph with <span class="red">a style me span</span></p>
```

Output actual:

paragraph with [a style me span]{.red}