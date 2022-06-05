cd ..
cd ..

ng build --configuration=production
git add ./desktop-app/dist && git commit -m "GitHub pages upload"
git subtree push --prefix dist origin gh-pages