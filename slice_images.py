from PIL import Image
import os

def slice_image(image_path, output_dir, prefix, rows=3, cols=3):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    img = Image.open(image_path)
    width, height = img.size
    cell_width = width // cols
    cell_height = height // rows
    
    count = 1
    for r in range(rows):
        for c in range(cols):
            left = c * cell_width
            top = r * cell_height
            right = left + cell_width
            bottom = top + cell_height
            
            # Crop the cell
            cell = img.crop((left, top, right, bottom))
            
            # Save
            output_filename = f"{prefix}_{count}.png"
            cell.save(os.path.join(output_dir, output_filename))
            print(f"Saved {output_filename}")
            count += 1

# Process Set 1
slice_image(
    '/home/ubuntu/one-year-journal/client/public/images/plant_set_1.png',
    '/home/ubuntu/one-year-journal/client/public/images/plants',
    'set1'
)

# Process Set 2
slice_image(
    '/home/ubuntu/one-year-journal/client/public/images/plant_set_2.png',
    '/home/ubuntu/one-year-journal/client/public/images/plants',
    'set2'
)
