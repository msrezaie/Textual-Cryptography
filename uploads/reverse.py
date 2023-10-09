import sys

def encrypt(text, key='null'):
    try:
        # Initialize a list called "encrypted" with the input "text" reversed
        encrypted = [text[::-1]]
        # Convert the "encrypted" list into a string and return it
        return ''.join(encrypted)
    except ValueError:
        return "Error!"

def decrypt(text, key):
    # Call the "encrypt" function with the input "text" and "key" and return its output
    decrypted = encrypt(text, key)
    return decrypted

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