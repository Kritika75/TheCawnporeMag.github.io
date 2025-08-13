# PowerShell script to update all pages with simple navbar component

$pagesPath = "C:\Users\bikra\code\Github\TheCawnporeMag.github.io\pages"
$htmlFiles = Get-ChildItem -Path $pagesPath -Filter "*.html" | Where-Object { 
    $_.Name -notmatch "(404|test-back-button|example-with-component)\.html$" 
}

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Update the data-component attribute to use navbar-simple
    $content = $content -replace 'data-component="navbar"', 'data-component="navbar-simple"'
    
    # Update the ComponentLoader call to use navbar-simple
    $content = $content -replace "ComponentLoader\.loadComponent\('navbar'", "ComponentLoader.loadComponent('navbar-simple'"
    
    # Write the updated content back to file
    $content | Set-Content -Path $file.FullName -NoNewline
    Write-Host "  -> Updated to use navbar-simple!"
}

Write-Host "All pages updated with simple navbar component!"
