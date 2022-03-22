
module.exports = {
    checkThatMessageHasWordFromSet: function(set, message) {
    let containsWord = false
    set.forEach(spelling =>{
        if (message.content.toLocaleLowerCase().includes(spelling.toLowerCase())) {
            containsWord = true
        }
    })
    return containsWord
  }


}