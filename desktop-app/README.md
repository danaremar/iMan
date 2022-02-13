
# iMan user application

  

Project focused on product software management. It's free copyleft software, you can use whatever you want to, but please do NOT distribute this project or sell it. If you want to collaborate, please send me an e-mail.

  

This project was made in september 2021, but it's growing and I'm adding new submodules like: chat, config, requirements, team, company... If you want to develop some submodule please contact me and contribute the community, we all mates!

  

Thanks to my friend Andrew for doing the logo!

  

Technology between this project: Angular, Sprint Boot & Bootstrap (including Icons)

  
  
## Requirements

- NodeJS: v6.14.10
- Install npm: `npm i`


## Start

### Web
- Run: `ng s --o`

### Desktop
- Run: `npm run electron`
- Compile for Windows x64: `npm exec electron-packager . --platform=win32 --arch=x64 --configuration=electronjs-prod --icon=src/favicon.ico` (delete src and node_modules inside to optimize space)

## Structure
- ***dist***: compiled web resources
- ***links/Swagger-UI.url***: view Swagger API documentation
- ***src***: source code
-- ***main.ts***: load modules and production mode
-- ***index.html***: initial HTML in web
-- ***index-electron.html***: initial HTML in electron, contains other route
-- ***styles.css***: general customized bootstrap styles (applies for all CSS elements in application)
-- ***environment***: configure settings to run (electron & production)
-- ***app***: contains all customized modules
- ***main.js***: loads electron view
- ***angular.json***: angular configuration (to start, select environment...)
- ***package.json***: configure dependencies