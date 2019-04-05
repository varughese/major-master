import json
import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate("secret_key.json")
firebase_admin = firebase_admin.initialize_app(cred, {'databaseURL': 'https://major-master-20a62.firebaseio.com/'})
# default_app = firebase_admin.initialize_app(cred)

def to_num(n):
    try:
        return int(n)
    except ValueError:
        return float(n)

def parseCourseList():
    with open('data.json') as json_file:  
        data = json.load(json_file)
        for subject in data:
            index = 0
            for course in data[subject]:
                ref = db.reference("course_list/" + subject + "/"+ str(index))
                temp = {"name": course["className"],"id": course["id"]}
                ref.set(temp)
                index+=1

def parseCourseDescriptions():
    with open('data.json') as json_file:  
        data = json.load(json_file)
        for subject in data:
            for course in data[subject]:
                ref = db.reference("course_descriptions/" + course["id"])
                
                temp_credits = course["credits"]
                if not isinstance(course["credits"], (int, float)):
                    temp_credits = to_num(course["credits"].split()[0])

                temp = {
                    "credits": temp_credits,
                    "department": course["major"],
                    "description": course["description"],
                    "id": course["id"],
                    "prereq": course["prereq"],
                    "title": course["className"]
                }
                ref.set(temp)

parseCourseDescriptions()