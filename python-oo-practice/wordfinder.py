"""Word Finder: finds random words from a dictionary."""
from random import choice
""" 
>>> wf = WordFinder("words.txt")
"""
class WordFinder:
    def __init__(self,path):
        self.path = path
        self.words = self.read_in_words()
    def read_in_words(self):
        words = []
        file = open(self.path)
        for line in file:
            words.append(line.strip())
        print(f"{len(words)} words read")
        file.close()
        return words
    def random(self):
        return choice(self.words)

class SpecialWordFinder(WordFinder):
    def __init__(self,path):
        super().__init__(path)
        self.strip_words()
    def strip_words(self):
        #remove comments
        #remove blanks
        self.words = [word for word in self.words if word != ""]
        self.words = [word for word in self.words if word.startswith("#") == False]
        #print(f"{len(self.words)} words after comments and empty strings stripped")
