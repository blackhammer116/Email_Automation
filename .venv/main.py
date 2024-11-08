import openpyxl
from openpyxl import Workbook, load_workbook
from flask import Flask, render_template
from flask_mail import Mail, Message
from flask_cors import CORS
import uuid
import os

from pathlib import Path
# from dotenv import load_dotenv

from get_interns_data import get_data


# current_dir = Path(__file__).resolve().parent if "__file__" in locals() else Path.cwd()
# envars = current_dir / ".env"
# load_dotenv(envars)

app = Flask(__name__)
CORS(app)
app.secret_key = str(uuid.uuid4())[:50]
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = ''# Your Email
app.config['MAIL_PASSWORD'] = ''# Your app Password

mail = Mail(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/view_interns')
def ViewInterns():
    """
    A function that returns the Interns data for viewing
    """
    return get_data()

@app.route('/send_email', methods=["POST"])
def SendEmail():
    """
    SendEmail route is tasked with sending email vial flasks mail library
    when the /send_email route is triggerd
    Returns:
        An alert message showing the success
    """
    # interns = get_intern_info()
    try:
        interns = get_data()
        for i in interns:
            # if i["email"] != "test@gmail.com":
            msg = Message('Nova ',
                        sender="Noreply@gmail.com",
                        recipients=[i["email"]])
            #msg.body = f"Dear {i['name']} This email was sent from Ic_labs."
            msg.html = f"""
            <h1>Dear {i['name']} This email was sent from Icog Labs</h1>
            <h3>Your Score for the week is</h3><p>{i['results']}.</p>"""
            mail.send(msg)
            print(msg.body)

        return {"status": True}
    except:
        print("Error sending Email")
        return {"status": False}
 
#test the app by using some valid email
"""
msg = Message('Nova ',
                    sender='NoReply@gmail.com',
                    recipients=[''])
msg.body = f"Dear someone This email was sent from Ic_labs."
msg.html = f"<h1>Your Score for the week is</h1><p>.</p>"
mail.send(msg)
print(msg)
"""
 
 

if __name__ == "__main__":
    app.run( debug=True)
