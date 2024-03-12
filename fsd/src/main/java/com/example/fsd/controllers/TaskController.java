package com.example.fsd.controllers;
import com.example.fsd.services.TaskService;
import jakarta.validation.Valid;
import com.example.fsd.entities.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/task")
@CrossOrigin
public class TaskController {
    @Autowired
    private TaskService taskService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<?> addTask(@Valid @RequestBody Task task,
                                        BindingResult result) {

        if (result.hasErrors()) {

            Map<String, String> errors = new HashMap<>();

            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }

            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        Task newTask = taskService.saveOrUpdate(task);
        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/all/{uId}", method = RequestMethod.GET)
    public ResponseEntity<?> getAllTasks(@PathVariable("uId") long id)
    {
        List<Task> t = taskService.findByUserId(id);
        if (t == null) {
            return new ResponseEntity<>("no task", HttpStatus.OK);
        }
        return new ResponseEntity<>(t, HttpStatus.OK);
    }

    @RequestMapping(value = "/{TaskId}", method = RequestMethod.GET)
    public ResponseEntity<?> getTaskById(@PathVariable("TaskId") long id) {
        Task task = taskService.findById(id);

        if(task == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @RequestMapping(value = "/{TaskId}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteTask(@PathVariable("TaskId") long id){
        taskService.delete(id);
        return new ResponseEntity<>("Task deleted", HttpStatus.OK);
    }
}