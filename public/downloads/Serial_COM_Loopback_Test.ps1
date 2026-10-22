<#
.SYNOPSIS
    Serial COM Port Ping & Loopback Verification Utility
    Author: Ho Chi Minh Technical Service Team — Phuong Dong Medical
.DESCRIPTION
    Lists all available COM ports (including Moxa UPort USB-Serial adapters)
    and tests loopback communication on Pin 2 (RxD) and Pin 3 (TxD).
.EXAMPLE
    .\Serial_COM_Loopback_Test.ps1 -PortName "COM3" -BaudRate 9600
#>

param (
    [Parameter(Mandatory = $false)]
    [string]$PortName = "",
    
    [Parameter(Mandatory = $false)]
    [int]$BaudRate = 9600
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  Phuong Dong Medical — Serial COM Port Field Diagnostic" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Enumerate active COM ports
$availablePorts = [System.IO.Ports.SerialPort]::GetPortNames()

if ($availablePorts.Count -eq 0) {
    Write-Host "[WARNING] No serial COM ports detected on this machine!" -ForegroundColor Red
    Write-Host "Please verify that the Moxa UPort adapter or USB-Serial cable is plugged in." -ForegroundColor Yellow
    exit
}

Write-Host "Active Serial Ports Detected:" -ForegroundColor Green
foreach ($port in $availablePorts) {
    Write-Host "  - $port" -ForegroundColor White
}

if (-not $PortName) {
    $PortName = $availablePorts[0]
}

Write-Host "`nTesting Port: $PortName @ $BaudRate bps (8-N-1)..." -ForegroundColor Yellow
Write-Host "(Ensure Pin 2 [Rx] and Pin 3 [Tx] are shorted on the DB9 connector for loopback)" -ForegroundColor Gray

try {
    $sp = New-Object System.IO.Ports.SerialPort $PortName, $BaudRate, 'None', 8, 'One'
    $sp.ReadTimeout = 1000
    $sp.WriteTimeout = 1000
    $sp.Open()

    $testPayload = "PD_MED_LOOPBACK_TEST_$(Get-Random)"
    $sp.WriteLine($testPayload)
    Start-Sleep -Milliseconds 200

    $received = $sp.ReadLine()
    $sp.Close()

    if ($received.Trim() -eq $testPayload) {
        Write-Host "`n[PASS] Loopback test SUCCESSFUL on $PortName!" -ForegroundColor Green
        Write-Host "Transmit: $testPayload" -ForegroundColor Gray
        Write-Host "Received: $received" -ForegroundColor Gray
    } else {
        Write-Host "`n[WARN] Received data does not match payload: $received" -ForegroundColor Yellow
    }
} catch {
    Write-Host "`n[INFO] Port $PortName opened, but no echo received (Loopback plug might not be connected)." -ForegroundColor White
    Write-Host "Details: $_" -ForegroundColor Gray
    if ($sp -and $sp.IsOpen) {
        $sp.Close()
    }
}
Write-Host "==========================================================" -ForegroundColor Cyan
