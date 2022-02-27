def three_odd_numbers(nums):
    """Is the sum of any 3 sequential numbers odd?"

        >>> three_odd_numbers([1, 2, 3, 4, 5])
        True

        >>> three_odd_numbers([0, -2, 4, 1, 9, 12, 4, 1, 0])
        True

        >>> three_odd_numbers([5, 2, 1])
        False

        >>> three_odd_numbers([1, 2, 3, 3, 2])
        False
    """
    for num in nums:
        index = nums.index(num)
        if len(nums)-2 == index:
            return False
        sum = nums[index] + nums[index + 1] + nums[index + 2]
        if sum % 2 != 0:
            return True
    return False


