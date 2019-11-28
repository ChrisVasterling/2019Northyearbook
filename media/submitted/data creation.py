import os, json, pygame

def get_date():
    print("Date:")
    date = input()
    return date

def get_event():
    print("Exact Event Name:")
    specific = input()
    print("General Event Name:")
    general = input()
    return [general, specific]
    
def get_names():
    print("People in Photo:")
    names = []
    currentRow = 0
    gettingRows = True
    while gettingRows:
        curRowData = []
        gettingNames = True
        print("Row: " + str(currentRow + 1))
        while gettingNames:
            first = input("First Name: ")
            last = input("Last Name: ")
            name = [first.lower(), last.lower()] # structured like this so it is searchable
            if (name == ["", ""]):
                if (curRowData == []):
                    gettingRows = False
                else:
                    names.append(curRowData)
                gettingNames = False
            else:
                curRowData.append(name)
        currentRow += 1
    return names

def get_notes():
    print("Enter Note: ")
    note = input()
    return note

def openImg(name):
    # will run until the image is found
    print("Opening: " + name)
    gettingImg = True
    while gettingImg:
        # name must have file extension aswell
        try:
            image = pygame.image.load(name)
            gettingImg = False
            return image
        except Exception as e:
            print(e)

def displayImage(imgPath):
    os.system("taskkill /f /im Microsoft.Photos.exe")
    os.system("start " + "\"\"" + " \"" + os.getcwd() + "\\" + imgPath + "\"")


def newResized(raw):
    print("Resizing: Images")
    rawHeight = raw.get_height()
    rawWidth = raw.get_width()
    thumbHeight = 500
    if (rawHeight > rawWidth):
        maxRegWidth = 1440
    elif (rawWidth > rawHeight):
        maxRegWidth = 1920
    else:
        maxRegWidth = 1500
        
    thumbSize = getNewSize(rawWidth, rawHeight, "h", thumbHeight)
    regSize = getNewSize(rawWidth, rawHeight, "w", maxRegWidth)
    print(regSize)
    images = [0, 0] # temporary, data will be pygame images
    
    #thumbnail image
    images[0] = pygame.transform.smoothscale(raw, [int(thumbSize[0]), int(thumbSize[1])])
    # resized Image
    images[1] = pygame.transform.smoothscale(raw, [int(regSize[0]), int(regSize[1])])
    
    return images

def getNewSize(oldW, oldH, WorH, newValue):
    # maintain aspect ratio of old values
    newSize = [oldW, oldH]
    if (WorH.lower() == "w"):
        newSize[0] = int(newValue)
        newSize[1] = int((newValue*oldH)/oldW)
    elif (WorH.lower() == "h"):
        newSize[0] = int((newValue*oldW)/oldH)
        newSize[1] = int(newValue)
    return newSize
    

def saveImg(pgImg, path):
    print("Saving: " + path)
    pygame.image.save(pgImg, path)


def SaveData():
    # gets general data from specific image data and saves all of items
    
    with open('image_data.json', 'w') as f:
        json.dump(image_data, f)
    
    
    
# access all files in the directory containing full res images
# \\folder\\ is where they will be saved
folder = "ecasd"
pics = os.listdir(os.getcwd() + "\\" + folder + "\\full\\")
image_data = {}
'''
general_data = {
    "events" : [],
    "people_info" : [
        [["first", "last"], ["yearbook photos"], ["student photos"], ["ecasd photos"]]
    ]
}
'''

general_data = {}
key = 0


for p in pics:
    imgPath = folder + "\\full\\" + p
    displayImage(imgPath)
    os.system("cls")
    
    print(p)
    pgImgRaw = openImg(imgPath)
    pgImgsRes = newResized(pgImgRaw)
    
    image_data[key] = {
        "fileName" : str(key) + ".jpg",
        "thumbnail" : str(key) + "_thumb.jpg",
        "folder" : folder,
        "date" : get_date(),
        "event" : get_event(),
        "names" : get_names(),
        "notes" : get_notes(),
    }
    print("")
    input("Press ENTER to save and continue")
    
    saveImg(pgImgsRes[0], folder + "\\" + str(key) + "_thumb.jpg")
    saveImg(pgImgsRes[1], folder + "\\" + str(key) + ".jpg")
    
    SaveData()
    
    
    
    key += 1

print("FINISHED!!!!!!!!!!!")
input()