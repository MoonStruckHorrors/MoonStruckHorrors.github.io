---
layout: post
title: "Audio out of sync - Windows 10"
date: 2018-09-28 00:00:00 +0700
categories: [technology, misc]
tags: [Windows10, Windows, Microsoft, Audio, Video, Web, Sync, Lag, MSIAfterburner, MSI, AfterBurner]
---

I've been living with this issue for more than an year now (probably more). In streaming videos (YouTube, Netflix, etc) the audio would progressively become out of sync with the video. With some quick observations I determined that it takes roughly 5-7 minutes for the video to lag 1s behind the audio. So that's 

I usually boot up Windows just for games so this isn't really that big of a deal. However, it is *really* annoying!

My standard response cycle for this issue is this:

1. Encounter the issue.
2. Google
3. Try the first non-visited solution.
4. Try to watch a lengthy video.
5. Issue persists.
6. Restart and boot into Linux.

Now, most of the times the first solutions were related to Realtek audio settings. Some were about the infamous Windows Power saving configuration. Heck, there was one about "Try using a wired headphone". [Stuff like this](https://helgeklein.com/blog/2017/03/streamed-video-audio-sync-problems-windows-10-realtek-sound/)

Trying a solution which doesn't work only adds to the frustration when you realize that after 10 minutes into a video. Well, maybe these are variations of the issue - but I surely wasn't facing these.

Now, what could possibly cause the video to lag behind the audio? It's obviously not the GPU - which is capable of pushing 144 frames at 1080p? What about the the overlay stuff?

MSI Afterburner! Or more specifically, RivaTuner Statistics Server that comes along with it. Provides the OSD which I use for in-game FPS, GPU/CPU Temperature monitoring.

Disabled the OSD and killed RTSS and it worked just fine! Removed MSI Afterburner completely for good measure.

For now, I'll make do with Zotac FireStorm for my OC/Fan control needs and Steam overlay for a minimal in-game FPS counter - Until MSI gets their shit together. ¯\\_(ツ)_/¯

**tl;dr**: audio/video don't go hand in hand? kill MSI Afterburner.