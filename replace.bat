@echo off
del /F "client\src\pages\admin\ProjectsSettings.tsx"
ren "client\src\pages\admin\ProjectsSettings_NEW.tsx" "ProjectsSettings.tsx"
echo Done!
