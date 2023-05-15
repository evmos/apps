#!/bin/sh

# Find all subdirectories of the 'apps' and 'packages' folders
subdirs=$(find ./apps ./packages -type d -not -path "*/node_modules/*")

# Loop through each subdirectory and delete any '.next' or 'dist' folders within it
for dir in $subdirs; do
    if [ -d "$dir/.next" ]; then
        rm -rf "$dir/.next"
        echo "$dir/.next removed"
    fi

    if [ -d "$dir/dist" ]; then
        rm -rf "$dir/dist"
        echo "$dir/dist removed"
    fi
done