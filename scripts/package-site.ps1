param([Parameter(Mandatory = $true)][string]$OutputPath)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$projectRoot = Split-Path -Parent $PSScriptRoot
$distRoot = (Resolve-Path -LiteralPath (Join-Path $projectRoot 'dist')).Path
if (-not (Test-Path -LiteralPath (Join-Path $distRoot 'index.html'))) { throw 'Build the site before packaging it.' }
$archivePath = [IO.Path]::GetFullPath($OutputPath)
if (Test-Path -LiteralPath $archivePath) { throw 'Choose a new output path; the archive already exists.' }
$archive = [IO.Compression.ZipFile]::Open($archivePath, [IO.Compression.ZipArchiveMode]::Create)
try {
    Get-ChildItem -LiteralPath $distRoot -Recurse -File | ForEach-Object {
        $entryName = [IO.Path]::GetRelativePath($distRoot, $_.FullName).Replace('\', '/')
        [void][IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $_.FullName, $entryName, [IO.Compression.CompressionLevel]::Optimal)
    }
} finally { $archive.Dispose() }
Write-Output $archivePath
