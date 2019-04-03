import json
import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate("secret_key.json")
firebase_admin = firebase_admin.initialize_app(cred, {'databaseURL': 'https://major-master-20a62.firebaseio.com/'})
# default_app = firebase_admin.initialize_app(cred)

with open('data.json') as json_file:  
    data = json.load(json_file)
    for subject in data:
        index = 0
        for course in data[subject]:
            ref = db.reference("course_list/" + subject + "/"+ str(index))
            temp = {"name": course["className"],"id": course["id"]}
            ref.set(temp)
            index+=1


