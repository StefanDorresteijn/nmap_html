# ports
Welcome to the jank.

### Warning
Do not use this project, it's stupid and it's not going to help you. I'm making it because I'm sick of scrolling through nmap results in my terminal.

### Install
Just clone the project, run `yarn` and you should be done.

Oh, you need nmap of course.

### Adding scans
Run an nmap scan, name it after the IP you're scanning and use the xml output type.

```nmap 127.0.0.1 -sC -sV -vv -oX 127.0.0.1.xml```

Put the xml file into the `public/scans` folder of this project.

### Using the application
Run the application:
```yarn serve```

Then click the hosts link in the top navigation. Then click the host you've scanned.

From there it's all pretty simple.

Please don't use this.

I love you.