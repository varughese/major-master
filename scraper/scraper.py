import course
from pprint import pprint
import json

class Course:
    def __init__(self, id, className, major, classNumber, prereq, recitation, credit, description, coreq):
        self.id = id
        self.className = className
        self.major = major
        self.classNumber = classNumber
        self.prereq = prereq
        self.recitation = recitation
        self.credits = credit
        self.description = description
        self.coreq = coreq

    def __str__(self):
        return str(self.id)



# courses_file = open("classes.txt", "w")

classes = []
class_dict = course.get_term_courses(term="2201", subject="CS")

for course in class_dict.courses:
    current = class_dict[course]

    className = current.title
    major = current.subject
    classNumber = current.number
    id = major + "" + classNumber
    prereq = []
    recitation = False
    credits = 0
    description = ""
    coreq = []

    foundLecture = False
    for section in current.sections:
        typ = section.section_type
        if typ == 'REC' or typ == 'LAB':
            recitation = True
            continue
        elif typ == 'LEC':  
            if foundLecture: continue 
            
            extra = section.extra_details
            credits = extra['units']
            description = extra['description']
            if 'preq' in extra:
                
                prereq.append(extra['preq'])

            foundLecture = True
        else:
            print("diff type error: " + typ + "_" + id)

    classes.append(Course(id,className,major, classNumber, prereq, recitation, credits, description, coreq))

for clas in classes:
    print(clas)