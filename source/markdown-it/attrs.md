---
title: markdown-it-attrs
date: 2023-05-23T00:43:29+07:00
updated: 2023-05-23T00:43:29+07:00
---

## Examples
Example input:
```md
# header {.style-me}
paragraph {data-toggle=modal}
```

Output:
# header {.style-me}
paragraph {data-toggle=modal}

Works with inline elements too:
```md
paragraph *style me*{.red} more text
```

Output:
paragraph *style me*{.red} more text

And fenced code blocks:
<pre><code>
```python {data=asdf}
nums = [x for x in range(10)]
```
</code></pre>

Output:
```python {data=asdf}
nums = [x for x in range(10)]
```

You can use `..` as a short-hand for `css-module=`:

```md
Use the css-module green on this paragraph. {..green}
```

Output:
Use the css-module green on this paragraph. {..green}

Also works with spans, in combination with the [markdown-it-bracketed-spans](https://github.com/mb21/markdown-it-bracketed-spans) plugin (to be installed and loaded as such then):

```md
paragraph with [a style me span]{.red}
```

Output:
paragraph with [a style me span]{.red}