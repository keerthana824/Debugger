from google.generativeai import configure, list_models

configure(api_key="AIzaSyAfAmPjsSDGMMVxhDCt2RPrQDmNgS2dHsY")  # Replace with your actual API key

models = list_models()
print([m.name for m in models])
