//////////////////////////////////////////////////////////////////
////////////    Save Procedures
/////////////////////////////////////////////////////////////////

const nonPointResourceButton = function(event) {
  event.preventDefault();
  const resourceType = event.target.value.split(" ")[1].toLowerCase();

  const configObj = {
    resourceType: resourceType,
    resource: pointState[resourceType],
    otherResourceId: pointState[(resourceType==='character' ? 'journey' : 'character')].id
  }
  
  if (!pointState[resourceType].id) {
    saveAPITalk.postNonPointResource.call(configObj, savePointState.assignIds);

  } else {
    saveAPITalk.updateNonPointResource.call(configObj, savePointState.assignIds);
  }
}

////////////////////////////////////////////////////////////////////////////
////       Class for creating configObjs for posting/updating to API
///////////////////////////////////////////////////////////////////////////

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


/////////////////////////////////////////////////////////////////////////////////////////////////////
////       saveAPITalk - functional library for posting and upating to API, defined in save.js
/////////////////////////////////////////////////////////////////////////////////////////////////////

const saveAPITalk = (function() {
  return {
    updatePersistedPoint: function() {
      console.log(this.pointInState.description)
      const configObj = new APIConfigObj('PATCH', {
        description: this.pointInState.description,
        pointNum: this.pointNum,
        cards: this.pointInState.cards
      });
      fetch(`${POINTS}/${this.pointInState.id}`, configObj)
      .then(resp => resp.json())
      .then(obj => {
        indexUtility.popupMessage('Point updated')
      })
    },

    createNewPointUnderResource: function() {
      const configObj = new APIConfigObj('POST', {
        resourceType: this.resourceType,
        resourceId: pointState[this.resourceType].id,
        pointNum: this.pointNum,
        cards: this.pointInState.cards,
        description: this.pointInState.description
      });

      fetch(POINTS, configObj)
      .then(resp => resp.json())
      .then(obj => {
        indexUtility.popupMessage('New point saved')
        this.pointInState.id = obj.id;
      })
    },

    postNonPointResource: function(callback) {
      const pointsWithCards = saveAPITalk.getPointsWithCards.call(this);
      // output of this is akin to 
      // {p1:{...}, p2{...}, p3{...}}

      const configObj = new APIConfigObj('POST', {
        name: this.resource.name,
        cards: pointsWithCards,
        otherResourceId: this.otherResourceId
      });

      fetch(`${BASE_URL}/${this.resourceType}s`, configObj)
      .then(resp => resp.json())
      .then(obj => {
        indexUtility.popupMessage(`${this.resourceType} ${this.resource.name} saved`);
        // status message
        callback.call(Object.assign({}, obj, {resource: this.resourceType}));
      });
    },

    updateNonPointResource: function(callback) {
      const pointsWithCards = saveAPITalk.getPointsWithCards.call(this);
      // pointsWithCards will look like 
      // {p1:{...}, p2{...}, p3{...}}

      const configObj = new APIConfigObj('PATCH', {
        name: this.resource.name,
        cards: pointsWithCards,
        otherResourceId: this.otherResourceId
      });

      fetch(`${BASE_URL}/${this.resourceType}s/${pointState[this.resourceType].id}`, configObj)
      .then(resp => resp.json())
      .then(obj => {
        indexUtility.popupMessage(`${this.resourceType} ${this.resource.name} updated`);
        callback.call(Object.assign({}, obj, {resource: this.resourceType}));
      });
    },
    
    getPointsWithCards: function() {
      const numberOfKeys = (this.resourceType === 'character' ? 4 : 12)
      const pointsKeysWithCards = [...Object.keys(pointState[this.resourceType]).slice(0,numberOfKeys)].filter(a => pointState[this.resourceType][a].cards.length > 0)
      let pointsWithCards = {};
      for (const point of pointsKeysWithCards) {
        Object.assign(pointsWithCards, {[point]: pointState[this.resourceType][point]})
      }
      return pointsWithCards;
    },
  }  
})();


/////////////////////////////////////////////////////////////////////////////////////////////////////
////       savePointState - functional library for updating pointState, defined in save.js
/////////////////////////////////////////////////////////////////////////////////////////////////////

const savePointState = (function() {
  return {
    assignIds: function() {
      pointState[this.resource].id = this.id;
      pointState[this.resource].name = this.name;
      for (const point of this.points) {
        pointState[this.resource][point.querent_ref.split(", ")[0]].id = point.id;
      }

      // NOT SURE RIGHT NOW IF THIS CODE IS HARMFUL -
      // Uncomment if it seems necessary later
      // // on save journey, if there became an associated character, update pointState
      // if (this.hasOwnProperty('character')) {
      //   pointState.character.id = this.character.id;
      // } else if (this.hasOwnProperty('journeys')) {
        
      //   pointState.journey.id = this.journeys.sort(LoadMenuItems.sortUpdatedAt)[0].id;
      // }
    },

    textAreaChange: function() {
      this.addEventListener('change', () => {
        const resourceType = document.querySelector('div.points-menu.container').classList[2];
        const pointNum = document.querySelector('div.points-menu.container').classList[3];
        const pointInState = pointState[resourceType][pointNum];
        pointInState.description = this.value;
        console.log('saved to pointstate')
        console.log(pointInState);
      });
    },

    saveButtonClick: function() {
      this.addEventListener('click', event => {
        event.preventDefault();
    
        const resourceType = document.querySelector('div.points-menu.container').classList[2];
        const pointNum = document.querySelector('div.points-menu.container').classList[3];
        const pointInState = pointState[resourceType][pointNum];
    
        if (pointInState.id) {
          saveAPITalk.updatePersistedPoint.call({
            pointInState: pointInState,
            pointNum: pointNum
          });
        } else if (pointState[resourceType].id) {
          saveAPITalk.createNewPointUnderResource.call({
            pointInState: pointInState,
            resourceType: resourceType,
            pointNum: pointNum
          });
        }
        // document.getElementById('modal').click();
        // 'Save story point' does not save point if resource (Character or Journey) has not been persisted by pressing 'save' button
        // they do, however, save to the global-scope object pointState
      })
    },

  }
})();