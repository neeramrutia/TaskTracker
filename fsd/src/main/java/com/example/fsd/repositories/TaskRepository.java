package com.example.fsd.repositories;

import com.example.fsd.entities.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
       Task findById(long id);

       @Query("select t from Task t where t.userId = ?1")
       List<Task> findByUserId(@Param("userId") long userId);
}