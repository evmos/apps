#!/bin/sh

# Find all subdirectories of the 'apps' and 'packages' folders
subdirs=$(find ./apps ./packages -type d -not -path "*/node_modules/*")

delete_dirs=(".next" "dist" ".turbo" "node_modules")
# Loop through each subdirectory and delete any '.next' or 'dist' folders within it
for dir in $subdirs; do
    for delete_dir in ${delete_dirs[@]}; do
        echo "$delete_dir"
        if [ -d "$dir/$delete_dir" ]; then
            rm -rf "$dir/$delete_dir"
            echo "$dir/$delete_dir removed"
        fi
    done
done