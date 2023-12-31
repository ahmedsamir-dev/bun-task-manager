import { describe, expect, it } from "bun:test";
import app from "../index";

const baseUrl = `${app.elysia.server?.hostname}:${app.elysia.server?.port}/api/v1/tasks/`;

describe("Get All Tasks", () => {
  it("should return a response with tasks and pagination", async () => {
    const request = new Request(`${baseUrl}?page=1&limit=10`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await app.elysia.fetch(request);
    expect(response.status).toEqual(200);

    const data: any = await response.json();
    expect(data).toHaveProperty("tasks");
    expect(data).toHaveProperty("pagination");
    expect(data.tasks).toBeInstanceOf(Array);
    expect(data.pagination).toHaveProperty("limit", 10);
    expect(data.pagination).toHaveProperty("page", 1);

    console.log(data);
  });
});

describe("Get Task by ID", () => {
  it("should return a response with a single task", async () => {
    // Assuming you have a valid task ID
    const taskId = "6591e508c7235e4b230d784f";

    const request = new Request(`${baseUrl}${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await app.elysia.fetch(request);
    expect(response.status).toEqual(200);

    const data: any = await response.json();
    expect(data).toHaveProperty("task");

    expect(data.task).toBeInstanceOf(Object);
    expect(data.task).toHaveProperty("_id", taskId);
    expect(data.task).toHaveProperty("title");
    expect(data.task).toHaveProperty("description");
    expect(data.task).toHaveProperty("completed");
    expect(data.task).toHaveProperty("dueDate");
    expect(data.task).toHaveProperty("createdAt");
    expect(data.task).toHaveProperty("updatedAt");
  });

  it("should return a 404 error if the task is not found", async () => {
    // non valid task ID
    const taskId = "6591c9f35e214bee999a9e57";
    const request = new Request(`${baseUrl}${taskId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await app.elysia.fetch(request);
    expect(response.status).toEqual(404);
  });
});

describe("Create Task", () => {
  it("should create a new task", async () => {
    const task = {
      title: "Test Task",
      description: "This is a test task",
      dueDate: "2022-01-01",
    };

    const request = new Request(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const response = await app.elysia.fetch(request);
    expect(response.status).toEqual(201);

    const data: any = await response.json();
    expect(data).toHaveProperty("task");

    expect(data.task).toBeInstanceOf(Object);
    expect(data.task).toHaveProperty("_id");
    expect(data.task).toHaveProperty("title");
    expect(data.task).toHaveProperty("description");
    expect(data.task).toHaveProperty("completed");
    expect(data.task).toHaveProperty("dueDate");
    expect(data.task).toHaveProperty("createdAt");
    expect(data.task).toHaveProperty("updatedAt");
  })

  it("should return a 400 error if the task is not created", async () => {
    const task = {
      title: "Test Task",
      description: "This is a test task",
    };

    const request = new Request(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const response = await app.elysia.fetch(request);

    const data: any = await response.json();

    expect(response.status).toEqual(400);
    expect(data).toHaveProperty("errors");
  })
})

describe("Update Task", () => {
  it("should update a task", async () => {
    // Assuming you have a valid task ID
    const taskId = "6591e508c7235e4b230d784f";

    const task = {
      title: "Updated Task",
      description: "This is an updated task",
      dueDate: "2022-01-01",
      completed: true,
    }

    const request = new Request(`${baseUrl}${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    
    const response = await app.elysia.fetch(request);
    const data: any = await response.json();

    expect(response.status).toEqual(200);
    expect(data).toHaveProperty("task");

  })

  it("should return a 404 error if the task is not found", async () => {
    const taskId = "6591c9f35e214bee999a9e57";

    const task = {
      title: "Updated Task",
      description: "This is an updated task",
      dueDate: "2022-01-01",
      completed: true,
    }

    const request = new Request(`${baseUrl}${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const response = await app.elysia.fetch(request);

    expect(response.status).toEqual(404);
  })
})

describe("Delete Task", () => {
  // it("should delete a task", async () => {
  //   // Assuming you have a valid task ID
  //   const taskId = "6591e51c39e75d65eef168ca";

  //   const request = new Request(`${baseUrl}${taskId}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const response = await app.elysia.fetch(request);

  //   expect(response.status).toEqual(204);  
  // })

  it("should return a 404 error if the task is not found", async () => {
    const taskId = "6591c9f35e214bee999a9e57";

    const request = new Request(`${baseUrl}${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
   
    const response = await app.elysia.fetch(request);

    expect(response.status).toEqual(404);
  })
})