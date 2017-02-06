
Prerequisites
Below are the prerequisites for successfully installation .

HARDWARE
Memory: 4 GB 
Hard disk space: 10 GB 
OS: Linux (Ubuntu )

FREE DISK SPACE
Size of downloaded app is: 50 MB

SOFTWARES
Node v6.x.x : To install node refer this link https://nodejs.org/en/.
Use node -v to know the version of node.
Monogo v3.x

SETUP(zip)
Unzip the MarvelChronologicalOrder.zip
cd MarvelChronologicalOrder
Run "mongo db/createIndexes.js"
Run "node marvel/fetchData.js 
Run "npm start"
Open http://localhost:3000 in browser

SETUP(git)
git clone https://github.com/SinghBhisham/MarvelChronologicalOrder.git
cd MarvelChronologicalOrder
Run "npm install"
Run "mongo db/createIndexes.js"
Run "node marvel/fetchData.js 
cd Client 
Run "npm install"
Run "gulp setup"
cd ..
Run "npm start
Open http://localhost:3000 in browser	
