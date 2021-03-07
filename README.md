# Mumbo Jumbo

![World Chatting](assets/worldText128.png)

Mumbo Jumbo is a Google chrome extension which is meant to be used as a tool to supplement language learning. The extension prompts users to create a sentence or phrase which includes some random words from the target language. By doing so, users are exercising their innate conversational skills as opposed to relying on memory or learnt words.


Currently supports French + Spanish + English but the base language is always English.

## Installation

0. Before installing the extension, you must have Node and npm installed. [Install Node+npm](https://nodejs.org/)

1. Download the files from this repository into a directory.

2. From the root folder use the command **npm install** to download the dependencies from package.json.

3. Use the command **npm run build** to create the dist/ folder which is used to bundle the source files.

4. Open a window in your google chrome browser and go to **chrome://extensions**.

5. Toggle on **Developer mode** and then click on the **Load unpacked** button.

6. Select the folder containing all the files from this directory, and voila! the chrome extension in now installed.
