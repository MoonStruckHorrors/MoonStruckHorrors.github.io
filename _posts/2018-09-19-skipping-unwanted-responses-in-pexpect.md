---
layout: post
title: "Skipping unwanted responses in pexpect"
date: 2018-09-19 20:00:00 +0700
categories: [python]
tags: [python, pexpect, expect, automation, CLI]
---

Was recently automating some Server CLI stuff and came across this weird issue. Where I was getting blanks whenever I tried to get some response back from the Terminal session.

Spent a day figuring out why I was getting blank responses.

```python
# process: pexpect spawn object
# prompt: terminal prompt; eg: '>', '~'
process.sendline('set SOME_VAR=1') # We don't need the empty response of this command
process.sendline('echo cake') # Returns a response, but we don't need it; sorry cake

process.sendline('ls') # Say we need the response of this one

process.expect([prompt, pexpect.TIMEOUT, pexpect.EOF]) # Searches the first occurance of prompt

resp_b = process.before # This would return the response upto the first prompt, not the ls response
```

This is because of the way pexpect works with the terminal response buffer. To get around this, you should match every `sendline` with a call to `expect`.

Or, we can do it in a single line. Since expect works with regex, we can simple jump to the end of the terminal response so far.

```python
# Use something other than fstring if you're not on Python 3.6
process.expect(f'{prompt}$') # Searches the last occurance of prompt (Prompt followed by end of string)

# OR

process.expect(f'{prompt} $') # The prompts usually have a trailing space
```

Wrapped up in a neat function.

```python
def get_and_clear_full_response(process, prompt):
    # Search for prompt[SPACE][END_OF_STRING]
    process.expect(['{0} $'.format(prompt), pexpect.TIMEOUT, pexpect.EOF])
    # Return the full response buffer since the last expect
    return process.before
```

Fixed code:

```python
process.sendline('set SOME_VAR=1') # We don't need the empty response of this command
process.sendline('echo cake') # Returns a response, but we don't need it; sorry cake

_ = get_and_clear_full_response(process, prompt) # Let's clear everything

process.sendline('ls') # Say we need the response of this one
process.expect(prompt)
resp_b = process.before # This would return the output of ls
```

Simple, eh? Could become annoying if you start suspecting the server / CLI for not displaying a response.