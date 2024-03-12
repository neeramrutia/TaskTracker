package com.example.fsd.services;

import com.example.fsd.repositories.TaskRepository;
import com.example.fsd.entities.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task saveOrUpdate(Task task) {

        if (task.getStatus() == null) {
            task.setStatus(false);
        }

        return taskRepository.save(task);

    }

    public Iterable<Task> findAll() {
        return taskRepository.findAll();
    }

    public Task findById(long id){
        return taskRepository.findById(id);
    }

    public List<Task> findByUserId(long userId){ return taskRepository.findByUserId(userId); }

    public void delete(long id){
        Task task = findById(id);
        taskRepository.delete(task);
    }
}