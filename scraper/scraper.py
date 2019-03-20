import course

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

def scrape_subject_by_term(term, subj, course):
    classes = []
    try: 
        class_dict = course.get_term_courses(term, subj)

        for course in class_dict.courses:
            current = class_dict[course] 
            classNumber = current.number
            if int(classNumber) >= 2000: continue
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
                elif typ == 'LEC' or typ == "PRA" or typ == "SEM":  
                    if foundLecture: continue 
                    
                    try:
                        extra = section.extra_details
                    except:
                        print(id)
                        raise
                    credits = extra['units']
                    description = extra['description']
                    if 'preq' in extra:
                        
                        prereq.append(extra['preq'])

                    foundLecture = True
                elif typ == "INT" or typ == "IND" or typ == "DIR":
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

def main():
    # data = {}
    # for subject in course.SUBJECTS:
    #     data["subject"] = scrape_subject_by_term("2201", subject, course)

    scrape_subject_by_term("2201", "BIOENG", course)

main()