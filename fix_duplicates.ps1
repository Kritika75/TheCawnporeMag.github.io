# PowerShell script to fix duplicate CSS links

$rootPath = "c:\Users\bikra\code\Github\TheCawnporeMag.github.io"
$pagesPath = Join-Path $rootPath "pages"

$htmlFiles = Get-ChildItem -Path $pagesPath -Filter "*.html" | Where-Object { $_.Name -ne "example-with-component.html" }

foreach ($file in $htmlFiles) {
    Write-Host "Fixing duplicates in $($file.Name)..."
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Remove duplicate back-button.css links
    $content = $content -replace '(<link rel="stylesheet" href="\.\./styles/back-button\.css">.*?){2,}', '$1'
    
    # Fix any formatting issues with CSS links
    $content = $content -replace '<link rel="stylesheet" href="\.\./styles/back-button\.css"><link', '<link rel="stylesheet" href="../styles/back-button.css">' + [Environment]::NewLine + '<link'
    
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

Write-Host "Duplicate CSS links fixed!"
