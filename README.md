# ChatSphere

ChatSphere is a real-time communication platform allowing users to connect to various chat rooms and share messages instantly without the need for prior authentication. It is designed to be a dynamic and user-friendly platform facilitating smooth interaction among its users. Utilizing WebSocket for real-time communication, React for a reactive user interface, and Node.js with Express for server-side logic, you will build an application that prioritizes speed, ease of use, and accessibility.

## Technologies and Tools:

- WebSocket (socket.io) for enabling real-time communication between clients and the server.
- React for building the client-side user interface.
- Node.js and Express for setting up the server handling WebSocket(socket.io) connections.
- Tailwind for styling the application to ensure an attractive and responsive user experience.

## Development of the Application:

### Initialization:

Set up client and server projects, including the installation of all necessary dependencies.

### Development of the Application:

- **Home Page (/)**: Introduce ChatSphere to users with a brief overview. Includes a button to directly join the chat room if the user wishes to skip customizing their nickname.
- **Nickname Selection Page (/join)**: Allows users to choose a unique nickname before joining the chat room. This adds a level of anonymity and personalization.
- **Chat Room (/chat)**: The main space where users can see real-time messages, send messages, and interact with other participants.

## Database Design:

### Users:

- **Nickname**: Unique string for each user.
- **ID**: Unique identifier for each user session.

### Messages:

- **ID**: Unique identifier for each message.
- **Content**: Text of the message.
- **Author**: Nickname of the user who sent the message.
- **Timestamp**: Timestamp of when the message was sent.

## Reusable UI Components:

Develop components for repetitive UI elements such as form fields, buttons, and note cards. Using TypeScript for these components will ensure their robustness and facilitate maintenance.

## Objective of this Brief:

- Utilize WebSocket (Socket.io) for real-time application development.
- Use React and Tailwind for modern and responsive user interface development.
- Employ Node.js and Express for creating a robust server.
- Implement MongoDB for managing data in NoSQL.
- Develop reusable UI components and deploy web applications for efficient maintenance and scaling.

## Development of the Application:

### Initialization:

Set up client and server projects, including the installation of all necessary dependencies.

### To install dependencies, run:

`npm install`
***or***
`yarn`

### To start the project, run:
`yarn start:project`
***or***
`npm run start:project`