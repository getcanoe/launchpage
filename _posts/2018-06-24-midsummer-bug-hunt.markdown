---
layout: post
title: Midsummer Bug Hunt
date: 2018-06-24 12:30:00
description: 
img: midsummer.jpg
author: gokr
tags: [canoe, mobile] # add tag
---
We just released Canoe 0.9.12 fixing a small but highly troublesome bug. You can go straight to download without reading the details, but if you are really interested, here goes...

<!--more-->

It turns out that Canoe had a bug that has been in the Nanowallet codebase (which Canoe successfully has been reusing) since the beginning. The bug triggers the bad behavior in Canoe, but doesn't seem to cause a problem in Nanowallet, probably due to different block propagation code. We are still informing Nanowallet.io of course, and it's a oneliner fix.

Download [Canoe 0.9.12](/download).

# Rapid response
We got the information from the community that Nano had been lost for at least one user and since we didn't really know at the time what the issue was - we decided to temporarily stop the Canoe server. Tyler and Göran then proceeded to investigate and debug the issue as it was described, in fact, Tyler had already been working on a similar issue in other wallets. **We felt this was an appropriate call, since it actually involved losing funds**.

With this new bug fix release the backend is up and running again. We hope this didn't cause any imminent troubles for our users, better safe than sorry.

Also, earlier this weekend we had another silly incident involving the backend server being accidentally shut down due to credit card fumbling. That's on me - Göran - sorry about that!

# Scenario
The bug happens when Canoe starts and has a **newly created account with no blocks in it, and more than one pending send into that account**. This scenario was discovered now due to a lot of people migrating to new wallets and thus transferring multiple times into newly created accounts.

The bug only happens in that case. The result is that either Canoe **fails to produce proper receive blocks (and account chain ends up broken)**, or it **erroneously creates a send block** (which of course is MUCH worse), since the type of the block is decided by the balance in the block - and that is precisely what goes wrong.

# Details of the bug

In the below text I use "open" and "receive" etc, but of course, **we are talking about state blocks**.

1. Canoe starts and asks for pending sends to all its accounts. It finds one account with multiple pending sends into it, and starts to process them and "pocket" them.

2. Canoe creates the first "open" block, signs it and adds it to the list of blocks to be sent out for this account, and then Canoe broadcasts it to the Canoe backend to be sent out on the network. This last part can take some time of course to finish, and in this period of time Canoe proceeds working.

3. Canoe then processes the second incoming send. It detects properly that it needs to make a "receive" block (since it has already made an "open" block), but in making this receive block it **calculates the wrong current balance** of the account. The current chain is empty, because the "open" block that was created before hasn't yet been added to the chain, it sits in the "list of blocks to be sent out". The code for calculating the balance had **a bug causing it to return too early returning 0** when the chain is empty. It failed to take into account that there can be blocks outgoing already.

# Changes

The following additional fixes are in this release:

* Improved password mismatch feedback

* Guard preventing failing to play sound to cause errors

* Added xrbblock and nanoblock QR code handler

* Improved Repair function to be equivalent to reimporting seed

* Added attribution page for sounds used in Canoe


If you have questions or want to help out, you can always reach us on our [discord server](https://discord.gg/ecVcJM3).

Thank you!

Göran, Rami, Tyler, Stef, Cédric