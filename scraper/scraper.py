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


# courses_file = open("classes.txt", "w")


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
        if typ == 'REC':
            recitation = True
            continue
        elif typ == 'LEC':  
            if foundLecture: continue 
            
            extra = section.extra_details
            credits = extra['units']
            description = extra['description']
            if 'preq' in extra:
                print(extra['preq'])

            foundLecture = True
        else:
            print("diff type error: " + typ)

# test_course = class_dict['0310']
# test_section_list = test_course.sections
# sect = test_section_list[0].to_dict(extra_details=True)
# for key in sect.items():
#     print(key)

# pprint(cs_section_list)
# print(type(sect._extra))

# for sub in course.SUBJECTS:
#     print(sub)
#     class_dict = course.get_term_courses(term="2201", subject="CS")
#     courses_file.write("------------------\n")
#     courses_file.write(sub)

#     for key, value in class_dict._courses.items():
#         courses_file.write(key + "-" + value.title+"\n")
#     courses_file.write("------------------\n")