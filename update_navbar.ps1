# PowerShell script to update all pages with common navbar component

$pagesPath = "C:\Users\bikra\code\Github\TheCawnporeMag.github.io\pages"
$htmlFiles = Get-ChildItem -Path $pagesPath -Filter "*.html" | Where-Object { 
    $_.Name -notmatch "(404|test-back-button|example-with-component)\.html$" 
}

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if the file already has navbar component (skip if already updated)
    if ($content -match 'navbar-container.*data-component="navbar"') {
        Write-Host "  -> Already has navbar component, skipping..."
        continue
    }
    
    # Remove existing navbar structure (between progress-container and header1/content)
    $content = $content -replace '(?s)<div class="progress-container">.*?</section>\s*(?=<section class="header1"|<section class="about"|<div|<main)', '<!-- Navbar Component Container -->
    <div id="navbar-container" data-component="navbar"></div>
    '
    
    # Ensure component-loader.js is included
    if ($content -notmatch 'component-loader\.js') {
        $content = $content -replace '(<script src="\.\./scripts/index\.js"></script>)', '<script src="../scripts/component-loader.js"></script>
$1'
    }
    
    # Add navbar component loading script if not present
    if ($content -notmatch 'ComponentLoader\.loadComponent\(.*navbar') {
        # Find existing script that loads back-button and update it
        if ($content -match '(?s)(<script>\s*(?://.*\n\s*)?document\.addEventListener\([^}]+ComponentLoader\.loadComponent\([^}]+\}\);\s*</script>)') {
            $existingScript = $matches[1]
            $newScript = $existingScript -replace '(ComponentLoader\.loadComponent\(.*back-button.*\);)', 'ComponentLoader.loadComponent(''navbar'', ''#navbar-container'');
            $1'
            $content = $content -replace [regex]::Escape($existingScript), $newScript
        } else {
            # Add new script if no existing component loading script found
            $content = $content -replace '(\s*</body>\s*</html>)', '    <script>
        document.addEventListener(''DOMContentLoaded'', function() {
            ComponentLoader.loadComponent(''navbar'', ''#navbar-container'');
            ComponentLoader.loadComponent(''back-button'');
        });
    </script>
$1'
        }
    }
    
    # Write the updated content back to file
    $content | Set-Content -Path $file.FullName -NoNewline
    Write-Host "  -> Updated successfully!"
}

Write-Host "All pages updated with common navbar component!"
