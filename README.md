# TodoApp Web

This is the frontend of todo application, which is built on React + Redux + reactstrap.

## Architecture
This TodoApp is built based on `React`, and chooses `Redux` for state management. For component and style library, it uses `reactstrap`.

For large scale SPA, which uses React, the state mamagement usually uses `Redux thunk` or `Redux saga`. This web app, `Redux thunk` is selected for this scale & complexity of project.

From Redux official document, this is how the state flow:
https://redux.js.org/tutorials/essentials/part-1-overview-concepts
 !["State managment in redux"](assets/redux.gif)

## Setup

Requirements:
* node.js

To run the project:
1. Clone this repo
2. Run `npm install`

The API server host configured in `itemActions.js`:
```js
axios.defaults.baseURL = 'http://127.0.0.1:8000/';
```

To simplify, the frontend uses a todolist to hold all todo items(configured in `itemActions.js`):
```
const todolist_id = "66e6a949a6adb29da224a811";
```

## Running 

Run in local:
`npm run start`

To generate static artifact for deployment:
 `npm run build`

## Features

### 1. Create new todo item
At the beginning, there is no todo items:

!["Empty items"](assets/1-Empty_todo_items.png)

Let's add some items:

!["adding 2nd one"](assets/2-Add_todoitems.png)

Now we have 3 todo items, and their states are in running (in progress).

!["adding 2nd one"](assets/3-Add_3todoitems.png)

### 2. Update todo item
To click the todo item state, mark it as done. For example, I completed the first & second todo items:

!["update 2nd & 3rd to be done"](assets/4-Update_todoitems.png)

### 3. Filter the todo items by state
To click the status fitler, it shows running tasks or completed tasks only.

!["Filter running items"](assets/5-Filter1.png)

!["Filter completed items"](assets/5-Filter2.png)

### 4. Delete todo item
To click the "Clear Selected" button, it only remove checked todo item. For example, select "My third task" and click "Clear Selected" button.

!["Delete selected todo item"](assets/6-Delete_selected.png)

!["Delete selected todo item"](assets/6-Delete_selected2.png)

Then add 4th todo item as Running state, and click "Clear Completed". Only running state items will remain.

!["Delete selected todo item"](assets/6-Delete_completed.png)

!["Delete selected todo item"](assets/6-Delete_completed2.png)

### 5. User can subscribe/follow others' todo list

From the homepage, user can click `Subscribe` to subscribe others' todo list
!["User can subscribe other's todo list"](assets/7-subscribe1.png)

!["User can subscribe other's todo list2"](assets/7-subscribe2.png)

Switch the view by clicking the checkbox `My Subscribed Todos` to show subscribed todo list items. For others' todo items, they cannot be modifed and in readonly mode.

!["User can view other's todo list"](assets/7-subscribe3.png)

This is the underlying DB record - jack subscribed two todolists from other users.
!["Subscription relation in DB"](assets/7-subscribe4.png)

Three new endpoints are added to support the subscription features in backend side.
!["3 new endpoints"](assets/7-subscribe5.png)

#### Feed implementation

In general, the feed system has `Pull` and `Push` pattern.

!["push vs pull"](assets/7-subscribe6.png)

Usually, the Pull and Push Hybrid mode will be used in acutual product to optimize the sytem performance. 

!["hybird mode"](assets/7-subscribe7.png)

For simplicity, the feed feature in this project uses `Pull` pattern. When user view the Feed page, it will query all his/her subscribed todolist and display the todo items from them.


## Demo

This is a recorded demo for above features:
[Demo video](assets/7-demo.mp4)

And this is corresponding API log:
[API request logs](assets/7-api_logs)
