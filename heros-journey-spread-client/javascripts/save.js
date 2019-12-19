const apiTalkLibrary = (function() {
  return {
    updatePersistedPoint: function() {
      const configObj = new APIConfigObj('PATCH', {description: this.description});
      fetch(`${SAVE_POINT}/${this.id}`, configObj)
      .then(resp => resp.json())
      .then(obj => {
        console.log('saved description to database')
        console.log(obj)
      })
    },


  }  
})();

class APIConfigObj {
  constructor(method, object) {
    this.method = method;
    this.headers = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
    this.body = JSON.stringify(object);
  }
}

const pointDescSaveToPointState = function(textArea) {
  this.addEventListener('click', event => {
    event.preventDefault();
    const resourceType = document.querySelector('div.points-menu.container').classList[2];
    const pointNum = document.querySelector('div.points-menu.container').classList[3];
    const pointInState = pointState[resourceType][pointNum];
    pointInState.description = textArea.value;
    console.log("saved to pointState")
    console.log(pointState[resourceType])

    if (pointInState.id) {
      apiTalkLibrary.updatePersistedPoint.call(pointInState)
    } else if (pointState[resourceType].id) {
      console.log("new point, same resource")
      // Update parent resource
    }
  })
}

const nonPointResourceButton = function(event) {
  event.preventDefault();
  const resourceType = event.target.value.split(" ")[1].toLowerCase();
  if (pointState[resourceType].id) {
    updateNonPointResource(resourceType);
  } else {
    postNonPointResource(resourceType);
  }
  
  // once saved, update the load menu
}

const postNonPointResource = function(resourceType) {
  // post to character if there's any info in points on character
  // if string is journey post to journey
  const configObj = new APIConfigObj('POST', (pointState[resourceType]));
  fetch(`${BASE_URL}/${resourceType}s`, configObj)
  .then(resp => resp.json())
  .then(obj => console.log(obj));

}

const updateNonPointResource = function(resourceType) {
  const configObj = new APIConfigObj('PATCH', (pointState[resourceType]));
  fetch(`${BASE_URL}/${resourceType}s/${pointState[resourceType].id}`, configObj)
  .then(resp => resp.json())
  .then(obj => console.log(obj));
}
