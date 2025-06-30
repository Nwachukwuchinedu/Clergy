import random
system_score = 0
player_score = 0

def Random():
      automated_choice = random.randint(1,3)
      if automated_choice == 1:
          return('System\'s choice is Rock!')
      elif automated_choice == 2:
        return('System\'s choice is Paper!')
      elif automated_choice == 3:
        return('System\'s choice is Scissor!')
                    
def Game():
     while True:
         print('')
         try:
             user_choice = int(input('Enter:\n1 for Rock,\n2 for Paper,\n3 for Scissior.\n\nChoice: '))
             if user_choice == 1:
                 return('Your choice is Rock!')
             elif user_choice == 2:
                 return('Your choice is Paper!')
             elif user_choice == 3:
                 return('Your choice is Scissor!')
             else:
                 print('Invalid Number. Please enter 1,2 or 3')
         except ValueError:
                 print('Error! Input must be a number.')

                    
while True:
    try:
        print('')
        number_of_attempts = int(input('Choose number of Game attempts to begin.\nAttempts = '))
        if number_of_attempts < 1:
            print('Attemtps must be greater than zero!')
        elif number_of_attempts % 2 == 0:
            print('Ensure number of attempt is an odd number to help determine a winner.\nTry Again!')
        else:
            while number_of_attempts:
              
                system_choice = Random()

               
                player_choice = Game()

                print(player_choice)
                print(system_choice)


                if (system_choice == 'System\'s choice is Rock!' and player_choice == 'Your choice is Paper!') or (system_choice == 'System\'s choice is Paper!' and player_choice == 'Your choice is Scissor!') or (system_choice == 'System\'s choice is Scissor!' and player_choice == 'Your choice is Rock!'):
                    player_score += 1
                    print(f'Player\'s score = {player_score} : System\'s score = {system_score}')
                    number_of_attempts -= 1

                elif (system_choice == 'System\'s choice is Rock!' and player_choice == 'Your choice is Rock!') or (system_choice == 'System\'s choice is Paper!' and player_choice == 'Your choice is Paper!') or (system_choice == 'System\'s choice is Scissor!' and player_choice == 'Your choice is Scissor!'):
                    print(f'Player\'s score = {player_score} : System\'s score = {system_score}')
                    number_of_attempts -= 1

                else:
                    system_score += 1
                    print(f'Player\'s score = {player_score} : System\'s score = {system_score}')
                    number_of_attempts -= 1
            break
    except ValueError:
        print('Error! Please ensure your input is a positive integer')

if player_score < system_score:
    print('So sorry😢, You Lose!')
elif player_score > system_score:
    print('Congrats🥂, You Win!')
else:
    print('🤷It\'s a Tie! I guess it was inevitable')
