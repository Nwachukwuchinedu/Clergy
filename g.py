import random
list_of_item_to_choose = ["scissors", "rock", "paper"]

print("=" * 40)
print("INPUT YOUR NUMBER OF TRIAL")
trial = int(input())


while trial < 0:
    print("=" * 40)
    print('''ENTER YOU GUESS;
            ->rock
            ->papper
            ->scissors
            REMEMBER YOUR INPUT IS CASE SENSISTIVE''')
    my_guess = str(input())
    system_guess = random.random(list_of_item_to_choose)
    