#!/bin/bash

rm -rf css/ fonts/ js/ img/ 

cd code

npm run build

cd ..

cp -r code/dist/* . 
