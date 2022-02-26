
def print_in_upper_words(words, letters):
    """prints a list of uppercase words"""
    #for word in words:
    #    if word.startswith("e") or word.startswith("E"):
    #        print(word.upper())
    for word in words:
        printableWord = False
        for letter in letters:
            if word.startswith(letter.upper()) or word.startswith(letter.lower()):
                printableWord = True
        if printableWord:
            print(word.upper())

print_in_upper_words(["Eat","eat","sat","cat"],["E","e","c"])

#Change that function so that it only prints words that start with the letter ‘e’ (either upper or lowercase).

#Make your function more general: you should be able to pass in a set of letters, and it only prints words that start with one of those letters.