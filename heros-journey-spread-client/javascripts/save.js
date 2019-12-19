const nonPointResourceButton = function(event) {
  // check loaded characters if there is a character matching this character
  event.preventDefault();
  // if 
  const resourceType = event.target.value.split(" ")[1].toLowerCase();
  if (pointState[resourceType].id) {
    updateNonPointResource(resourceType);
  } else {
    postNonPointResource(resourceType);
  }
  
  // once saved, update the load menu
  // update the global variable characterId
}

const postNonPointResource = function(string) {
  // post to character if there's any info in points on character
  // if string is journey post to journey
}

const updateNonPointResource = function(string) {

}
