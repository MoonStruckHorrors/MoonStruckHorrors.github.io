---
layout: post
title: "Simple way to epoch"
date: 2018-08-25 20:00:00 +0700
categories: [python]
tags: [python, epoch, stackoverflow, datetime]
---

Came across this question recently:
[stackoverflow: Convert a column of yyyy-mm-dd datetimes to linux time epoch in Python](https://stackoverflow.com/questions/51760021/convert-a-column-of-yyyy-mm-dd-datetimes-to-linux-time-epoch-in-python/51760200)

Which referenced this question: [stackoverflow: Convert a column of datetimes to epoch in Python](https://stackoverflow.com/questions/35630098/convert-a-column-of-datetimes-to-epoch-in-python)

The accepted answer(s) suggests to find the diff between the date with the epoch reference date and calculate the seconds.

Well, we can... do this. There's a reason we're using the `datetime` objects and not writing our own classes for datetime.

```python
from datetime import datetime

dt = datetime.now()
print(f"{dt.timestamp()}")
```

Just use `.timestamp()` on your `datetime` object, people. That's it.

`import this` -> Rule:3 -> `Simple is better than complex.`