# Jeopardy Study App

This app is an easy-to-use program that allows you to create trivia study pages about topics. I built it because I like to watch Jeopardy with my family, and I wanted a means to study common Jeopardy topics that was more interesting and intuitive than typical flashcards. This app lets you make your own Jeopardy study cards for specific topics and easily add or edit facts and delete topic cards.

## Why use Jeopardy Study App?

Traditional study methods like flashcards, rote memorization, and textbook reading can be effective but often lack interactivity and visual appeal. I tried a lot of different ways to study Jeopardy trivia, but I wanted a simple, user-friendly app that I could run on my local machine that looks cool, is super responsive, and is easy to use. I built this app using [TypeScript](https://www.typescriptlang.org/), [React](https://react.dev/), and a simple [Node.js](https://nodejs.org/en) server that allows you to store data for topics, facts, and sources in an easy-to-access JSON file. 

## Setup and Installation

Follow these steps to set up and run the JEOPARDY STUDY APP on your local machine.

### Prerequisites

- Node.js and npm (Node Package Manager): Ensure you have Node.js and npm installed on your computer. You can download them from [https://nodejs.org/](https://nodejs.org/).

### Installation

1. **Clone the Repository**:

   - This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

   - Clone the app repository to your local machine:
     ```
     git clone https://github.com/paulcap510/JeopardyStudy.git
     ```
   - Navigate to the project directory:
     ```
     cd JeopardyStudy
     ```
3. **Install Dependencies**:
   - Install the necessary Node.js dependencies defined in `package.json`:
     ```
     npm install
     ```

4. **Configure the Application**
   - The `topics.json` file contains some sample data for how your data will be saved and accessed in JSON format. Each entry will have a unique id (uuid), a topic name, facts, sources, and an optional category.
  
    
5. **Run the Application**:
   - To use the application, you will need to start the frontend and the backend server. To start the frontend server, run:
     ```
     npm start
     ```
   - The app should now be running on your local server (usually at `http://localhost:3000` or similar).
   - Then, to start the backend server `simpleserver.js` (located in root directory), run:
     ```
     node simpleserver.js
     ```
   - This will start the backend server on port 3001 (you can change this in the server file).

## Available Scripts

In the project directory, you can run the following key scripts:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload if you make edits.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. The build is minified, and the filenames include hashes.

For more information on these scripts, see the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

### Using the App

- Click 'Study' to review your cards and click 'Add Topic' to add a new study card about a new topic
- In 'Add Topic', you can click the 'Add Fact' button to dynamically create a new option for a fact input
- All the facts you input will displayed as list bullet points on the Study cards when you study them
- You can also delete facts and cards by clicking the 'Edit' button on a Study card

### Beta Note

- This app is still in the early stages of development. More features will be added in the near future.