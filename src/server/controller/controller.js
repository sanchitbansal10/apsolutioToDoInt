const mongoose = require('mongoose');
const todos = require('../models/ToDo');


let fetchListFromDatabase = function(req, res){
    console.log('appload called')
    todos.findOne({}, function(err, toDoObject){
        if(err){
            console.log('there was errro')
        }
        res.send(toDoObject)
    })
}

let updateDatabase = (req, res) => {
    console.log(req.body)
    todos.findOneAndUpdate({}, {$set:{toDo:req.body.toDoObject}}, function(err,data){
        if(err){
            console.log('error updating database')
        }
        res.send(data)
    })
}



/* let updateDatabase = (updatedListArray) => {
    updatedListArray.forEach((singleList)=>{
        List.findOneAndUpdate(
            {listName: singleList.listName},
            {listName: singleList.listName, toDos:singleList.toDos},
            {new: true, upsert: true}),
            (err, data)=>{
            if(err){
                console.log('could not update')
            }
            console.log(data)
            }
    })
}
//this function updates the List objects whose value is changed and also create new if not already there
//upsert:true makes the object if it doesnot exist....new:true returns the updated listitem as data


let deleteListFromDatabase = (deleteListNameArray) => {
    deleteListNameArray.forEach((singleListName) => {
        List.remove({name: singleListName}, (err,data) => {
            if(err){
                console.log('could not remove')
            }
            console.log(data)
        })
    })
}
//this function takes the Array of list Name to be deleted

let callOnUnload = (req, res) => {
    this.updateDatabase(updatedListArray)
    this.deleteListFromDatabase(deleteListNameArray)
}

/* this is the higher level function which is called when the user closes the app, it will update the database for following three workers
 for the list whose value have been changed 
 for the list which have been newly created
 for the lists that are removed */

module.exports = {updateDatabase, fetchListFromDatabase}