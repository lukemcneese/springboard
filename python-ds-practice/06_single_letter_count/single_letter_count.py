def single_letter_count(word, letter):
    """How many times does letter appear in word (case-insensitively)?
    
        >>> single_letter_count('Hello World', 'h')
        1
        
        >>> single_letter_count('Hello World', 'z')
        0
        
        >>> single_letter_count("Hello World", 'l')
        3
    """
    word = word.lower()
    letter = letter.lower()
    dict = {}
    for l in word:
        if l in dict:
            dict[l] += 1
        else:
            dict[l] = 1
    return dict.get(letter,0)