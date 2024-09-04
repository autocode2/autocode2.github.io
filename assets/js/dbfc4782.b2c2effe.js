"use strict";(self.webpackChunkautocode_2_github_io=self.webpackChunkautocode_2_github_io||[]).push([[749],{1895:e=>{e.exports=JSON.parse('{"archive":{"blogPosts":[{"id":"todo-with-more-features","metadata":{"permalink":"/blog/todo-with-more-features","source":"@site/blog/2024-08-14-todo-with-more-features.mdx","title":"Todo with more features","description":"The previous app was too easy for all the models, so I iterated on the prompt until I came up with","date":"2024-08-14T00:00:00.000Z","tags":[],"readingTime":1.01,"hasTruncateMarker":false,"authors":[{"name":"Gareth Andrew","title":"Chief Auto Coder","url":"https://github.com/gingerhendrix","imageURL":"https://github.com/gingerhendrix.png","key":"gingerhendrix"}],"frontMatter":{"slug":"todo-with-more-features","title":"Todo with more features","authors":["gingerhendrix"],"tags":[]},"unlisted":false,"nextItem":{"title":"The React Todo App","permalink":"/blog/introducing-react-todo"}},"content":"The previous app was too easy for all the models, so I iterated on the prompt until I came up with\\n\\n```markdown title=\\"App Prompt\\"\\nBuild a todo app.\\n\\nEach todo item should have the following properties:\\n- content\\n- status (todo, in progress, complete)\\n- due date (optional)\\n- created date, started date (when it was marked as in progress), completed date (when it was marked as complete)\\n- tags (optional)\\n- priority (optional)\\n\\nThe app should have the following features:\\n - You should be able to see the list of todos.\\n - You should be able to add a todo, delete a todo and update a todo.\\n - You should be able to mark a todo as complete.\\n - You should be able to filter the todos by tags, status, priority, due date, including combinations of these filters.\\n - You should be able to sort the todos by due date, created date, started date, completed date, priority, status.\\n - You should be able to search for a todo by content.\\n```\\n\\nClaude-3-5-sonnet mostly doesn\'t break a sweat, though we do have to fix a type error to get a production build.\\n\\n* [View the App](https://autocode2.github.io/autocode-examples/examples/example-todo/blog/2024-08-14-todo-with-more-features/typescript_nextjs_shadcn/sonnet)\\n* [Generated Code](https://github.com/autocode2/example-todo/commit/0057b0233f4042afebd4de82838a7d61552d13e1)\\n* [Manual Fix](https://github.com/autocode2/example-todo/commit/66300288caa28d190f76976ff7fa636d415985d1)"},{"id":"introducing-react-todo","metadata":{"permalink":"/blog/introducing-react-todo","source":"@site/blog/2024-08-01-introducing-react-todo.mdx","title":"The React Todo App","description":"Todo apps are a classic example app, here we\'ll see how a few models fare when trying to implement one in React.","date":"2024-08-01T00:00:00.000Z","tags":[],"readingTime":2.67,"hasTruncateMarker":false,"authors":[{"name":"Gareth Andrew","title":"Chief Auto Coder","url":"https://github.com/gingerhendrix","imageURL":"https://github.com/gingerhendrix.png","key":"gingerhendrix"}],"frontMatter":{"slug":"introducing-react-todo","title":"The React Todo App","authors":["gingerhendrix"],"tags":[]},"unlisted":false,"prevItem":{"title":"Todo with more features","permalink":"/blog/todo-with-more-features"},"nextItem":{"title":"The Rise of Automatic Coding","permalink":"/blog/the-rise-of-automatic-coding"}},"content":"Todo apps are a classic example app, here we\'ll see how a few models fare when trying to implement one in React.\\nThe models we\'re going to use are:\\n* haiku (claude-3-haiku-20240307)\\n* sonnet (claude-3-5-sonnet-20240620)\\n* gpt-4o (gpt-4o-2024-05-13)\\n* gpt-4o-mini (gpt-4o-mini-2024-07-18)\\n\\nWe\'re going to run them through 3 initial scenarios:\\n- Generate a working app from scratch\\n- Generate a working app from a basic template - create-vite-app\\n- Generate a working app from with a stack of typescript, nextjs and tailwindcss.\\n\\n## Prompts\\n\\nThe setup is purposefully simple for this test. We\'ve configured an agent with `create-file`, `replace-file`, and `delete-file` tools and the following tprompt.\\n\\n### Prompts and Model Setup\\n\\n```markdown title=\\"System Prompt\\"\\nYou are an AI coding tool. Help the user with their coding tasks using the tools provided.\\n\\nYou will be given information about the current project in a <Context></Context> element.  This will include the full contents of files in the project, using <File></File> elements.\\n\\nUse the tools to perform the task. Ensure that the content of files is complete and will run as-is.  Do not leave any placeholders or elide the code. Guess sensible defaults if required.\\n\\nYou may call multiple tools in a single response.  You may also call the same tool multiple times. Call all the necessary tools to complete the users request.\\n```\\n\\n### The App Prompt\\n\\n```markdown title=\\"The Prompt\\"\\nBuild a simple react app which a simple todo app.\\n - You should be able to add a todo, delete a todo and update a todo.\\n - You should be able to see a list of todos.\\n - You should be able to mark a todo as complete.\\n - You should be able to filter the todos by complete and incomplete.\\n - You should be able to see the count of complete and incomplete\\n```\\n\\n## Working from scratch\\n\\nFor this test we add the following line to the prompt:\\n\\n```markdown\\nGenerate an index.html and a src/App.js that will run in a browser without any further steps.\\n```\\n### haiku\\n\\n* [Generated Code](https://github.com/autocode2/example-todo/commit/ff728811501645e92030f5b35d43bf75d9a8c0c2)\\n* [View the App](https://autocode2.github.io/autocode-examples/examples/example-todo/blog/2024-08-01-introducing-react-todo/no_context/fixed_haiku/)\\n\\nhaiku doesn\'t quite create runnable code.  The `import` statement for react won\'t work without further configuration, but [after a quick fix](https://github.com/autocode2/example-todo/commit/413546131cf8a736d12003cf017465009b2469b4) the app is usable and satisfies all the requirements but it\'s very ugly.\\n\\n### sonnet\\n\\n* [Generated Code](https://github.com/autocode2/example-todo/commit/83687116cc636f52910ee600eb99963a9bbeb8fe)\\n* [View the App](https://autocode2.github.io/autocode-examples/examples/example-todo/blog/2024-08-01-introducing-react-todo/no_context/sonnet/)\\n\\n### gpt-4o\\n\\n* [Generated Code](https://github.com/autocode2/example-todo/commit/557c13ad910fb39a50cdd4c4ab5f513769ccbd14)\\n* [View the App](https://autocode2.github.io/autocode-examples/examples/example-todo/blog/2024-08-01-introducing-react-todo/no_context/gpt-4o/)\\n\\n### gpt-4o-mini\\n\\n* [Generated Code](https://github.com/autocode2/example-todo/commit/b1f74c6a0a0105b0151a88ef0de93b47b58a454f)\\n* [View the App](https://autocode2.github.io/autocode-examples/examples/example-todo/blog/2024-08-01-introducing-react-todo/no_context/gpt-4o-mini/)\\n\\n## Create Vite App\\n\\n### haiku\\n\\n* [Generated Code](https://github.com/autocode2/example-todo/commit/28b86896d92d930f5012eb4a1965f2c513466c8c)\\n* [View the App](https://autocode2.github.io/autocode-examples/examples/example-todo/blog/2024-08-01-introducing-react-todo/vite_app/haiku)\\n\\n### sonnet\\n\\n* [Generated Code](https://github.com/autocode2/example-todo/commit/010ece34bad7102178657048a0214094cf6a3c7b)\\n* [View the App](https://autocode2.github.io/autocode-examples/examples/example-todo/blog/2024-08-01-introducing-react-todo/vite_app/sonnet)\\n\\n### gpt-4o-mini\\n\\n* [Generated Code](https://github.com/autocode2/example-todo/commit/809649c47a2b6cf861a38ecb2909b598141a4d4f)\\n* [View the App](https://autocode2.github.io/autocode-examples/examples/example-todo/blog/2024-08-01-introducing-react-todo/vite_app/gpt-4o-mini)\\n\\n### gpt-4o\\n\\n* [Generated Code](https://github.com/autocode2/example-todo/commit/e59f03e21bf7b01e50f1891b82553c0e8c6cc6f7)\\n* [View the App](https://autocode2.github.io/autocode-examples/examples/example-todo/blog/2024-08-01-introducing-react-todo/vite_app/gpt-4o)\\n\\n## NextJS, Typescript and TailwindCSS\\n\\n\\n### haiku\\n* [Generated Code](https://github.com/autocode2/example-todo/commit/9db7ce4769cc0a83f8d240e3d8ce0821a7352c3b)\\n* [View the App](https://autocode2.github.io/autocode-examples/examples/example-todo/blog/2024-08-01-introducing-react-todo/typescript_nextjs_shadcn/haiku_use_client_prompt)\\n\\nHaiku initially failed to generate a working app, as it was missing the `\'use client\'` directive from NextJS 13+.\\nAdding the following line to the prompt fixed the issue:\\n```markdown\\nNote. This is a Nextjs 13+ project, so make sure to use the \'use client\' directive appropriately.\\n```\\n\\n### sonnet\\n\\n* [Generated Code](https://github.com/autocode2/example-todo/commit/42a36d5dd5c064ad0b7af480d4d6f4c70ae0e715)\\n* [View the App](https://autocode2.github.io/autocode-examples/examples/example-todo/blog/2024-08-01-introducing-react-todo/typescript_nextjs_shadcn/sonnet)\\n\\n### gpt-4o-mini\\n\\n* [Generated Code](https://github.com/autocode2/example-todo/commit/3538b78e22f4213ebf1721138597851a967f11ae)\\n* [View the App](https://autocode2.github.io/autocode-examples/examples/example-todo/blog/2024-08-01-introducing-react-todo/typescript_nextjs_shadcn/gpt-4o-mini)\\n\\n### gpt-4o\\n\\n* [Generated Code](https://github.com/autocode2/example-todo/commit/a9c387fd1aa244532dd568e77c94cfabf4529372)\\n* [View the App](https://autocode2.github.io/autocode-examples/examples/example-todo/blog/2024-08-01-introducing-react-todo/typescript_nextjs_shadcn/gpt-4o)"},{"id":"the-rise-of-automatic-coding","metadata":{"permalink":"/blog/the-rise-of-automatic-coding","source":"@site/blog/2024-07-18-automatic-coding.mdx","title":"The Rise of Automatic Coding","description":"It\'s pretty clear to anyone paying attention: LLMs can code. This fact is changing how we think about software development.","date":"2024-07-18T00:00:00.000Z","tags":[{"inline":false,"label":"futurology","permalink":"/blog/tags/futurology","description":"prognostications on the future"}],"readingTime":0.925,"hasTruncateMarker":false,"authors":[{"name":"Gareth Andrew","title":"Chief Auto Coder","url":"https://github.com/gingerhendrix","imageURL":"https://github.com/gingerhendrix.png","key":"gingerhendrix"}],"frontMatter":{"slug":"the-rise-of-automatic-coding","title":"The Rise of Automatic Coding","authors":["gingerhendrix"],"tags":["futurology"]},"unlisted":false,"prevItem":{"title":"The React Todo App","permalink":"/blog/introducing-react-todo"}},"content":"It\'s pretty clear to anyone paying attention: LLMs can code. This fact is changing how we think about software development.\\n\\nIn the auto-code project, I\'m exploring just how far we can push LLM coding abilities. I\'ve noticed two main ways AI is being used for coding:\\n\\n1. AI-Assisted Coding: This is where professional developers are heading. Tools like GitHub Copilot, and fancier ones like Cursor and Devin are becoming part of a coder\'s daily life. Even if AI ends up writing most of the code, the human is still in charge.\\n\\n2. Automated Code Generation: This is for everybody, being able to describe a tool, or an app, or a game and have it built for you is immensely useful.  It won\'t replace professionally developed software but it\'s undoubtedly going to be a huge trend in the future (no-code/low-code was already a fast growing sector before it had AI-boosters)\\n\\nThrough this project, I\'m trying to figure out what AI can and can\'t do when it comes to coding. It\'s pretty exciting to think about where this might lead us in the world of software creation."}]}}')}}]);