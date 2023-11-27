#!/bin/sh

# Find all subdirectories of the 'apps' and 'packages' folders
subdirs=$(find . -type d -not -path "*/node_modules/*")

delete_dirs=(".next" "dist" ".turbo" "node_modules" "test-results" "playwright-report" ".notion-cache" ".netlify" ".testnet")
# Loop through each subdirectory and delete any '.next' or 'dist' folders within it
for dir in $subdirs; do
    for delete_dir in ${delete_dirs[@]}; do

        if [ -d "$dir/$delete_dir" ]; then
            rm -rf "$dir/$delete_dir"
            echo "$dir/$delete_dir removed"
        fi
    done
done