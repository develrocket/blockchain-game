# XLM Chess
<div align="center">
<h1>Win XLM playing XLM Chess</h1>
<strong>2D Chess Game for fellow Lumenauts - CURRENTLY UNDER CONSTRUCTION </strong>
</div><br>

This game was inspired by and built for XLM and gaming enthusiasts abroad. Still under construction, the game will eventually permit users to test their chess skills and
wager XLM against a built-in game AI. Format is winner-take-all with blitz mode - meaning players will only have 5 minutes to defeat the game AI or they lose. 

It is written in Node.js and runs on Linux, OSX and Windows with MongoDB running in background for local development.
Learn more by reading the [overview document](https://github.com/mauricedw22/xlmChess/blob/main/README.md).

# Notes

This Node.js application currently permits XRP to be sent to addresses for the intention of wagering against the built-in game AI. These games will be Blitz style, meaning
players have up to 5 minutes to beat the AI or risk losing their wager. If you use ths app as XRP wallet, please note these addresses will soon be converted to XLM addresses instead. <BR><BR>

WARNING: Functionality for wagering XLM will soon replace all XRP functionality within app including XRP deposit/withdrawal - but the secret key obsfuscation will remain forever. You may continue to using
related XRP addresses but secret keys, which were AES-encryption protected with user-provided withdraw password after being hashed using SHA-256, will remain obsfuscated. 
