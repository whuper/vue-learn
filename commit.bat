@echo off
echo Start committing code to the local repository
echo The current directory is:%cd%

echo;
echo;
echo Start identifying the current version of git
echo ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
git --version
echo ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
echo;
echo;

echo Start adding changes
echo ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
git add -A .
echo Perform the end!
echo ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

echo;
echo Submit the changes to the local repository
echo ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
@echo off
set /p var=Please Enter The Comments: 
echo;
echo The Comments you entered is:  %var%
echo;
git commit -m %var%
echo ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

echo Commit the changes to the remote git server
echo ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
git push origin master
echo ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

echo;
echo Done!
echo;

pause
