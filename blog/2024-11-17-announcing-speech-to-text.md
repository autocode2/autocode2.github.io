---
slug: announcing-speech-to-text
title: "Announcing speech-to-text: CLI Audio Transcription Using Gemini"
authors: [gingerhendrix]
tags: []
---

I've just released `@autocode2/speech-to-text`, a Node.js library and CLI tool that makes it easy to transcribe speech using Google's Gemini API.

<!-- truncate -->

Gemini is extremely cheap (or free) for audio processing, 1 minute of audio is 1,500 tokens, or 90k tokens/hour.  Google's free tier (if you don't mind sharing your audio with Google) offers:
- **1.5 Flash**: 1 million free tokens per minute
- **1.5 Pro**: 32k free tokens per minute (though only 50 requests per day)

Either option allows for a lot of transcription for free, and the quality of Flash is quite reasonable (my accent is hard to parse for many speech-to-text systems, but Flash does a good job).

If you'd rather pay for your tokens (and keep your audio private):
- **1.5 Flash**: $0.075 per million tokens, or 0.01125 cents per minute, or less than 1 cent per hour
- **1.5 Pro**: $1.25 per million tokens, or 0.1875 cents per minute, or 11.25 cents per hour

## Quick Start

The quickest way to try it out is with npx:

```bash
npx @autocode2/speech-to-text --api-key YOUR_API_KEY
```

This will record from your microphone until you press Enter, then transcribe the audio using Gemini's flash model.

## Features

- **Simple CLI Interface**: Record and transcribe with a single command
- **File Support**: Transcribe existing audio files or save recordings
- **Flexible Output**: Text or JSON output, perfect for scripting
- **Library Integration**: Easy to integrate into Node.js projects
- **Custom Prompts**: Fine-tune transcription behavior

## Use Cases

You can use it for:
- Quick voice notes
- Transcribing meetings or lectures
- Processing audio files in batch
- Building transcription into your own tools
- Experimenting with Gemini's audio capabilities

## Technical Details

The tool uses:
- `sox` for high-quality audio recording
- Gemini's flash model for fast, cost-effective transcription
- Node.js streams for efficient processing

## Getting Started

Check out the [GitHub repository](https://github.com/autocode2/speech-to-text/) for:
- Full installation instructions
- Detailed API documentation
- Usage examples
- Configuration options

## Future Plans

This is just the beginning - next I want to add realtime transcription.

Try it out and let me know what you think! Feedback and contributions welcome.
