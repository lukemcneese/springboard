print("hello World")

num = 0

while num <= 100:
    print(num)
    num = num +10
print("all done")

target = 42
guess = None

while guess != target:
    guess = input("please enter a guess...")
    guess = int(guess)
print("all done")