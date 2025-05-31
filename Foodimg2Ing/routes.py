from flask import render_template, url_for, flash, redirect, request
from Foodimg2Ing import app
from Foodimg2Ing.output import output
import os


@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/about', methods=['GET'])
def about():
    return render_template('about.html')

@app.route('/', methods=['POST'])
def predict():
    try:
        # Check if it's a sample image selection
        sample_image = request.form.get('sample_image')
        
        if sample_image:
            # Handle sample image
            imagefile_path = os.path.join(app.root_path, 'static', 'images', sample_image)
            img = "images/" + sample_image
            
            print(f"🖼️ Processing sample image: {sample_image}")
            print(f"📁 Sample image path: {imagefile_path}")
            
        else:
            # Handle uploaded file
            imagefile = request.files.get('imagefile')
            
            if not imagefile or imagefile.filename == '':
                flash('No file selected', 'error')
                return redirect(url_for('home'))
            
            # Create the upload directory if it doesn't exist
            upload_dir = os.path.join(app.root_path, 'static', 'images', 'demo_imgs')
            os.makedirs(upload_dir, exist_ok=True)
            
            # Create the full path for the uploaded file
            imagefile_path = os.path.join(upload_dir, imagefile.filename)
            imagefile.save(imagefile_path)
            
            # Create the web-accessible path for the template
            img = "images/demo_imgs/" + imagefile.filename
            
            print(f"📁 Processing uploaded file: {imagefile.filename}")
            print(f"💾 Saved to: {imagefile_path}")
        
        # Generate recipe using AI
        print(f"🤖 Generating recipe for: {imagefile_path}")
        title, ingredients, recipe = output(imagefile_path)
        
        print(f"✅ Recipe generated successfully!")
        print(f"📝 Title: {title}")
        
        return render_template('predict.html', title=title, ingredients=ingredients, recipe=recipe, img=img)
        
    except Exception as e:
        print(f"❌ Error in predict route: {str(e)}")
        flash(f'Error processing image: {str(e)}', 'error')
        return redirect(url_for('home'))

@app.route('/<samplefoodname>')
def predictsample(samplefoodname):
    """Legacy route for sample food prediction - redirects to main route"""
    try:
        imagefile_path = os.path.join(app.root_path, 'static', 'images', str(samplefoodname) + ".jpg")
        img = "images/" + str(samplefoodname) + ".jpg"
        
        print(f"🔗 Legacy sample route accessed: {samplefoodname}")
        
        title, ingredients, recipe = output(imagefile_path)
        return render_template('predict.html', title=title, ingredients=ingredients, recipe=recipe, img=img)
        
    except Exception as e:
        print(f"❌ Error in legacy sample route: {str(e)}")
        flash(f'Error processing sample image: {str(e)}', 'error')
        return redirect(url_for('home'))