# #!/bin/bash
# set -e
# echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"
# rm -rf public
# git clone https://github.com/ks-no/ks-no.github.io.git public

# cd public
# git checkout master
# git pull
# rm -rf *
# cd ..

# # Build the project.
# hugo --cleanDestinationDir 

# # Go To Public 
# cd public

# # Add changes to git.
# git add -A

# # Commit changes.
# msg="rebuilding site `date`"
# if [ $# -eq 1 ]
#   then msg="$1"
# fi
# git commit -m "$msg"

# # Push source and build repos.
# git push origin master

# # Come Back up to the Project Root
# cd ..
