import React from 'react';

const Todos = props => {
    return (
        <div>
            {props.todos.map(todo => 
                todo.description
            )}
        </div>
    )
}

export default Todos
