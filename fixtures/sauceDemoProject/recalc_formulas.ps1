param(
    [string]$filepath,
    [string]$sheetName = "Sheet1",
    [string]$cellAddress = "A1",
    [string]$key = "Tab"
)

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false

try{
    $workbook= $excel.Workbooks.Open($filepath)

    $worksheet = $workbook.WorkSheets.Item($(sheetName))
    if($worksheet){
        $worksheet.Activate()
        Write-Host "Activated sheet: $sheetName"

        $cell = $worksheet.Range($cellAddress)
        $cell.Select()
        Write-Host "Selected cell: $cellAddress"

        if($key -eq "Tab"){
            $excel.SendKeys("{TAB}")
            Write-Host "Tab key simulated."
        }elseif($key -eq "Enter"){
            $excel.SendKeys("~")
            Write-Host "Enter key simulated."
        } else{
            Write-Warning "Invalid key specified. Use 'Tab' or 'Enter.'"
        }
    } else{
        Write-Warning "Sheet $sheetName not found."
    } finally{
        $workbook.Close($false)
        $excel.Quit()
        [System.Runtime.Interopservices.Marshal] :: ReleaseComObject($excel) | Out-Null
        Write-Host "Excel process released"
    }


}