from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

import os

# updated spreadsheet id
SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
SPREADSHEET_ID = "1syLwYvMkdEYX1jwgHSNjeM4UABr-3NDsBCMKA8emgNY"


def screen_app():

    credentials = None
    if os.path.exists("token.json"):
        credentials = Credentials.from_authorized_user_file("token.json", SCOPES)

    if not credentials or not credentials.valid:
        if credentials and credentials.expired and credentials.refresh_token:
            credentials.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            credentials = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(credentials.to_json())
    
    try:
        service = build("sheets", "v4", credentials=credentials)
        sheets = service.spreadsheets()

        total_rows = sheets.values().get(spreadsheetId=SPREADSHEET_ID, range="Sheet1!A2:")
        result = sheets.values().get(spreadsheetId=SPREADSHEET_ID, range="Sheet1!G2:G8").execute()
        names = sheets.values().get(spreadsheetId=SPREADSHEET_ID, range="Sheet1!A2:A8").execute()
        email = sheets.values().get(spreadsheetId=SPREADSHEET_ID, range="Sheet1!C2:C8").execute()

        print(total_rows)
        # result_values = result.get("values")
        # name_values = names.get("values")
        # email_values = email.get("values")

        interns = []
        # for i in range(len(name_values)):
        #     intern = {"name": name_values[i][0],
        #               "email": email_values[i][0],
        #               "results": result_values[i][0]
        #               }
        #     interns.append(intern)
        
        # print(interns)
        return interns

    except HttpError as error:
        print(error)


if __name__ == "__main__":
    screen_app()
