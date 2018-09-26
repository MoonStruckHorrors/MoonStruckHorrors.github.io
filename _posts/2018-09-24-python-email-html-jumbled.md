---
layout: post
title: "Fix for jumbled / incorrect / glitchy E-mail HTML in Python"
date: 2018-09-24 20:00:00 +0700
categories: [python]
tags: [python, mime, programming, coding, email, mail, html, table]
---

So I have this script I wrote at work which sends out E-mails for some internal defect stats.

# The Issue

For a long time, every few days the HTML would sporadically be jumbled up - strings jumping from once place to another.

Most of the times it would be a missing `<td>` in a `<tr>` - which would surprisingly reappear somewhere before the table.

The E-mail part of the script was something like this.

```python
# Create the MIMEMultipart()
email = MIMEMultipart()
email['From'] = from_
email['To'] = ", ".join(to_)
email['Subject'] = subject
email['Cc'] = ", ".join(cc_)
# Add some text to it
text = MIMEText(txt, 'html', 'us-ascii')
email.attach(text)

# == Attach files ==
# == Attach images ==

# Create a SMTP object and send the MIMEMultipart over it
connection = SMTP("someserver.domain.com")
connection.send_message(email)
```

It looks something like this in action.

![issue](https://i.imgur.com/GfcUDFw.png)
(That A belongs to the fourth column. Yes, it's pixelated. That's why I added an arrow)

# Investigation

At first, I thought there was something wrong with my HTML generating logic. Since the issue happened randomly, I persisted the HTML which was being sent out. When it finally happened again, I looked at the HTML and it was proper.
But atleast I had the HTML which would consistently reproduce this behavior.

Googled a lot with no luck. Tried a lot of permutations: `python smtp html issue/bug`, `python mime html formatting issue/bug`, `python mimemultipart mimetext issue/bug`. And many, many more. 😅

# The Fix

Newlines! I realized my HTML lacked `\n`s. It was rendering properly in a browser, but in the E-mail client (tried with Outlook on Mac/Windows) it would come jumbled up.

Just adding line breaks to the HTML seems to fix this issue. I'm not really sure why would this happen, but if anyone knows - let me know. 🙂