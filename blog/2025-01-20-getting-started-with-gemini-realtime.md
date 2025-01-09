---
slug: getting-started-with-gemini-realtime
title: How to build a FREE realtime voice assistant with Gemini
image: /blog/2025-01-20/og-image.png
authors: [gingerhendrix]
---

Google's new Gemini 2.0 Flash (experimental) model features an api for building a realtime bidirectional voice assistant.  Since experimental models are free (and Google will not use your data for training if you use a paid account), this is an extremely slept on opportunity to build a realtime voice assistant for free.

<!-- truncate -->

## Gemini Multimodal Live

The realtime api is built with websockets, and is documented [here](https://ai.google.dev/api/multimodal-live).  The api is designed to be used with the new Gemini 2.0 Flash model, which is a multimodal model that can handle text, audio, images and video.

Google haven't yet released a TypeScript library, but they have released a [Next.js example app](https://github.com/google-gemini/multimodal-live-api-web-console) with screensharing and biredirectional voice chat.

If you want to build a production realtime assistant for the web, you probably don't want to use the websocket api directly. To achieve low-latency you will need to host a WebRTC server - I recommend [daily.co](https://www.daily.co/products/gemini/multimodal-live-api/) who provide a platform for building voice assistants, and they partnered with Google for the Gemini Multimodal Live launch.

In this tutorial I'm going to show you how to build a realtime voice assistant with the websockets api.  We're going to build a command-line agent that will run locally, using the websocket API directly is perfect in this use-case since we don't need a WebRTC server in the middle

## Code Examples

I've published all the code examples for this tutorial in a [GitHub repository](https://github.com/autocode2/gemini-realtime/tree/main/apps/gemini-realtime-getting-started).  You need `sox` (specifically the `play` and `record` cli tools).  You can use `degit` to clone just the code examples:

```bash
npx degit autocode2/gemini-realtime/apps/gemini-realtime-getting-started
npm install
```

To run any of the examples, you'll need to set the `GOOGLE_API_KEY` environment variable to your Google API key.

```bash
export GOOGLE_API_KEY=your-api-key
npm run example-1
```

## Available Messages

The client can send the following messages to the server:
- *setup* - configures the model and generation settings (temperature, voice persona etc).
- *clientContent* - sends messages from the user to the model.  These are regular Gemini chat messages and can include system, user, assistant messages and multimodal content.
- *realtimeInput* - stream data to the model.  This can be any mimetype supported by Gemini, including audio, images and video.
- *toolResponse* - respond to a tool call.  Gemini supports tool calling though it's noted in the docs that the tool calling performance is degraded by having to also handle biredirectional audio.

The server can send the following messages to the client:
- *setupComplete* - sent in responce to the setup message.
- *serverContent* - messages from the model to the user.
- *toolCall* - a tool call by the model
- *toolCallCancellation* - a request to cancel an in progress tool call


## Connection and Configuration

First, let's establish a WebSocket connection to Gemini. We'll need to construct the correct URL and send an initial configuration:

```typescript
const HOST = `generativelanguage.googleapis.com`;
const MODEL = "models/gemini-2.0-flash-exp";

function websocketUrl({
  apiKey,
  host = HOST,
}: {
  apiKey: string;
  host?: string;
}) {
  const path = "google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent";
  return `wss://${host}/ws/${path}?key=${apiKey}`;
}

const ws = new WebSocket(websocketUrl({ apiKey }));

// Initial configuration
ws.send(JSON.stringify({
  setup: {
    model: MODEL,
    generation_config: {
      temperature: 0.9,
      candidate_count: 1,
    }
  }
}));
```

You can now run [Example 1](https://github.com/autocode2/gemini-realtime/blob/main/apps/gemini-realtime-getting-started/src/example-1.ts) and you should see the setup complete message in the console.

## Sending Messages

Once connected, we can send messages to Gemini. Messages are structured with roles and parts.  We can use the `turnComplete` flag to signal to the model that the turn is complete and it should generate a response.

```typescript
ws.send(JSON.stringify({
  clientContent: {
    turns: [{
      role: "user",
      parts: [{ text: "Hello! How are you?" }]
    }],
    turnComplete: true
  }
}));
```

You can now run [Example 2](https://github.com/autocode2/gemini-realtime/blob/main/apps/gemini-realtime-getting-started/src/example-2.ts) and you should see that the model responds to your message (with audio messages).

## Receiving Messages

Response from Gemini are sent as `serverContent` messages with the following properties:
- *modelTurn* - the model's response
- *turnComplete* - if the model has finished generating the response
- *interrupted* - Indicates that a client message has interrupted current model generation. If the client is playing out the content in real time, this is a good signal to stop and empty the current playback queue.
- *groundingMetadata* - This is used alongside Google's grounded search tool.


To play the audio response from Gemini we'll use `sox` (`brew install sox` or whatever) to play the audio.  Multimodal Live API supports the following audio formats:
- Input audio format: Raw 16 bit PCM audio at 16kHz little-endian
- Output audio format: Raw 16 bit PCM audio at 24kHz little-endian

```typescript
class AudioPlayer {
  private sox: ChildProcess;

  constructor() {
    this.sox = spawn("play", [
      "-t", "raw",
      "-r", "24k",
      "-e", "signed-integer",
      "-b", "16",
      "-c", "1",
      "-",
    ]);
  }

  play(data: Buffer) {
    this.sox.stdin.write(data);
  }
}
```

Incoming audio is sent as base64 encoded audio data in an `inlineData` part with a mimetype of `audio/pcm;rate=24000`.  To play the audio:

```typescript
if ("serverContent" in message) {
  const parts = message.serverContent?.modelTurn?.parts || [];
  for (const part of parts) {
    if ("inlineData" in part && part.inlineData.mimeType?.startsWith("audio")) {
      const audioData = Buffer.from(part.inlineData.data, "base64");
      audioPlayer.play(audioData);
    }
  }
}
```

You can now run [Example 3](https://github.com/autocode2/gemini-realtime/blob/main/apps/gemini-realtime-getting-started/src/example-3.ts) and you should see be able to hear the model's response.

## Streaming Audio

To stream audio from the microphone we will again use a simple `sox` wrapper.

```typescript
class AudioRecorder {
  private sox: ChildProcess;

  constructor() {
    this.sox = spawn("rec", [
      "-t",
      "raw",
      "-r",
      "16k",
      "-e",
      "signed-integer",
      "-b",
      "16",
      "-c",
      "1",
      "-",
    ]);
  }

  stop() {
    this.sox.kill();
  }

  get stdout() {
    return this.sox.stdout;
  }
}
```

Then we can simply connect the `stdout` of the sox process to send `realtimeInput` messages to Gemini:

```typescript
audioRecorder.stdout?.on("data", (data: Buffer) => {
  ws.send(JSON.stringify({
    realtimeInput: {
      mediaChunks: [{
        mimeType: "audio/pcm;rate=16000",
        data: data.toString("base64")
      }]
    }
  }));
});
```

You can now run [Example 4](https://github.com/autocode2/gemini-realtime/blob/main/apps/gemini-realtime-getting-started/src/example-4.ts) and voila! You have a realtime voice assistant.

## Screen Sharing

The `realtimeInput` message can also be used to share any other media type supported by Gemini.  For example, we can share screen content with Gemini in real-time.

To get the screen content we'll use a simple wrapper around the `node-screenshots` package to take an image on the main monitor every second, then we can stream it to Gemini as an `image/jpeg`:

```typescript
screenshotter.screenshotInterval(1000, (image) => {
  ws.send(JSON.stringify({
    realtimeInput: {
      mediaChunks: [{
        mimeType: "image/jpeg",
        data: image.toJpegSync().toString("base64")
      }]
    }
  }));
});
```

Now run [Example 5](https://github.com/autocode2/gemini-realtime/blob/main/apps/gemini-realtime-getting-started/src/example-5.ts) and you can ask the assistant questions about what's on your screen.

## Tool Calling

Gemini also supports tool calling.  The support for this is quite similar to tool calling with any other LLM.  However, since the API is realtime, the tool calling allows for asynchronous responses and tool call cancellation.  For example, the model might decide to call a tool, and will continue to generate audio and accept further input while waiting for the tool response. The LLM may then decide it no longer needs the tool response and can cancel the tool call.

To use tool calling, we need to declare the tool definitions in the `setup` message.

```typescript
const config = {
  model: MODEL,
  tools: [{
    functionDeclarations: [{
      name: "lookup_weather",
      description: "Get the current weather for a location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The location to get weather for"
          }
        },
        required: ["location"]
      }
    }]
  }]
};
```

Then we have to update our message handler to handle `toolCall` messages and send `toolResponse` messages in response:

```typescript
if ("toolCall" in message) {
  const functionCalls = message.toolCall.functionCalls || [];
  for (const call of functionCalls) {
    if (call.name === "lookup_weather") {
      const weather = getWeather(call.args.location);

      ws.send(JSON.stringify({
        toolResponse: {
          functionResponses: [{
            id: call.id,
            name: "lookup_weather",
            response: weather,
          }],
        },
      }));
    }
  }
}
```

With [Example 6](https://github.com/autocode2/gemini-realtime/blob/main/apps/gemini-realtime-getting-started/src/example-6.ts) now you can ask the assistant about the weather.

## @autocode2/gemini-realtime

I've extracted the boilerplate code for connecting to Gemini and sending and receiving messages into a simple npm package called `@autocode2/gemini-realtime`.  You can install it with `npm install @autocode2/gemini-realtime` and use it like this:

```typescript
import WebSocket from "ws";
import {
  AudioPlayer,
  AudioRecorder,
  Screenshotter,
} from "@autocode2/media-utils";
import { GeminiRealtime, websocketUrl } from "@autocode2/gemini-realtime";

const MODEL = "models/gemini-2.0-flash-exp";
const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("Please set GOOGLE_API_KEY environment variable");
  process.exit(1);
}

class CLI {
  private audioPlayer = new AudioPlayer();
  private audioRecorder = new AudioRecorder();
  private screenshotter = new Screenshotter();
  private gemini: GeminiRealtime;

  constructor({ apiKey }: { apiKey: string }) {
    const ws = new WebSocket(websocketUrl({ apiKey }));
    this.gemini = new GeminiRealtime(ws, {
      model: MODEL,
    });
    this.gemini.on("setupComplete", () => this.onSetupComplete());
    this.gemini.on("audioPart", (data) => this.onAudioMessage(data));
  }

  onSetupComplete() {
    console.log("Setup complete");
    this.gemini.sendMessages({
      messages: [
        {
          role: "user",
          parts: [
            {
              text: "Hello",
            },
          ],
        },
      ],
      turnComplete: true,
    });
    this.audioRecorder.stdout?.on("data", (data) =>
      this.gemini.streamAudio(data),
    );
    this.screenshotter.screenshotInterval(1000, async (image) => {
      this.gemini.streamChunk("image/jpeg", image.toJpegSync());
    });
  }

  onAudioMessage(data: Buffer) {
    this.audioPlayer.play(data);
  }
}

new CLI({ apiKey });
```

## Conclusion

The API is really easy to use, and it's very easy to build a useful assistant just with a good prompt and a few tools.   Next steps (possibly a future blog post) could include:
- adding additional context at the beginning of the conversation to improve the model's performance - particularly a glossary of frequently used terms helps prevent transcription errors.
- extending the conversation length by transcribing the audio and sending it as text at the beginning of each session.
- using the transcription with a supervisor agent to enhance the agents abilities (flash is a small model and we're already asking a lot of it).

Enjoy.
