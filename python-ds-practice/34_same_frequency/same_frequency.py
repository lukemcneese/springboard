def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    num_1_dict = {}
    num_2_dict = {}

    for num in str(num1):
        num_1_dict[num] = num_1_dict.get(num,0)+1
    for num in str(num2):
        num_2_dict[num] = num_2_dict.get(num,0)+1


    return num_1_dict == num_2_dict