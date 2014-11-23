starter-kit
===========

The boilerplate for new web builds.

Install Instructions
-------------------------

Install [Node.js](http://nodejs.org/download/)

        npm install -g grunt-cli
        npm install -g bower

Getting Started
-------------------------
1. Clone the repo

        cd ~/Sites/your/project/directory
        git clone git@github.com:mightyinthemidwest/starter-kit.git

2. Install dependencies and build files

        npm install
        bower install
        grunt bower
        grunt build

Grunt Commands
-------------------------

* Build - Compile all files

        grunt build

* Default - Compile all files and watches for changes

        grunt

* Minify - Run uglify on JavaScript 

        grunt minify

* Images - Run imagemin on images 

        grunt images

* Make - Compile Handlebars templates

        grunt make

* Move - Copy files to server root `content`

        grunt move