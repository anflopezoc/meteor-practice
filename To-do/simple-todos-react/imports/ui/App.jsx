import React, {useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/TasksCollection';
import { Task } from './Task.jsx';
import {TaskForm} from './TaskForm';
const [hideCompleted, setHideCompleted] = useState(false);

const toogleChecked = ({_id, isChecked}) => {
  TasksCollection.update(_id,{
    $set: {
      isChecked: !isChecked
    }
   })
};

const deleteTask = ({_id}) => {
  TasksCollection.remove(_id);
};


export const App = () => {
  const hideCompletedFilter =  {isChecked : { $ne: true }};
  
  const tasks = useTracker(() => 
    TasksCollection.find(hideCompleted ? hideCompletedFilter: {}, {
      sort: { createdAt: -1 }
    }).fetch()
  );


  return(
  <div className='app'>
    <header>
      <div className='app-bar'>
        <div className='app-header'>
          <h1>📝️ Todo APP!</h1>
        </div>
      </div>
    </header>
    <div className='main'>
      <TaskForm/>
      <div className='filter'>
        <button onClick={() => setHideCompleted(!hideCompleted)}>
          {hideCompleted ? 'Show ALL' : 'HideCompleted'}
        </button>
      </div>
      <ul className='tasks'>
        { tasks.map(task => <Task 
          key={ task._id } 
          task={ task } 
          onCheckboxClick={toogleChecked}
          onDeleteClick = {deleteTask}
        />)}
      </ul>
        
    </div>
  </div>
  )
};
