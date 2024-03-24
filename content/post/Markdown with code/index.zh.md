---
title: '包含代码的Markdown文件'
date: '2024-03-24'
---

# 代码片段

```JS
const slugify = (str) => {
  return (
    str &&
    str
      .replace(/[ ]*-[ ]*/g, ' ') // replace '-', starts and ends with 0 - n blank
      .split(' ')
      .map((x) => x.toLowerCase())
      .join('-')
  )
}
```
