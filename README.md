## Vuex for everyone (Using a shopping-cart to show how Vuex works)


### Vuex
* Vuex is a state management for Vue;
* It serves a centered data store for all components;
* Vuex store may contains: state, mutations, getters, actions and modules;

*__To update something we need to call a mutations and make commits through a function inside a computed property;__*

__What are Actions?__
* Actions are responsible to trigger a mutation (the logic);
* Actions recieve the context as a param;
* Actions decides when a mutation must be fired;

__*NEVER CHANGE A STATE INSIDE AN ACTION!*__

__Why mutations?__
* Mutations are responsible for the state change;
* Commiting the mutations through actions bring the benefit of tracking the state changes;

__What are Getters?__
* Getters are used as computed properties, they are responsible to show some informations according to the users need.

__*Using Vuex we should never use logic inside a template, the correct thing is to create a function as a getter and call it inside the template (Vuex mapState helper);*__

__MapHelpers:__
* mapHelpers are used to set fuctions directly from the store, for example, we can use a getter by importing the mapGetters and setting it from the store (good practice);
* breaking the store file into others seems to make the proccess of using store easier. for example, we can create an action.js file and put all the actions in there, then import the file inside the index.js (store) and set the actions as actions (shorthand);

__*Using vuex Modules is the best way to keep things organized, we just have to understand how to use it because it uses the rootState to set the global state of the modules;*__

__What about Debugging?__
* Using actions with the same name is not good;
* Remember that when we are using modules we are set into the global state; 
* Namespaced is a module method used to track actions of the files;

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

