# Demo: Copy Sample Images to Gallery

# Untuk testing, Anda bisa copy beberapa gambar dari folder images ke gallery:

# PowerShell Command (copy paste ke PowerShell):

# Copy beberapa gambar sample
Copy-Item "public\images\1.png" -Destination "public\galleryku\sample-work-1.png"
Copy-Item "public\images\2.jpg" -Destination "public\galleryku\sample-work-2.jpg"
Copy-Item "public\images\3.png" -Destination "public\galleryku\sample-work-3.png"

# Atau copy semua gambar sekaligus:
# Get-ChildItem "public\images\*.jpg","public\images\*.png" | ForEach-Object { Copy-Item $_.FullName -Destination "public\galleryku\gallery-$($_.Name)" }

# Setelah copy, refresh browser di http://localhost:5173 dan klik Gallery!
