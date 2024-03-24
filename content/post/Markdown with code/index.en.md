---
title: 'Markdown file with code'
date: '2024-03-24'
---

# A code snippet

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
