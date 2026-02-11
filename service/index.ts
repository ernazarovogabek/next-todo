"use client";

import { FormData, UserType } from "@/@types";

const API_URL = "https://6989be45c04d974bc6a04245.mockapi.io/user";

export const getUsers = async (): Promise<UserType[]> => {
  try {
    console.log("Fetching from:", API_URL);
    const data = await fetch(API_URL, {
      cache: "no-store",
    });
    if (!data.ok) {
      console.error("Fetch failed with status:", data.status);
      return [];
    }
    const res = await data.json();
    console.log("Fetched users:", res);
    return res;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const addUsers = async (data: FormData) => {
  const API_URL = "https://6989be45c04d974bc6a04245.mockapi.io/user";
  
  try {
    console.log("=== ADD USER START ===");
    console.log("Data to send:", data);
    console.log("API URL:", API_URL);
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        surname: data.surname,
      }),
    });
    
    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log("Success result:", result);
    console.log("=== ADD USER END ===");
    
    return result;
  } catch (error: any) {
    console.error("=== ADD USER ERROR ===");
    console.error("Error:", error);
    console.error("Error message:", error.message);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  const API_URL = "https://6989be45c04d974bc6a04245.mockapi.io/user";
  
  try {
    const deleteResponse = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!deleteResponse.ok) {
      throw new Error("Failed to delete user");
    }
    return await deleteResponse.json();
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const updateUser = async (id: number, data: FormData) => {
  const API_URL = "https://6989be45c04d974bc6a04245.mockapi.io/user";
  
  try {
    const userData = {
      name: data.name,
      surname: data.surname,
    };
    const update = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!update.ok) {
      throw new Error("Failed to update user");
    }
    return await update.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
