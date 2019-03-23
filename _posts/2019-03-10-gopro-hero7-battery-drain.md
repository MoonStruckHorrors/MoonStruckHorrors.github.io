---
layout: post
title: "[Short] GoPro Hero 7 - Battery Drain issue"
date: 2019-03-15 18:00:00 +0700
categories: [technology, others]
tags: [gopro, hero7, hero, goprohero7, battery, drain, charge]
---

## Issue:

GoPro Hero 7's battery drains overnight while it is switched off. (Brand new device, less than 3 days old)

## Fixes I found on the Internet:

### Rollback firmware updates
Since I updated the firmware the first time I booted up the device, this was the first thing I tried. Left it powered off for roughly 6 hours and the battery reached zero.

### Remove the memory card before switching off
This was a weird one, but since I wanted it fixed without going through the replacement / RMA procedure, I gave it a shot. After all, you never know what kind of coding brainfarts are embedded. Didn't work.

# Fix that worked for me
Turn off the Wireless connectivity. 
From the pull down menu, go to `Preferences > Connections > Wireless Connections > Off`.

After leaving it powered off overnight and seeing no battery drain, decided to stress test it. Stress testing in this case means leaving it powered off for *days*. Left it powered off for a week - minimal battery drain!