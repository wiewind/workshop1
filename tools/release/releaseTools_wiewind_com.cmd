@echo off

echo ***************************************
echo ** Translation ...                   **
echo ***************************************
call ..\translator\makeLanguagePackage.cmd



echo ***************************************
echo ** copy files ...                    **
echo ***************************************
set pubdir=wws-%date%
set productname=wiewind_com

if exist products\%pubdir% rd /s/q products\%pubdir%
md products\%pubdir%

md products\%pubdir%\api
md products\%pubdir%\ext6
md products\%pubdir%\resources

copy ..\..\*.* products\%pubdir%\
xcopy ..\..\api products\%pubdir%\api\ /E
xcopy ..\..\resources products\%pubdir%\resources\ /E
xcopy ..\callback\%productname% products\%pubdir%\ /E/Y
del products\%pubdir%\api\tmp\cache\mpdels\*.* /q
del products\%pubdir%\api\tmp\cache\persistent\*.* /q
del products\%pubdir%\api\tmp\logs\*.* /q

xcopy ..\..\ext6 products\%pubdir%\ext6\ /E



echo ***************************************
echo ** build EXTJS ...                   **
echo ***************************************
cd products\%pubdir%\ext6
sencha app build 
cd ..\..\..\

echo ***************************************
echo ** delete ext6 ...                   **
echo ***************************************
move products\%pubdir%\ext6\build\production\WWS products\%pubdir%\WWS
rd /s/q products\%pubdir%\ext6

echo The build process was completed!

echo ***************************************
echo ** The build process was completed!  **
echo ** make zip ...                      **
echo ***************************************
if exist products\%pubdir%.zip del products\%pubdir%.zip
php makezip.php products\%pubdir% products\%pubdir%.zip
rd /s/q products\%pubdir%

echo 
pause