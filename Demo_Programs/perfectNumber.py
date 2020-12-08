import math

def getFactors(value):
    
    list = [1]

    for i in range(2, int(math.sqrt(value // 2)) + 1):
        if value % i == 0:
            list.append(i)
    
    return(list)

def sumList(list):

    total = 0

    for i in range(0, len(list)):
        total = total + list[i]

    return(total)

def printPerfect(num, factorSum):
    if factorSum == num:
        print(num)
    

for num in range(2, 100001):
    factors = getFactors(num)
    factorSum = sumList(factors)
    printPerfect(num, factorSum)