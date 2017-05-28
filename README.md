# Chat skeleton
--------------------------

A simple realtime chat built on socket.io. No user list. No admins. No logs. Nothing, just messenging.

A good and simple base to start developing your own chat. Babel and webpack already setup, as well as less building via
gulp. jQuery and lodash already built-in. Output should have index.html file, front-end script, css file and server
script.

Chat has simple protection against empty input. Also it has html escaping and /me command support.
That's pretty much all it can do: no authorization, replacements, word filters, admins, avatars, history, nothing.
 
The idea is you should be able to add everything on your own. Any ideas how could I improve the skeleton? Pull requests
and e-mails are welcome!

You can now implement stuff like:

 - user login
 - users list
 - personal messages
 - message logs
 - user authorization / admin access
 - user profiles and avatars
 - server commands for users
 - emoticons and/or markdown support
 - replacements for youtube videos, soundcloud and other stuff

Need something even simpler? There's Socket.io's [demo chat](https://github.com/socketio/chat-example) and an
[article](https://socket.io/get-started/chat/) that explains concepts.

### requirements

 - Node.js 6 or later
 - Modern browsers on client side 
     
### building 

To build less and js of the client - 

    npm run build
    
(this will run gulp task  that will run webpack and less)
    
Or, to watch changes

    npm run watch
    
### run server:
        
    npm start  
     
Chat should be available at localhost:8083


 




     
     