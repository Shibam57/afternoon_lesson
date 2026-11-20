
const API_URL = import.meta.env.VITE_API_URL;

export const getLessons = async () => {
  const response = await fetch(`${API_URL}/lessons`);

  if (!response.ok) {
    throw new Error("Failed to fetch lessons");
  }

  return await response.json();
};




export const createOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create order");
  }

  return data;
};


export const updateLesson = async (lessonId, updates) => {
  const response = await fetch(
    `${API_URL}/lessons/${lessonId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updates)
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update lesson");
  }

  return data;
};


export const searchLessons = async (query) => {
  const response = await fetch(
    `${API_URL}/search?q=${encodeURIComponent(query)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to search lessons");
  }

  return data;
};


export const getTeachers = async () => {
  const response = await fetch(`${API_URL}/teachers`);

  if (!response.ok) {
    throw new Error("Failed to fetch teachers");
  }

  const data = await response.json();
  return data.teachers;
};

export const getTeacherLessons = async (teacherId) => {
  const response = await fetch(
    `${API_URL}/teachers/${teacherId}/lessons`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch teacher lessons");
  }

  const data = await response.json();
  return data.lessons;
};


export const getEnrolment = async (lessonId) => {
  const response = await fetch(
    `${API_URL}/enrolment/${encodeURIComponent(lessonId)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch enrolment"
    );
  }

  return data.enrolment;
};
