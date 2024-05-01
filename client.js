// Hide elements at the start
window.onload = function() {
    document.getElementById('loading').style.display = 'none'; // Hide loading gif
    document.getElementById('bigCont').style.display = 'none'; // Hide bigCont
    document.getElementById('player-info').style.display = 'none'; // Hide player-info
    document.getElementById('whosTurn').style.display = 'none'; // Hide player-info
    document.getElementById('valueCont').style.display = 'none'; // Hide player-info
};

// Initialize Socket.IO connection
const socket = io();

let name;

// find button event
document.getElementById('find').addEventListener('click',()=>{
    name = document.getElementById('name').value;
    console.log(name)
    document.getElementById('user').innerText = name;
    if(name==null || name===''){
        alert("Enter your name" )
    }else {
        socket.emit('find',{name:name})
        document.getElementById('loading').style.display="block"
    }
})

socket.on('find',(e)=>{
    let allPlayersArray = e.allPlayers;
    console.log(allPlayersArray)


    document.getElementById('userCont').style.display = 'block';
    document.getElementById('oppNameCont').style.display = 'block';
    document.getElementById('valueCont').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('name').style.display = 'none';
    document.getElementById('find').style.display = 'none';
    document.getElementById('enterName').style.display = 'none';
    document.getElementById('bigCont').style.display = 'block';
    document.getElementById('whosTurn').style.display = 'block';
    document.getElementById('whosTurn').innerText = 'X s Turn ';

    let oppName;
    let value;

    const foundObj = allPlayersArray.find(obj=>obj.p1.p1name==`${name}`|| obj.p2.p2name==`${name}`)
    foundObj.p1.p1name==`${name}`? oppName= foundObj.p2.p2name : oppName = foundObj.p1.p1name;
    foundObj.p1.p1name==`${name}`? value= foundObj.p2.p2value : value = foundObj.p1.p1value;

    document.getElementById('oppName').innerText=oppName;
    document.getElementById('value').innerText=value;
});
