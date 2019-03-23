---
layout: post
title: "[Short] Dockerfile - COPY: no such file or directory"
date: 2019-02-27 18:00:00 +0700
categories: [technology, others]
tags: [docker, Dockerfile, COPY, no, such, file, or, directory]
---

## Issue
Getting the error `COPY: no such file or directory` when you run a `docker build` for a `Dockerfile` with a `COPY` command like this - `COPY /Users/nikhil/somefile.jar /somefolderonimage/`

## Fix
Docker doesn't know about any file except the ones in `$(pwd)`. It just denies its existence because of some weird design decision. Copy the files to be bundled with the image into the current working directory(Where you're running the `docker build` from). And then use something like this - `COPY somefile.jar /somefolderonimage/`