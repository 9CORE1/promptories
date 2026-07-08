# Sync-WarehouseImages.ps1
# 이 스크립트는 프롬프트 창고와 LM스타일 창고의 JSON 데이터에서 Base64 이미지를 추출하여 images/ 폴더에 파일로 저장하고 경로를 업데이트합니다.

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
if ([string]::IsNullOrEmpty($scriptPath)) { $scriptPath = Get-Location }

$warehouseFile = Join-Path $scriptPath "warehouse_data.json"
$lmWarehouseFile = Join-Path $scriptPath "lm_warehouse_data.json"
$videoWarehouseFile = Join-Path $scriptPath "video_warehouse_data.json"
$promptsFile = Join-Path $scriptPath "prompts_data.json"
$imagesDir = Join-Path $scriptPath "images"
$checkpointFile = Join-Path $scriptPath "conversion_checkpoint.json"

# images 폴더가 없으면 생성
if (-not (Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir | Out-Null
    Write-Host "Created images directory: $imagesDir" -ForegroundColor Green
}

# 체크포인트 기록 로드
$checkpoint = @{
    lastRun = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
    history = @()
}

if (Test-Path $checkpointFile) {
    try {
        $checkpoint = [System.IO.File]::ReadAllText($checkpointFile, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
    } catch {
        Write-Warning "Failed to parse checkpoint file. Starting fresh."
    }
}

function Convert-Base64ToImage {
    param (
        [string]$jsonFilePath,
        [string]$name
    )

    if (-not (Test-Path $jsonFilePath)) {
        Write-Warning "$name file not found at $jsonFilePath. Skipping."
        return 0
    }

    Write-Host "Processing $name..." -ForegroundColor Cyan
    $jsonContent = [System.IO.File]::ReadAllText($jsonFilePath, [System.Text.Encoding]::UTF8)
    $items = $jsonContent | ConvertFrom-Json

    $convertedCount = 0
    $convertedItems = @()

    foreach ($item in $items) {
        # 이미지 필드가 Base64 데이터 URL 형식인지 확인 (image 또는 outputImage)
        $imgField = $null
        if ($null -ne $item.image -and $item.image -like "data:image/*;base64,*") {
            $imgField = "image"
        } elseif ($null -ne $item.outputImage -and $item.outputImage -like "data:image/*;base64,*") {
            $imgField = "outputImage"
        }

        if ($null -ne $imgField) {
            Write-Host "Found Base64 image in item: $($item.title) ($($item.id))" -ForegroundColor Yellow
            
            # 포맷 및 Base64 원본 추출
            $matches = [regex]::Match($item.$imgField, "data:image/(?<ext>[a-zA-Z+]+);base64,(?<data>.+)")
            if ($matches.Success) {
                $ext = $matches.Groups['ext'].Value
                # jpeg 확장자 통일
                if ($ext -eq "jpeg") { $ext = "jpeg" }
                
                $base64Data = $matches.Groups['data'].Value
                $imageBytes = [System.Convert]::FromBase64String($base64Data)
                
                $fileName = "$($item.id).$ext"
                $filePath = Join-Path $imagesDir $fileName
                
                # 바이너리 파일로 쓰기
                [System.IO.File]::WriteAllBytes($filePath, $imageBytes)
                
                # 이미지 필드를 상대 경로로 업데이트
                $relativePath = "images/$fileName"
                $item.$imgField = $relativePath
                
                $convertedCount++
                $convertedItems += [PSCustomObject]@{
                    id = $item.id
                    title = $item.title
                    filePath = $relativePath
                    timestamp = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
                }
                
                Write-Host "Converted and saved to: $relativePath" -ForegroundColor Green
            } else {
                Write-Error "Failed to parse Base64 data format for item $($item.id)"
            }
        }
    }

    if ($convertedCount -gt 0) {
        # 변경된 JSON 데이터를 다시 저장 (한글 깨짐을 막기 위해 BOM 없는 UTF-8 인코딩)
        # ConvertTo-Json depth를 충분히 주어 객체가 문자열로 축소되는 것 방지
        $updatedJson = ConvertTo-Json -InputObject @($items) -Depth 100
        [System.IO.File]::WriteAllText($jsonFilePath, $updatedJson, [System.Text.Encoding]::UTF8)
        Write-Host "Updated $jsonFilePath with $convertedCount image path(s)." -ForegroundColor Green
    } else {
        Write-Host "No new Base64 images found in $name." -ForegroundColor Gray
    }

    return ,$convertedItems
}

$allConverted = @()

# warehouse_data.json 처리
$whConverted = Convert-Base64ToImage -jsonFilePath $warehouseFile -name "Prompt Warehouse (warehouse_data.json)"
if ($whConverted) { $allConverted += $whConverted }

# video_warehouse_data.json 처리
$vidConverted = Convert-Base64ToImage -jsonFilePath $videoWarehouseFile -name "Video Prompt Warehouse (video_warehouse_data.json)"
if ($vidConverted) { $allConverted += $vidConverted }

# lm_warehouse_data.json 처리
$lmConverted = Convert-Base64ToImage -jsonFilePath $lmWarehouseFile -name "LM Style Warehouse (lm_warehouse_data.json)"
if ($lmConverted) { $allConverted += $lmConverted }

# prompts_data.json 처리
$prConverted = Convert-Base64ToImage -jsonFilePath $promptsFile -name "Prompts Data (prompts_data.json)"
if ($prConverted) { $allConverted += $prConverted }

# 체크포인트 파일 업데이트
if ($allConverted.Count -gt 0) {
    $checkpoint.lastRun = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
    if ($null -eq $checkpoint.history) { $checkpoint.history = @() }
    
    # 히스토리에 병합
    $runRecord = @{
        timestamp = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
        convertedCount = $allConverted.Count
        items = $allConverted
    }
    $checkpoint.history += $runRecord
    
    $checkpointJson = ConvertTo-Json $checkpoint -Depth 100
    [System.IO.File]::WriteAllText($checkpointFile, $checkpointJson, [System.Text.Encoding]::UTF8)
    
    Write-Host "`nSuccessfully processed $($allConverted.Count) total image(s)." -ForegroundColor Green
    Write-Host "Checkpoint log updated at: $checkpointFile" -ForegroundColor Green
} else {
    Write-Host "`nAll images are already in file-based format. No conversion needed." -ForegroundColor Green
}
