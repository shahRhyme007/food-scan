# Recipe Generation from Food Images - Usage Guide

## 🍽️ What This Application Does

This is an AI-powered web application that analyzes food images and generates:
- **Recipe Title**: A descriptive name for the dish
- **Ingredients List**: All ingredients needed to make the dish  
- **Cooking Instructions**: Step-by-step recipe to recreate the dish

## 🚀 How to Run the Application

1. **Install Dependencies** (already done):
   ```bash
   pip install -r requirements_simple.txt
   ```

2. **Start the Application**:
   ```bash
   python run.py
   ```

3. **Access the Web Interface**:
   - Open your web browser
   - Go to: `http://127.0.0.1:5000` or `http://localhost:5000`

## 🖥️ How to Use the Web Interface

### Method 1: Upload Your Own Food Image
1. Click on the **"Upload a food image"** button on the homepage
2. Select any food image from your computer (JPG, PNG formats work best)
3. Click **"Upload"** or **"Submit"**
4. Wait approximately 40 seconds for processing
5. View the generated recipe with title, ingredients, and instructions

### Method 2: Try Sample Images
The application comes with pre-loaded sample images you can test:
- **Grilled Beef**: Visit `http://localhost:5000/grilled-beef`
- **Chocolate Cake**: Visit `http://localhost:5000/chocolate-cake`  
- **Burger**: Visit `http://localhost:5000/burger`

## 📁 Project Structure

```
food scan/
├── Foodimg2Ing/                 # Main application directory
│   ├── data/                    # Pre-trained model files
│   │   ├── modelbest.ckpt      # Main PyTorch model (396MB)
│   │   ├── ingr_vocab.pkl      # Ingredients vocabulary
│   │   └── instr_vocab.pkl     # Instructions vocabulary
│   ├── static/                  # Web assets
│   │   ├── images/             # Sample food images
│   │   │   └── demo_imgs/      # Uploaded images storage
│   │   └── css/                # Stylesheets
│   ├── Templates/              # HTML templates
│   ├── modules/                # Deep learning modules
│   ├── utils/                  # Utility functions
│   ├── routes.py              # Flask web routes
│   ├── model.py               # AI model implementation
│   └── output.py              # Recipe generation logic
├── run.py                     # Application entry point
└── requirements_simple.txt   # Python dependencies
```

## 🔧 Technical Details

- **Framework**: Flask (Python web framework)
- **AI Model**: PyTorch-based deep learning model
- **Image Processing**: PIL/Pillow for image handling
- **Model Size**: ~396MB pre-trained model
- **Processing Time**: ~40 seconds per image
- **Supported Formats**: JPG, PNG image files

## 🐛 Troubleshooting

### Common Issues:

1. **"FileNotFoundError" when uploading images**:
   - Fixed! The upload directory is now created automatically

2. **Long processing time**:
   - This is normal - the AI model needs ~40 seconds to analyze images
   - Be patient and don't refresh the page

3. **Model not loading**:
   - Ensure all files in `Foodimg2Ing/data/` are present
   - The model files are quite large (396MB total)

4. **Port already in use**:
   - Stop the current application (Ctrl+C)
   - Try running again, or change the port in `run.py`

## 🎯 Tips for Best Results

1. **Use clear, well-lit food images**
2. **Ensure the food is the main subject of the image**
3. **Avoid images with multiple dishes** (works best with single dishes)
4. **Higher resolution images generally work better**

## 🔄 Stopping the Application

To stop the application:
- Press `Ctrl+C` in the terminal where it's running
- Or close the terminal window

---

**Enjoy generating recipes from your food images! 🍳👨‍🍳** 