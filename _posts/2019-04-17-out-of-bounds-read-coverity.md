---
layout: post
title: "Coverity - Out-of-bounds Read (CWE-125) - Interesting oversight"
date: 2019-04-17 18:00:00 +0700
categories: [c++, technology]
tags: [c++, cpp, c, static-analysis, static, analysis, coverity, synopsys, code, programming, coding, violation]
---

CWE-125: Out-of-bounds Read -- [https://cwe.mitre.org/data/definitions/125.html](https://cwe.mitre.org/data/definitions/125.html)

Error message:
```
Out-of-bounds read (OVERRUN)
5. overrun-local: Overrunning array someArray of 655 4-byte elements at element index 658 (byte offset 2632) using index idxForSomeArray (which evaluates to 658).
```

The issue itself is pretty straightforward; trying to read an out-of-bounds / invalid index. Was pretty sure about this being a false positive initially.

The code looks something like this:

```c++
char* someArray[] = {
    /* === A long list of array elements here === */
    /* vvv newly added code vvv*/
    "a"        //wow that's a,
    "b"        //orly b,
    "c"        //definitely c,
};

// We usually keep adding stuff to the array and updating the size here
int someArraySize = 3;
```

This array is used like this:

```c++
for (int i=0; i<someArraySize; i++) {
    /* Read using i - started causing SA Violation when reaching the newly added elements after adding new elements to the array */
}
```

For instance, in the above snippet, if we try to access `someArray[2]` - it results in this warning during compilation.

```
array index 2 is past the end of the array (which contains 1 element) [-Warray-bounds]
```

But we have three elements, right? Wrong, we have just one element `"abc"`, not three elements. Apparently, if we miss the commas in the curly bracket initialization syntax for char* arrays, C++ decides to concatenate the string literals. Have to find the proper documentation for this behavior, but that's how it is.

This code works just fine:

```c++
char* someArray[] = {
    /* === A long list of array elements here === */
    /* vvv newly added code vvv*/
    "a",        //wow that's a,
    "b",        //orly b,
    "c"        //definitely c,
};
```

Minor but interesting issue. Good fun for around 15 minutes.