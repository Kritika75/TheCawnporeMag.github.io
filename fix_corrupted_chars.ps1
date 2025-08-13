# PowerShell script to fix all corrupted characters in HTML files

$rootPath = "c:\Users\bikra\code\Github\TheCawnporeMag.github.io"

# Get all HTML files
$htmlFiles = @()
$htmlFiles += Get-ChildItem -Path $rootPath -Filter "*.html"
$htmlFiles += Get-ChildItem -Path (Join-Path $rootPath "pages") -Filter "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Fixing corrupted characters in $($file.Name)..."
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Fix common corrupted characters
    $content = $content -replace 'â†', '←'                    # Left arrow
    $content = $content -replace 'â€™', "'"                   # Right single quotation mark
    $content = $content -replace 'â€œ', '"'                   # Left double quotation mark  
    $content = $content -replace 'â€', '"'                    # Right double quotation mark
    $content = $content -replace 'â€"', '–'                   # En dash
    $content = $content -replace 'â€"', '—'                   # Em dash
    $content = $content -replace 'â„¢', '™'                   # Trademark symbol
    $content = $content -replace 'Â©', '©'                    # Copyright symbol
    $content = $content -replace 'Â®', '®'                    # Registered trademark
    $content = $content -replace 'Â ', ' '                    # Non-breaking space issues
    $content = $content -replace 'ðŸ–‹ï¸', '🖋️'              # Pen emoji
    $content = $content -replace 'ðŸ•Šï¸', '🕊️'              # Dove emoji
    $content = $content -replace 'ðŸŒ', '🌍'                  # Globe emoji
    $content = $content -replace 'â€"', '-'                   # Various dash issues
    
    # Save the updated content with UTF8 encoding
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBom)
}

Write-Host "All corrupted characters have been fixed!"
