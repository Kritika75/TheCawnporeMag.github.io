# PowerShell script to remove old back buttons and implement new component system

$rootPath = "c:\Users\bikra\code\Github\TheCawnporeMag.github.io"
$pagesPath = Join-Path $rootPath "pages"

# Get all HTML files except the example
$htmlFiles = Get-ChildItem -Path $pagesPath -Filter "*.html" | Where-Object { $_.Name -ne "example-with-component.html" }

foreach ($file in $htmlFiles) {
    Write-Host "Cleaning up $($file.Name)..."
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Remove old back button HTML block (including comments and button)
    $content = $content -replace '(?s)\s*<!--\s*Back Button.*?-->\s*<button[^>]*onclick="history\.back\(\)"[^>]*>.*?</button>\s*', ''
    
    # Remove any remaining inline back buttons
    $content = $content -replace '(?s)<button[^>]*onclick="history\.back\(\)"[^>]*>.*?</button>', ''
    
    # Add component loader to head section (after existing CSS links)
    if ($content -notmatch 'back-button\.css') {
        $headPattern = '(\s*<link rel="stylesheet"[^>]*>\s*)'
        $replacement = '$1<link rel="stylesheet" href="../styles/back-button.css">' + [Environment]::NewLine
        $content = $content -replace $headPattern, $replacement
    }
    
    # Add component loader script before closing body tag
    if ($content -notmatch 'component-loader\.js') {
        $bodyEndPattern = '(\s*</body>)'
        $scriptBlock = @"

    <!-- Back Button Component -->
    <script src="../scripts/component-loader.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            ComponentLoader.loadComponent('back-button');
        });
    </script>
$1
"@
        $content = $content -replace $bodyEndPattern, $scriptBlock
    }
    
    # Save the cleaned content
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}

Write-Host "Old back buttons removed and component system implemented!"
