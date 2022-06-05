cd ..
cd ..

ng build --configuration=production
git add desktop-app/dist -f && git commit -m "GitHub pages upload"
git subtree push --prefix desktop-app/dist origin gh-pages