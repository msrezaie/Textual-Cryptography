import sys

def encrypt(text, key='null'):
    result = ""
    try:
        # Iterate through each character in the input "text" using a for loop
        for char in text:
            # Check whether the character is a lowercase letter
            if char.islower():
                # If so, subtract its ASCII value from 219, and add the ASCII value of the resulting number to the "result" variable using the "chr()" function
                result += chr(219 - ord(char))
            # Check whether the character is an uppercase letter
            elif char.isupper():
                # If so, subtract its ASCII value from 155, and add the ASCII value of the resulting number to the "result" variable using the "chr()" function
                result += chr(155 - ord(char))
            # If the character is neither a lowercase nor uppercase letter, simply add it to the "result" variable as is
            else:
                result += char
        return result
    except ValueError:
        return "Error!"

def decrypt(text, key='null'):
    # Call the "encrypt" function with the same "text" and "key" parameters, and return the resulting string
    return encrypt(text, key)

    
if len(sys.argv) < 4:
    print("Usage: python <operation> <arg1> <arg2>")
    sys.exit(1)

operation = sys.argv[1]
message = sys.argv[2]
keys = sys.argv[3]

if operation == "encrypt":
    result = encrypt(message, keys)
elif operation == "decrypt":
    result = decrypt(message, keys)
else:
    print("Invalid operation")
    sys.exit(1)

print(result)