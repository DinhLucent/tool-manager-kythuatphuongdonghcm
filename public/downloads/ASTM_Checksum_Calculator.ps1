<#
.SYNOPSIS
    ASTM E1381 / E1394 Checksum Calculator & Frame Verifier for Medical Instruments
    Author: Ho Chi Minh Technical Service Team — Phuong Dong Medical
.DESCRIPTION
    Calculates the 2-character hex checksum (Modulo 256) of an ASTM frame.
    In ASTM E1381, checksum is computed by summing ASCII byte values of all characters
    immediately following STX (0x02) up to and including ETX (0x03) or ETB (0x17),
    modulo 256, formatted as two uppercase hexadecimal characters.
.EXAMPLE
    .\ASTM_Checksum_Calculator.ps1 -Frame "1H|\^&|||Bio-Rad^D100|||||||P|1|20261022"
#>

param (
    [Parameter(Mandatory = $false)]
    [string]$Frame = "1H|\^&|||Bio-Rad^EVOLIS|||||||P|1|20261022"
)

function Get-ASTMChecksum {
    param ([string]$InputText)
    
    $bytes = [System.Text.Encoding]::ASCII.GetBytes($InputText)
    $sum = 0
    foreach ($b in $bytes) {
        $sum = ($sum + $b) % 256
    }
    return ('{0:X2}' -f $sum)
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Phuong Dong Medical — ASTM 1381/1394 Frame Checksum Tool" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Input Frame Payload: " -NoNewline
Write-Host $Frame -ForegroundColor Yellow

$checksum = Get-ASTMChecksum -InputText $Frame
$completeFrame = "<STX>$Frame<ETX>$checksum<CR><LF>"

Write-Host "`nCalculated ASTM Checksum: " -NoNewline
Write-Host $checksum -ForegroundColor Green
Write-Host "Wire Representation:      " -NoNewline
Write-Host $completeFrame -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan
