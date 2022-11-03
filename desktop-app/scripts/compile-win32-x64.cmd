cd ..
npm build --configuration=electronjs-prod
npm exec electron-packager . --platform=win32 --arch=x64 --configuration=electronjs-prod --icon=src/favicon.ico