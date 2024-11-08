import os
import tkinter as tk
from tkinter import scrolledtext

def run_command():
    # Run a command and get the output
    stream = os.popen('cd C:\\Users\\nebiy\\Desktop\\Email_Automation\\frontend\\EmailAutomation && npm run dev')
    # stream = os.popen('npm run dev')
    # output = stream.read()
    # Display the output in the text area
    # output_text.insert(tk.END, output)

# Create the main window
root = tk.Tk()
root.title("Command Output")

# Create a scrolled text area
output_text = scrolledtext.ScrolledText(root, wrap=tk.WORD, width=80, height=20)
output_text.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)

# Run the command when the program starts
run_command()

# Start the GUI event loop
root.mainloop()