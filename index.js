const express = require('express');
const app=express();

//Use an in-memory array to simulate a database for tasks
let tasks = [
    {id: 1, task: 'Learn Node.js'},
    {id: 2, task: 'Build an API'}
];

//Route to get  all the tasks (GET /tasks)
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

//Route to create a new task (POST /tasks)
app.post('/tasks', (req, res) => {
    const newTask = { 
        id: tasks.length + 1,
         task: `New Task ${tasks.length + 1}`}
    tasks.push(newTask);
    res.status(201).json(newTask);
});


//Route to update a task (PUT /tasks/:id)
app.put('/tasks/:id', (req,res) => {
    const taskId = parseInt(req.params.id);
    const task= tasks.find(t => t.id === taskId);

    if(task){
        task.task= `Updated Task ${taskId}`;
        res.json(task);
    } else{
        res.status(404).json({error: 'Task not found'})
    }
});

//Route to delete a task (DELETE /tasks/:id)
app.delete('/tasks/:id', (req, res) => {
    const taskId= parseInt(req.params.id);
    const task= tasks.filter(t=> t.id!== taskId);

    res.json({message: 'Task deleted'});
});

//Set the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});