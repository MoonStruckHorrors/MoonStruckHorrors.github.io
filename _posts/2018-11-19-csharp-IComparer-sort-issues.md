---
layout: post
title: "IComparer issues with Array.Sort() in C# (Unity)"
date: 2018-11-19 20:00:00 +0700
categories: [C#, Unity]
tags: [C#, Unity, Scripting, IComparer, Vector, Vector2, Vector3]
---
Came across this seemingly weird issue while trying to sort an Array of `Vector2`s based on their X coordinates.

Wrote a quick Class extending `IComparer<Vector3>`
```c#
 public class Vector2DXPosComparer : IComparer<Vector3>
 {
     public int Compare(Vector3 v1, Vector3 v2)
     {
         if (v1.x > v2.x)
         {
             return 1;
         }
         else
         {
             return -1;
         }
     }
 }
```

And then just tried an `Array.Sort()` with this `IComparer`. Something like this.
```c#
Vector3[] arr =
{
    new Vector3(2, 0),
    new Vector3(4, 0),
    new Vector3(1, 0),
    new Vector3(3, 0)
};

Array.Sort(arr, new Vector2DXPosComparer());
string outStr = "";

for (int i = 0; i < arr.Length; i++)
{
    outStr += arr[i].ToString() + ", ";
}
Debug.Log(outStr);
```

The output was an unchanged, unsorted array - same as the original. Tried the exact thing with a regular C# project. Surprisingly it worked!
So the problem was definitely specific to Unity's `Array.Sort`.

Based on an answer from Unity Answers - this happens because the equality is not handled in the code.

In my previous IComparer code, the equality is clubbed in the else block. Even after getting the answer, took me a while to realize why exactly this is an issue. (Hint: Quick Sort)

Fix? Add one `=`. Or just use `CompareTo`

```c#
public int Compare(Vector3 v1, Vector3 v2)
{
    if (v1.x >= v2.x)
    {
        return 1;
    }
    else
    {
        return -1;
    }

    //OR just return v1.x.CompareTo(v2.x)
}
```

Time spent debugging: One Day. SMH.