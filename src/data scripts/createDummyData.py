
import json

def writeToJSONFile(path, fileName, data):
    filePathNameWExt = './' + path + '/' + fileName + '.json'
    with open(filePathNameWExt, 'w') as fp:
        json.dump(data, fp)






# Example
data = {}
data['week'] = []

# writeToJSONFile('./','file-name',data)
# './' represents the current directory so the directory save-file.py is in
# 'test' is my file name
c = {}
c['scheduled'] = []
c['status'] = False

o = {}
o['scheduled'] = []
o['status'] = True
# for regular schedule: 
# Sunday: 2pm - 1am
# Monday - Thursday: 7am - 1am
# Friday: 7am - 5pm
# Saturday: 10am - 5pm
for i in range(126): 
    if 0 <= i <= 6 or 100 <= i <= 110 or 118 <= i <= 125:
        data['week'].append(c)
    else:
        data['week'].append(o)

print (data)     


writeToJSONFile('./','sched',data)

data = {}
data['week'] = []
# for summer schedule (8am - 6pm M-F, closed on Sat and Sun)
for i in range(126):
    if 0 <= i <= 18 or 29 <= i <= 36 or 47 <= i <= 54 or 65 <= i <= 72 or 83 <= i <= 90 or 101 <= i <= 125:
        data['week'].append(c)
    else:
        data['week'].append(o)

print (data)


writeToJSONFile('./','summer',data)