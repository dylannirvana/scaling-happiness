###New Notes
Previous developer notes at bottom.

My main recommendations are to refactor this into Iron Meteor scaffolding, which I began and can be found at https://github.com/dylannirvana/irongate but need to completed, mainly because in the difficulty in dealing with the legacy code. I have attempted to keep as much of the previous developers work as possible, though some of it is deprecated. The purpose of course would be to encapsulate the code as well to make it more understandable to other developers.

The UI is a huge problem. I would prefer to rebuild it from scratch but my approach was to retrofit as much as I can FIRST, then produce original code. Get the app to work first, then improve it. Until the app is in an MVC pattern I do not think that it will be stable.

###Notes when I first got the project
I am inheriting this app from other developers and tasked with  reverse engineering. Along with addressing some specific concerns of the client and solving those problems as best I can, I will try to make this application easier to understand and navigate for other developers.

The functionality of this application is made visible in the way the CLIENT folder is organized,

albums

dashboard

lib

login

mymusic

playlist

profile

projects

selfies

all show services provided by GKM, though the subfolders seem to reflect structure more than function.

I have included README files throughout the application, that hopefully provide some direction as well as a place for developers to communicate.

Not all the files are sufficiently commented. Some of the API is deprecated. But I am trying to maintain as much of the previous code as possible. Please make comments, especially if your are replacing anything.

I have provided a MIND MAP, that is a drawing of the scaffolding so you can see and understand what is happening here at a glance.

Meteor allows great fluidity in file structure, hence this slightly unorthodox structure works. I have provided an alternative IRON scaffolding and which can be built up in parallel to working on this app. My thinking is that could inform future changes in file structure that can help GKM to be more understandable by other developers, making it workable in a team environment, not to mention sustainable.

###Notes from previous developer:
This project is built with Meteor.js framework, most functionality is broken down by directories
Since the scope was constantly changing, the code may not be organized very well
Froala video upload is in client/lib/froala-video-upload.js
Common modules are in client/dashboard
Design was changed in the middle, so there might be some traces of older templates and CSS
There might be some extra publish methods for the same reason

- @abachuk

###gatekeymusic project

cd into project directory and run `meteor` in your terminal
