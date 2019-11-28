import pygame

pygame.init()

screen = pygame.display.set_mode([500, 600])

running = True
imageNamePrefix = "image--"
currentPageNum = 0
fileExt = ".jpg"
originalImg = ""
resizedImg = ""
flippedImg = ""

def openImg(name):
    # will run until the image is found
    print("Opening: " + fileName)
    gettingImg = True
    while gettingImg:
        # name must have file extension aswell
        try:
            image = pygame.image.load(name)
            gettingImg = False
            return image
        except Exception as e:
            print(e)

def saveImg(img, suffix):
    print("Saving: " + fileName)
    pygame.image.save(img, str(currentPageNum) + suffix + fileExt)

def stylePageNum(curPageNum):
    strNum = str(curPageNum)
    num = ""
    if len(strNum) == 1:
        num = "00" + strNum
    elif len(strNum) == 2:
        num = "0" + strNum
    else:
        num = strNum
    return num

    
def buildLargeImage():
    surfHeight = 0
    surfWidth = 0
    for i in imageSections:
        surfHeight += i.get_height()
        surfWidth += i.get_width()
        
    saveSurface = pygame.Surface([surfWidth/len(imageSections), surfHeight])
    
    imageDistFromTop = 0
    for i in range(len(imageSections)):
        saveSurface.blit(imageSections[i], [0,imageDistFromTop])
        imageDistFromTop += imageSections[i].get_height()
    saveImg(saveSurface, "")

eachImageProgress = 0
imageY = 0
imageSections = []    
try:
    
    while running:    
        for e in pygame.event.get():
            if e.type == pygame.QUIT:
                pygame.quit()
            if e.type == pygame.KEYDOWN:
                if e.key == pygame.K_RIGHT:
                    
                    imageSections.append(originalImg)
                    currentPageNum += 1
                    eachImageProgress += 1
                    imageY = eachImageProgress * 100
                    
                elif e.key == pygame.K_DOWN:
                    imageSections.append(originalImg)
                    currentPageNum += 1
                    screen.fill([0,0,0])
                    imageY = 0
                    eachImageProgress = 0
                    
                    buildLargeImage()
                    
                    imageSections = []
        
        fileName = imageNamePrefix + stylePageNum(currentPageNum) + fileExt         
        originalImg = openImg(fileName)
        displayedImage = pygame.transform.scale(originalImg, (500, 100))
        screen.blit(displayedImage, [0,imageY])
        pygame.display.flip()
        
except Exception as e:
    print(e)
    input()