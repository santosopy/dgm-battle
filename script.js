const attackBtn = document.querySelector("#attack"),
      specialBtn = document.querySelector("#special"),
      resetBtn = document.querySelector("#reset"),
      message = document.querySelector("#message"),
      battle = document.querySelector(".battle"),
      mons = battle.querySelectorAll(".mons"),
      player = document.querySelector("#player"),
      playerName = player.closest(".mons").querySelector("h6").innerText,
      enemy = document.querySelector("#enemy"),
      enemyName = enemy.closest(".mons").querySelector("h6").innerText,
      loseAll = document.querySelectorAll(".lose")

let playerStamina = 100,
    enemyStamina = 100,
    limit = 0

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

function messageText(text){
    sleep(1000).then(() => {
        message.innerHTML = "<p>"+text+"</p>"
        message.animate({
            transform: [ "translateY(15px)", "translateY(0)" ],
            opacity: [ 0, 1 ], 
            color: [ "#fff", "#000" ] 
        },500)
    })
    sleep(2000).then(() => {
        message.animate({
            transform: [ "translateY(0px)", "translateY(-15px)" ],
            opacity: [ 1, 0 ],
            color: [ "#000", "#fff" ] 
        },500)
    })
    sleep(2500).then(() => {
        message.innerHTML = ""
    })
}

function allAction(special){
    let randNum = Math.floor(Math.random()*6) + 1
    
    enemyStamina = action(enemyStamina, enemyName, special )
    move( player.closest(".mons").querySelector(".object"),20,1500,-300 )

    sleep(1500).then(() => {
        playerStamina = action(playerStamina, playerName, (randNum == 6) ? 20 : 10 )
        move( enemy.closest(".mons").querySelector(".object"),-20,-1500,300 )
    })
}

function action(stamina, who, special){
    let randNum = Math.floor(Math.random()*4) + 1
    
    if(randNum >= 3){
        stamina -= special
        messageText(who+" stamina down "+special+"%")
    }
    else messageText(who+" counter")
    
    return (stamina <= 0) ? 0 : stamina
}

function move(obj,rotate,x,y){
    sleep(1000).then(() => {
        obj.animate({
            transform: [ "rotate("+rotate+"deg)" ]
        },500)
        obj.animate({
            transform: [ "translate("+x+"%,"+y+"%)" ]
        },1000)
    }).then(() => {
        obj.animate({
            transform: [ "rotate(0) translate(0,0)" ]
        },1000)
    })
}

function currentStamina(){
    sleep(2000).then(() => {
        enemy.style.width = enemyStamina+"%"
    })
    sleep(3500).then(() => {
        player.style.width = playerStamina+"%"
    })
}

function over(){
    sleep(4100).then(() => {
        if( enemyStamina == 0 || playerStamina == 0 ){
            mons.forEach( (e,i)=>{
                let width = e.querySelector("div[role=staminabar]").style.width
                if( width == "0%" ){
                    e.querySelector(".lose").style.display = "block"
                    attackBtn.disabled = true
                    specialBtn.disabled = true
                    resetBtn.disabled = false
                    return
                }
            })
        }
        
    })
}

function limitFunc(){
    limit++
    limit > 2 ? specialBtn.disabled = "true" : ""
}

attackBtn.onclick = function(){
    
    // action
    allAction(10)

    // stamina
    currentStamina()
    
    // over
    over()
}

specialBtn.onclick = function(){
    
    // action
    allAction(20)

    // stamina
    currentStamina()
    
    // over
    over()
    
    limitFunc()
    
}

resetBtn.onclick = function(){
    
    playerStamina = 100
    enemyStamina = 100
    attackBtn.disabled = false
    specialBtn.disabled = false
    resetBtn.disabled = true
    currentStamina()
    loseAll.forEach((e)=>{
        e.style.display = "none"
    })
}

