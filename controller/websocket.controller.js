const express = require('express')
const enableWs = require('express-ws');
const calculateDistance = require('../helper/liveLocation_distance');
const app = express();
var clients = {};
enableWs(app)
var clientCounter = 0

//messageType = {"src":"123,234","dest":"34,12"}

//constants
const MESSAGE_FORMAT_ERROR = "Error while parsing the message. Ensure message is in proper format.";
const ADMIN_ID =123456; //must be replaced with proper id

//sample message format
// [{
//     "user_id":"124",
//      "source":"13.031679, 80.214595",
//       "destination":"14.031489, 80.215971",
//       "moving_status":0  
// }]


//websocket handling
exports.liveLocation = (ws, req) => {
    console.log(req);

    const {userToken} = req.query;
    //token handling logic must be implemented here
    const client_id = parseInt(userToken,10);
  
    if (client_id)
    {
      if (client_id == ADMIN_ID)
      {
        clients['admin'] = ws
      }
      else
      {
        clients[client_id + (++clientCounter)] = ws
      }
    }
    //message handling
    ws.on('message', msg => {
        if (!processMessage(msg)){
             ws.send(MESSAGE_FORMAT_ERROR);
        }
    })
}

const handleConnection = ( )=>{
    
}

const processMessage = (msg) => {
    try
    {
        message = JSON.parse(msg);
        user_id = message["user_id"];
        user_coordinates= message["source"].split(",");
        site_coordinates = message["destination"].split(",");     
        moving_status = message["moving_status"];
        distance = calculateDistance(user_coordinates, site_coordinates);
        if (distance > 0.5 && moving_status == 0 )
        {
           message["error"] = "He's moving away";
           clients[user_id].send("Stay Freeze");
        }
        if ( "admin" in clients )
            clients['admin'].send(JSON.stringify(message));        
        return true;  
    }
    catch
    {
        return false;
    }   
}
