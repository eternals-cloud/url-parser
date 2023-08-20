from datetime import datetime
import subprocess


def executeCommand():
    dateNow = datetime.now().strftime("%Y-%m-%d %H:%M:%S %p")
    command = f'npm run build && git add . && git commit -m "Code Updated On {dateNow}" && git push origin main'
    subprocess.call(command, shell=True)


executeCommand()
input("Press Enter to exit...")
