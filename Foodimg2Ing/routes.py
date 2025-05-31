from flask import render_template ,url_for,flash,redirect,request
from Foodimg2Ing import app
from Foodimg2Ing.output import output
import os


@app.route('/',methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/about',methods=['GET'])
def about():
    return render_template('about.html')

@app.route('/',methods=['POST','GET'])
def predict():
    imagefile=request.files['imagefile']
    
    # Create the upload directory if it doesn't exist
    upload_dir = os.path.join(app.root_path, 'static', 'images', 'demo_imgs')
    os.makedirs(upload_dir, exist_ok=True)
    
    # Create the full path for the uploaded file
    image_path = os.path.join(upload_dir, imagefile.filename)
    imagefile.save(image_path)
    
    # Create the web-accessible path for the template
    img = "/images/demo_imgs/" + imagefile.filename
    
    title, ingredients, recipe = output(image_path)
    return render_template('predict.html', title=title, ingredients=ingredients, recipe=recipe, img=img)

@app.route('/<samplefoodname>')
def predictsample(samplefoodname):
    imagefile = os.path.join(app.root_path, 'static', 'images', str(samplefoodname) + ".jpg")
    img = "/images/" + str(samplefoodname) + ".jpg"
    title, ingredients, recipe = output(imagefile)
    return render_template('predict.html', title=title, ingredients=ingredients, recipe=recipe, img=img)