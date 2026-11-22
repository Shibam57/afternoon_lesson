
const API_URL = import.meta.env.VITE_API_URL;

export const loginAdmin = async (credentials) => {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });

  const data = await response.json();

  if (!response.ok || !data.success || !data.token) {
    throw new Error(data.message || "Admin login failed");
  }

  return data.token;
};


export const createAdminLesson = async (formData, token) => {
  if (!token) {
    throw new Error("Please log in as admin");
  }

  const response = await fetch(`${API_URL}/lessons/post`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    throw new Error(
      data?.message || "Failed to create lesson"
    );
  }

  return data;
};


export const updateAdminLesson = async (
  lessonId,
  updates,
  token
) => {
  if (!token) {
    throw new Error("Admin login required");
  }

  const response = await fetch(
    `${API_URL}/lessons/${lessonId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to update lesson");
  }

  return data;
};


export const createAdminTeacher = async (teacherData, token) => {
  if (!token) {
    throw new Error("Admin login required");
  }

  const response = await fetch(`${API_URL}/teachers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(teacherData)
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Failed to create teacher"
    );
  }

  return data;
};


export const getAdminOrders = async (token) => {
  if (!token) {
    throw new Error("Admin login required");
  }

  const response = await fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Failed to fetch orders"
    );
  }

  return data.orders;
};
