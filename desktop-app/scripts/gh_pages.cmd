cd ..

ng build --configuration=production
git add dist && git commit -m "GitHub pages upload"
git subtree push --prefix dist origin gh-pages