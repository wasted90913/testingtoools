# **App Name**: CipherLens

## Core Features:

- WebSocket Interception: Intercept and display WebSocket messages to and from the game server.
- AES-CBC Decryption: Decrypt intercepted WebSocket messages using the hardcoded AES key and IV (pbc_efgfi1@l0nwp) tool. Provides real-time decryption of 'wl' protocol traffic.
- Payload Encryption: Encrypt custom payloads using the hardcoded AES key and IV (pbc_efgfi1@l0nwp) tool, to construct and inject malicious game commands.
- URL Parameter Handling: Decode and encode URL parameters using the weak character substitution logic used by the game, which lets a user manipulate the URL.
- Payload Generation: Generate payloads for exploiting game vulnerabilities like jackpot score request and score update manipulation.
- Session Hijacking: Generate forged payloads for session hijacking.

## Style Guidelines:

- Primary color: Dark Purple (#4A148C) evoking intrigue and digital mystique, relating to reverse engineering.
- Background color: Very dark gray (#212121) for a focused, hacker-esque environment in line with a dark scheme.
- Accent color: Electric Green (#7CFC00) to highlight important data and interactive elements.
- Body and headline font: 'Space Grotesk' sans-serif for a modern and technical feel. Note: currently only Google Fonts are supported.
- Code font: 'Source Code Pro' for displaying intercepted ciphertext, decrypted JSON, and URL parameters. Note: currently only Google Fonts are supported.
- Use minimalist, geometric icons to represent data flow, encryption algorithms, and injection points.
- Subtle transitions and animations to highlight changes in intercepted data and payload encryption status.