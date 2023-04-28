# TodoList App

This is a TodoList app built with NextJS, PostgreSQL, Prisma, Sanity, and Apollo GraphQL.

## Features

- Add, edit, and delete tasks
- Mark tasks as completed
- Filter tasks by status (completed or not completed)
- Sort task by alphabetic or created date

## Tech Stack

- NextJS: server-side rendering and handling routing
- PostgreSQL: database to store tasks
- Prisma: ORM for database modeling and query building
- Sanity: headless CMS for storing app configuration and settings
- Apollo GraphQL: client-side data fetching and caching

## Getting Started

1. Clone the repository:
```
$ git clone https://github.com/ereynier/nextjs-todolist.git
```

2. Install dependencies:

```
$ cd nextjs-todolist
$ npm install
```


3. Create a `.env.local` file in the root directory with the following variables:

```DATABASE_URL="postgres://user:password@localhost:5432/todo_list"```


Replace `user` and `password` with your PostgreSQL username and password. Replace `your-sanity-project-id` and `your-sanity-dataset` with your Sanity project ID and dataset name.

4. Create the database and run database migrations:

```
$ npx prisma migrate dev --preview-feature
```


5. Start the development server:
```
$ npm run dev
```


6. Open http://localhost:3000 in your browser to view the app.

## Deployment

To deploy the app to a production server, you can follow these steps:

1. Create a production database and set the `DATABASE_URL` environment variable to its connection string.
2. Build the app:

```
$ npm run build
```


3. Start the app:

```
npm start
```
