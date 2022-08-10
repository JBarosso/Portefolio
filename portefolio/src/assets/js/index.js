
var splitFunction = function(type){
  let elem = document.querySelectorAll('.' + type);
  let anims = [];

  for (let i = 0; i < elem.length; i++) {
      anims.push(elem[i]);
  }

  anims.forEach(function(anim){
    let text;

    if (type == "letterAnim"){
      text = anim.textContent.split("");
    }
    if (type == "wordAnim"){
      text = anim.textContent.split(/(\S+\s+)/).filter(function(n) {return n});
    }
    let result = "";
    let count = 10;

    text.forEach(function(char){
      result += (char.trim() === "") ? "" : "<span class=\"splitWrapper\"><span>" + char + "</span></span>";
      count += 1;
    });

    anim.innerHTML = result;
  });
}
