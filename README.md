## Mastery of Champy
Hi everyone ! 
I'm glad to know that someone will be interested in my project. I hope its discovered will be nice for you.

## Who we are
We are a Gold 3 (past season) and are plaing since 5 years.
Hydrafox : 
Josserand Sébastien, a french student who is trying his best to write with a good english.
I coded this project.

Aryaföx :
Allard Julie, my girlfriend. 
I wrote all the code because she is not a programmer. She was the one who showed me this challenge.

While I was working to find how to gather all the LoL API data, she imaginated the website and all the data it contains.

## Installation
You will just have to pull this repository, use the node app.js command line, and enter http://localhost:3000/ in your navigator to test.
Think about adding an API Key in the file Mastery-of-Champy\getData\PlayerData.js line 8
It will be need to let the client log in

## LoL API Gather Data
For this challenge I needed to gather some LoL API data. Then I developped my on tools to do that. It's a simple website with a form and some logs. You will find it in another github project : https://github.com/Hydrafox/Get-LoL-API-Data Can be installed like the Mastery of Champy website. Just need to use http://localhost:3001/

## Architecture
I have 2 project :
Get-LoL-API-Data : Use the Get-LoL-API-Data to gather the data I need
Mastery-of-Champy : Website for the client

They are stored on a github projects. They will be deployed on bluemix to let you preview them when I will have the time to debbug the push.
Mastery-of-Champy hosted in Bluemix : http://mastery-of-champy.eu-gb.mybluemix.net/
Get-LoL-API-Data hosted in Bluemix : http://get-lol-api-data.eu-gb.mybluemix.net/

github is synchronized with bluemix.


## Langages used
- NodeJS
I principally used NodeJS for this development. Althought I'm a better developper with PHP, I needed to learn how nodeJS work. During this project, I tried to learn the most things I could.
It's also a good langage to send some data without loading the page.

- Javascript, JQuery

- HTML, CSS 
Usefull as I wanted the client to be able to see our website.

- Bootstrap 
To have a responsive website

- Graphjs 
This is a librairy which allow me to create a great graph. Very usefull, thanks to them.

- JSon
I wanted to stock all the data I gathered on a database like MongoDB. But I never used this database and I'm new with nodeJS.
If I had more time, it could be a great experience to work with MongoDB.
I finally just gathered the data I needed and stocked it into a json file. Still good as the data are statics.


## Quality of this project
I know this website need a little finishment. But why I still think this is a good project ?
NodeJS permit us to load the page only one time. It will permit us to let easier the communication client-server and then upgrade the project.

I can display the percent of lane the most played in percent (based on the max points by lane).

All the data for all divisions are based on 1000 players.
The graph permit to display all the champions by division and let you know if you master your champion enough.
The idea is to let you think what is the best champion to play if you want to go to the next tier.
You can also read le level of all your champ and compare it.
I added some filter like limit and page, and the division.

It's not finished but I gave some information that depend of the lane you play, the champion, and how to use the data to improve your capacity and reach the next tier.



## Problem still running
- I very had not time enough. We began to work on Monday, two weeks ago and it was very short for us. (moreover, the invitaionnal tournament have began :3)
- The design is not so great, I tried my best but it could be better with some textures.
- It's not a so good responsive website, it work with md and lg bootstrap size screen, but could be better.
- The % Lane under the pseudo seems to bug while rotating.
- The Graph label color is not visible enough.
- The text advice is not full. I very wanted to give more advices. I have data enough, but not time enough to write more content.

## Difficulty in this project
- Time : Even if my girlfriend was very usefull, I was alone to code. I didn't thought the Lol API Gather application would take so much time to create.
- I wanted to learn some new things, and it worked. But it cost me the time I needed to finish our application.
- Tired 

# What I learnt
- Bluemix
- nodeJS
- Github (used with BitBucket)
- Bootstrap (knew a little before)
- GraphJS


If you need more details or need me to make a push with less problems, don't hesitate to let me know. I will be my best to improve this work :)
Thanks to read me.
