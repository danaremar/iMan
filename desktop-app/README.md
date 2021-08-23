# iMan user application

Project focused on product software management. It's free copyleft software, you can use whatever you want to, but please do NOT distribute this project or sell it. If you want to collaborate, please send me an e-mail.

This project was made in september 2021, but it's growing and I'm adding new submodules like: chat, config, requirements, team, company... If you want to develop some submodule please contact me and contribute the community, we all mates!

Thanks to my friend Andrew for doing the logo!

Technology between this project: Angular, Sprint Boot & Bootstrap (including Icons)



## Desktop

Please modify "src/index.html" with `<base href="./">` and set property `enableElectron: true` in "environment.prod.ts" and "environment.ts"

### Requirements
- NodeJS: v6.14.10
- Server app deployed and put host url in "environment.prod.ts" and "environment.ts".

### Commands
- Install npm: `npm i`
- Run: `ng s --o`



## Web

Please modify "src/index.html" with `<base href="/">` and set property `enableElectron: false` in "environment.prod.ts" and "environment.ts"

### Requirements
- NodeJS: v6.14.10
- Server app deployed and put host url in "environment.prod.ts" and "environment.ts".

### Commands
- Install npm: `npm i`
- Run: `npm run electron`


