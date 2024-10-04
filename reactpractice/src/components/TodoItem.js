import React from "react";

function TodoItem() {
    let ListOfTasks = ["Take out the trash", "Get groceries", "Wash the car", " Take the dog for a walk", "Mow the lawn"]

    return (
        <div className="todo-list">
            {ListOfTasks.map((task,index) => (
                <div className="todo-item" key={index}>   
                <input type="checkbox" />
                <ol>{task}</ol>
                </div>
            ))}
        </div>
    );
    
}
export default TodoItem