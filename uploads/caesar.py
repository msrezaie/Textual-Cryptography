import sys
import json

def encrypt(text, key):
    try:
        key = json.loads(key)
        key = key['key1']
        encrypted = []
        # Iterate through each character in the input "text" using a for loop
        for char in text:
            # Check whether the character is an alphabetic character
            if char.isalpha():
                # Determine the ASCII value of the base character (either 'A' or 'a', depending on whether the character is uppercase or lowercase)
                base = ord('A') if char.isupper() else ord('a')
                # Calculate the ASCII value of the encrypted character using the formula (plaintext_character - base_value + key) % 26 + base_value, and add the resulting character to the "encrypted" list
                encrypted.append(chr((ord(char) - base + int(key)) % 26 + base))
            else:
                # If the character is not an alphabetic character, simply add it to the "encrypted" list as is
                encrypted.append(char)
        # Convert the "encrypted" list to a string and return it
        return ''.join(encrypted)
    except ValueError:
        return "Error!"

def decrypt(text, key):
    try:
        key = json.loads(key)
        key = key['key1']
        decrypted = []
        for char in text:
            if char.isalpha():
                base = ord('A') if char.isupper() else ord('a')
                # Calculate the ASCII value of the decrypted character using the formula (ciphertext_character - base_value - key) % 26 + base_value, and add the resulting character to the "decrypted" list
                decrypted.append(chr((ord(char) - base - int(key)) % 26 + base))
            else:
                decrypted.append(char)
        return ''.join(decrypted)
    except ValueError:
        return "Error!"

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