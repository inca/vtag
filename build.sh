#!/bin/bash

version=0.1

src=./src
target=./dist/vtag-$version.js
target_min=./dist/vtag-$version.min.js

# Uncompressed VTag is built by iterating each .js file inside
# $src in alphabetical order and concatenating their contents.
# The entire file is wrapped in a closure.

echo '(function($) {' > $target

files=`find $src -type f | grep "\.js$"`

for f in $files
do

  echo "Processing $f"
  echo >> $target
  cat $f >> $target
  echo >> $target

done

# Closing the outer closure.
echo '})(jQuery);' >> $target

# Minification through Google Closure Compiler

echo "Minifying..."
java -jar closure-compiler.jar --js=$target --js_output_file=$target_min
echo "Done."

