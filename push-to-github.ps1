# StaffPulse - Quick GitHub Push Script
param(
    [string]$RepoUrl
)

$gitPath = "C:\Users\jisna\AppData\Local\Programs\MinGit\cmd\git.exe"
if (-not (Test-Path $gitPath)) {
    $gitPath = "git"
}

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host " StaffPulse: Push Project to GitHub" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Cyan

if (-not $RepoUrl) {
    Write-Host "Please enter your GitHub repository URL (e.g. https://github.com/your-username/assignment-2-employee-dashboard.git):" -ForegroundColor Yellow
    $RepoUrl = Read-Host "GitHub Repo URL"
}

if (-not $RepoUrl) {
    Write-Host "Error: Repository URL cannot be empty." -ForegroundColor Red
    exit 1
}

Write-Host "`nSetting up remote origin: $RepoUrl..." -ForegroundColor Cyan
& $gitPath remote remove origin 2>$null
& $gitPath remote add origin $RepoUrl

Write-Host "Pushing main branch to GitHub..." -ForegroundColor Cyan
& $gitPath push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Your submission link: $RepoUrl" -ForegroundColor Yellow
} else {
    Write-Host "`n❌ Push failed. Please make sure the repository exists on GitHub and that you have permission to push." -ForegroundColor Red
}
