---
sidebar_position: 1
---

# Intro

Let's discover **auto-code in less than 5 minutes**.

## Installation and Setup

You will need an Anthropic or OpenAI API key to use this tool. They should be exported as environment variables. For example

```bash
export OPENAI_API_KEY="your-api-key"
export ANTROPIC_API_KEY="your-api-key"
```

Then you can run the tool via `npx`:

```base
npx @autocode2/cli@latest --help
```

For brevity, I recommend adding an alias to your shell profile:

```bash
alias ac2="npx @autocode2/cli@latest"
```

Then you can run the tool via `ac2`.  The following examples will assume you have done this.

## Getting Started

Get started by **creating a new app**.  We'll use a simple remix app starter, but you can of course start anything you like.

```bash
npx create-remix@latest --template jacob-ebey/remix-shadcn
cd your-app-name
npm run dev
```

## Generate some code

```bash
ac2 code:run --include "src/**/*.{ts,tsx}" -m sonnet "Replace this initial starter app with a simple todo app"
```

All being well, you should see some output from the LLM and it should have edited the files in your project.

## Chat with the LLM

You can continue the conversation with the LLM by using the `-c` (or `--continue`) flag, or for an interactive chat use the `code:chat` command.

```bash
ac2 code:chat -c -m sonnet
```

