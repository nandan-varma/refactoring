import type { ModelId } from './models';

// Model configuration
export const DEFAULT_MODEL_ID: ModelId = 'gemini-3-flash-preview';

// UI timing constants (in milliseconds)
export const COPY_FEEDBACK_DURATION_MS = 2000;

// Default empty values
export const EMPTY_STRING = '';
export const EMPTY_ARRAY: never[] = [];

// Refactoring prompt
export const REFACTOR_PROMPT_PREFIX = 'Refactor this code:\n\n';

// Chat/Refactoring status states
export const ChatStatus = {
  READY: 'ready',
  SUBMITTED: 'submitted',
  STREAMING: 'streaming',
  ERROR: 'error',
} as const;

export type ChatStatusType = typeof ChatStatus[keyof typeof ChatStatus];



// App metadata
export const APP_METADATA = {
  TITLE: 'AI Code Refactoring Tool',
  DESCRIPTION: 'Refactor your code using best practices with Gemini AI. Improve code quality, readability, and maintainability instantly.',
  SHORT_DESCRIPTION: 'Refactor your code using best practices with Gemini AI',
  KEYWORDS: ['AI', 'code refactoring', 'Gemini AI', 'code quality', 'developer tools'] as string[],
};

export const SAMPLE_BAD_CODE = `import os, sys, random, math, time

# GLOBAL VARIABLES (bad)
data = []
result = 0
TEMP = 999
x = 42  # magic number
DEBUG = True

class ManagerEverything:
    def __init__(self):
        self.a = []
        self.b = {}
        self.c = 0
        self.name = "SystemManager9000"
        print("Initializing system...")
        time.sleep(0.2)

    # Long method with multiple responsibilities
    def doStuff(self):
        global result
        print("Starting process...")
        
        # Hardcoded file path
        file = "data.txt"

        # No error handling
        f = open(file, "r")
        lines = f.readlines()
        f.close()

        # Duplicate logic
        for line in lines:
            if line.strip() != "":
                data.append(line.strip())

        for line in lines:  # duplicate loop
            if line.strip() != "":
                self.a.append(line.strip())

        # Deep nesting
        for i in range(len(self.a)):
            if len(self.a[i]) > 0:
                if self.a[i][0].isdigit():
                    if int(self.a[i][0]) > 5:
                        if int(self.a[i][0]) < 9:
                            result += int(self.a[i][0]) * 3
                        else:
                            result += 1
                    else:
                        result -= 1
                else:
                    result += 0

        # Magic numbers everywhere
        if result > 100:
            print("Big result!!!")
        elif result < -100:
            print("Very bad result!!!")
        else:
            print("Meh.")

        # Unnecessary complexity
        useless = list(map(lambda x: x * 2, [1,2,3,4,5]))
        for u in useless:
            print(u)

        # Dead code
        if False:
            print("This will never run")

        # Random side effect
        os.system("echo Processed")

        # Poor naming
        q = 0
        for i in range(1000):  # performance issue
            for j in range(1000):
                q += i*j

        self.c = q

        # More mixed concerns
        self.saveToFile()
        self.printSummary()

    def saveToFile(self):
        # Hardcoded path again
        f = open("output.txt", "w")
        f.write(str(result))
        f.close()

    def printSummary(self):
        print("Summary:")
        print("Name:", self.name)
        print("Result:", result)
        print("Internal State:", self.c)


# Procedural code mixed with OOP
def helper():
    global TEMP
    TEMP = random.randint(1,100)
    print("Temp set to:", TEMP)

def helper2():
    global TEMP
    TEMP = random.randint(1,100)
    print("Temp set to:", TEMP)


if __name__ == "__main__":
    m = ManagerEverything()
    helper()
    helper2()  # duplicate logic
    m.doStuff()

    # Random useless computation
    numbers = [random.randint(1, 10) for _ in range(100)]
    total = 0
    for n in numbers:
        total += n

    print("Total:", total)`;