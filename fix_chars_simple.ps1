# PowerShell script to fix corrupted characters in HTML files

$rootPath = "c:\Users\bikra\code\Github\TheCawnporeMag.github.io"

# Get all HTML files
$htmlFiles = @()
$htmlFiles += Get-ChildItem -Path $rootPath -Filter "*.html"
$htmlFiles += Get-ChildItem -Path (Join-Path $rootPath "pages") -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Fixing corrupted characters in $($file.Name)..."
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Fix left arrow (back button)
    $content = $content -replace [char]0x00E2 + [char]0x0086 + [char]0x0090, [char]0x2190
    
    # Fix apostrophes and quotes
    $content = $content -replace [char]0x00E2 + [char]0x0080 + [char]0x0099, [char]0x2019  # right single quote
    $content = $content -replace [char]0x00E2 + [char]0x0080 + [char]0x009C, [char]0x201C  # left double quote
    $content = $content -replace [char]0x00E2 + [char]0x0080 + [char]0x009D, [char]0x201D  # right double quote
    
    # Fix dashes
    $content = $content -replace [char]0x00E2 + [char]0x0080 + [char]0x0093, [char]0x2013  # en dash
    $content = $content -replace [char]0x00E2 + [char]0x0080 + [char]0x0094, [char]0x2014  # em dash
    
    # Save the updated content
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

Write-Host "Corrupted characters fixed!"
