# PowerShell script to fix remaining corrupted characters

$rootPath = "c:\Users\bikra\code\Github\TheCawnporeMag.github.io"
$pagesPath = Join-Path $rootPath "pages"

# List of files to fix
$files = @(
    "submission.html",
    "gallery.html", 
    "masthead.html",
    "open-source.html",
    "journey.html"
)

foreach ($fileName in $files) {
    $filePath = Join-Path $pagesPath $fileName
    if (Test-Path $filePath) {
        Write-Host "Fixing $fileName..."
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        # Fix back arrow
        $content = $content -replace 'â† Back', '← Back'
        
        # Fix copyright footer
        $content = $content -replace 'THE CAWNPORE â€" ALL RIGHTS RESERVED', 'THE CAWNPORE — ALL RIGHTS RESERVED'
        
        # Fix apostrophes in masthead
        $content = $content -replace 'Homerâ€™s', "Homer's"
        $content = $content -replace 'â€œAppreciating beauty wherever I stumble upon itâ€', '"Appreciating beauty wherever I stumble upon it"'
        $content = $content -replace 'Sheâ€™s', "She's"
        $content = $content -replace 'Maileâ€™s', "Maile's"
        $content = $content -replace 'Aanandiâ€™s', "Aanandi's"
        $content = $content -replace 'sheâ€™s', "she's"
        
        # Fix emojis in journey.html
        $content = $content -replace 'ðŸ–‹ï¸', '🖋️'
        $content = $content -replace 'ðŸ•Šï¸', '🕊️'
        $content = $content -replace 'ðŸŒ', '🌍'
        
        # Fix en dash
        $content = $content -replace 'â€"', '—'
        
        # Save with UTF8 encoding
        Set-Content -Path $filePath -Value $content -Encoding UTF8
    }
}

Write-Host "All remaining corrupted characters fixed!"
