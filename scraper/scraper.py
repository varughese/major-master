import course
import pickle
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
        return str(self.id + ": " + self.className)

def serialize_course(obj):
   if isinstance(obj, Course):
       serial = json.dumps(obj.__dict__, sort_keys=True, indent=4)
       return serial
   else:
       raise TypeError ("Type not serializable")

def scrape_subject_by_term(term, subj, course):
    classes = []
    try: 
        class_dict = course.get_term_courses(term, subj)

        for course in class_dict.courses:
            current = class_dict[course] 
            classNumber = current.number
            if int(classNumber[0:4]) >= 2000: continue
            className = current.title
            major = current.subject
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
                elif typ == "LEC" or typ == "PRA" or typ == "SEM" or typ == "CLB" or typ == "CLN" or typ == "WRK" or typ == "CLQ" or typ == "MSM":  
                    if foundLecture: continue 
                    
                    try:
                        extra = section.extra_details
                    except:
                        print(id)
                        raise
                    if extra == None: continue
                    credits = extra['units']
                    description = extra['description']
                    if 'preq' in extra:
                        
                        prereq.append(extra['preq'])

                    foundLecture = True
                elif typ == "INT" or typ == "IND" or typ == "DIR" or typ == "THE":
                    continue
                    #ignore these types
                else:
                    print("diff type error: " + typ + "_" + id)

            classes.append(Course(id,className,major, classNumber, prereq, recitation, credits, description, coreq))
    except Exception as error:
        print(term +":"+subj)
        print(error)
        raise

    return classes

def save_obj(obj, name):
    with open('data/'+ name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)

def load_obj(name):
    with open('data/' + name + '.pkl', 'rb') as f:
        return pickle.load(f)

def main():
    # test_subs = ["CS"]

    data = {}
    for subject in course.undergrad_subjects:
        data[subject] = [course.__dict__ for course in scrape_subject_by_term("2201", subject, course)]

    # data["BIOSC"] = scrape_subject_by_term("2201", "BIOSC", course)

    to_write = json.dumps(data, default=serialize_course, sort_keys=True, indent=4)
    f = open("data.json","w")
    f.write(to_write)
    f.close()

main()